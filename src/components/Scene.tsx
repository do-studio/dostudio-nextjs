"use client";
import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MapControls, OrthographicCamera } from "@react-three/drei";
import { ProductItem } from "./ProductItem";
import { Product, useAppStore } from "../../lib/store";
import { client } from "../../utils/sanity";
import * as THREE from "three";

/**
 * 🧭 Helper: Runs inside Canvas to clamp camera position AND apply custom smooth scroll movement
 */
function CameraBoundary({
  controlsRef,
  bounds,
  zoomLimits,
}: {
  controlsRef: any;
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
  zoomLimits: { min: number; max: number };
}) {
  const { camera } = useThree();
  const zoom = useAppStore((state) => state.zoom); // 👈 subscribe to zoom state

  // 🎯 Store smooth movement targets for scroll panning
  const targetOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!controlsRef.current) return;

      const speed = 0.03; // slower scroll panning
      const deltaX = e.deltaX * speed;
      const deltaY = e.deltaY * speed;

      // Accumulate movement smoothly
      targetOffset.current.x += deltaX;
      targetOffset.current.y += deltaY;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  // 🧭 Smoothly apply movement and zoom each frame
  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const { x: targetX, y: targetY } = targetOffset.current;

    const lerpFactor = 0.08; // smooth scroll transition

    // Smooth panning
    controls.target.x = THREE.MathUtils.lerp(
      controls.target.x,
      controls.target.x + targetX,
      lerpFactor
    );
    controls.target.y = THREE.MathUtils.lerp(
      controls.target.y,
      controls.target.y - targetY,
      lerpFactor
    );

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      controls.target.x,
      lerpFactor
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      controls.target.y,
      lerpFactor
    );

    // Smooth zoom
    if (camera.isOrthographicCamera) {
      // 👇 smoothly interpolate current zoom toward global zoom from store
      camera.zoom = THREE.MathUtils.lerp(camera.zoom, zoom, 0.1);
      camera.zoom = THREE.MathUtils.clamp(
        camera.zoom,
        zoomLimits.min,
        zoomLimits.max
      );
      camera.updateProjectionMatrix();
    }

    // Clamp camera and target within bounds
    controls.target.x = THREE.MathUtils.clamp(
      controls.target.x,
      bounds.minX,
      bounds.maxX
    );
    controls.target.y = THREE.MathUtils.clamp(
      controls.target.y,
      bounds.minY,
      bounds.maxY
    );
    camera.position.x = THREE.MathUtils.clamp(
      camera.position.x,
      bounds.minX,
      bounds.maxX
    );
    camera.position.y = THREE.MathUtils.clamp(
      camera.position.y,
      bounds.minY,
      bounds.maxY
    );

    // Gradual decay for smoothness
    targetOffset.current.x *= 0.9;
    targetOffset.current.y *= 0.9;

    controls.update();
  });

  return null;
}

export function Scene() {
  const [products, setProducts] = useState<Product[]>([]);
  const [bounds, setBounds] = useState({
    minX: -20,
    maxX: 20,
    minY: -20,
    maxY: 20,
  });

  const controlsRef = useRef<any>(null);
  const zoomLimits = { min: 20, max: 120 };

  useEffect(() => {
    async function fetchPosters() {
      const query = `*[_type == "poster" && !(_id in path("drafts.**"))] | order(orderRank){
      _id,
      title,
      ratio,
      image {
        alt,
        asset->{ url }
      }
    }`;

      const posters = await client.fetch(query);

      // --- CONFIGURATION ---
      const postersPerRow = 10; // how many per row
      const spacingX = 3.5; // horizontal gap
      const spacingY = 3.5; // vertical gap

      const totalRows = Math.ceil(posters.length / postersPerRow);
      const totalCols = Math.min(posters.length, postersPerRow);

      const offsetX = (totalCols - 1) * spacingX * 0.5;
      const offsetY = (totalRows - 1) * spacingY * 0.5;

      // --- CREATE STAGGERED PATTERN ---
      const mapped = posters.map((poster: any, index: number) => {
        const col = index % postersPerRow;
        const row = Math.floor(index / postersPerRow);

        // Every other row gets a small horizontal offset
        const staggerOffset = row % 2 === 0 ? 0 : spacingX / 2;

        return {
          id: poster._id,
          name: poster.title,
          image: poster.image?.asset?.url,
          // Apply staggered positioning
          position: [
            col * spacingX - offsetX + staggerOffset,
            -(row * spacingY) + offsetY,
            0,
          ],
          ratio: poster.ratio || "1/1",
        };
      });

      // --- CAMERA BOUNDS ---
      const halfWidth = (totalCols * spacingX) / 2;
      const halfHeight = (totalRows * spacingY) / 2;

      setBounds({
        minX: -halfWidth - 2,
        maxX: halfWidth + 2,
        minY: -halfHeight - 2,
        maxY: halfHeight + 2,
      });

      setProducts(mapped);
    }

    fetchPosters();
  }, []);

  return (
    <Canvas>
      {/* Orthographic Camera — initial zoom set from store (defaults to 50) */}
      <OrthographicCamera makeDefault position={[0, 0, 100]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Render posters */}
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}

      {/* MapControls (scroll pans only) */}
      <MapControls
        ref={controlsRef}
        enableRotate={false}
        screenSpacePanning={true}
        enableZoom={false} // 🚫 disable manual zoom
      />

      {/* Camera boundary and zoom logic */}
      <CameraBoundary
        controlsRef={controlsRef}
        bounds={bounds}
        zoomLimits={zoomLimits}
      />
    </Canvas>
  );
}
