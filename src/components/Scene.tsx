"use client";
import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MapControls, OrthographicCamera, Html } from "@react-three/drei";
import { ProductItem } from "./ProductItem";
import { Product, useAppStore } from "../../lib/store";
import { client } from "../../utils/sanity";
import * as THREE from "three";

function CameraBoundary({
  controlsRef,
  bounds,
  zoomLimits,
  isLoaded,
}: {
  controlsRef: any;
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
  zoomLimits: { min: number; max: number };
  isLoaded: boolean;
}) {
  const { camera } = useThree();
  const zoom = useAppStore((state) => state.zoom);
  const [introZoom] = useState(300);
  const targetOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!controlsRef.current) return;
      const speed = 0.03;
      const deltaX = e.deltaX * speed;
      const deltaY = e.deltaY * speed;
      targetOffset.current.x += deltaX;
      targetOffset.current.y += deltaY;
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const { x: targetX, y: targetY } = targetOffset.current;
    const lerpFactor = 0.08;

    controls.target.x = THREE.MathUtils.lerp(controls.target.x, controls.target.x + targetX, lerpFactor);
    controls.target.y = THREE.MathUtils.lerp(controls.target.y, controls.target.y - targetY, lerpFactor);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, controls.target.x, lerpFactor);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, controls.target.y, lerpFactor);

    // Intro zoom
    camera.zoom = THREE.MathUtils.lerp(
      camera.zoom,
      isLoaded ? zoom : introZoom,
      0.05
    );
    camera.zoom = THREE.MathUtils.clamp(camera.zoom, zoomLimits.min, zoomLimits.max);
    camera.updateProjectionMatrix();

    controls.update();
  });

  return null;
}

export function Scene() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bounds, setBounds] = useState({
    minX: -20,
    maxX: 20,
    minY: -20,
    maxY: 20,
  });

  const controlsRef = useRef<any>(null);
  const zoomLimits = { min: 20, max: 200 };

  useEffect(() => {
    async function fetchPosters() {
      // 👇 Try to get cached posters
      const cached = localStorage.getItem("snapwave_posters");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProducts(parsed);
            useAppStore.setState({ posters: parsed });
            setIsLoaded(true);
          }
        } catch {
          console.warn("Invalid cache, refetching...");
        }
      }

      // 👇 Fetch fresh data in background
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

      // Prepare layout mapping
      const postersPerRow = 10;
      const spacingX = 3.5;
      const spacingY = 3.5;
      const totalRows = Math.ceil(posters.length / postersPerRow);
      const totalCols = Math.min(posters.length, postersPerRow);
      const offsetX = (totalCols - 1) * spacingX * 0.5;
      const offsetY = (totalRows - 1) * spacingY * 0.5;

      const mapped = posters.map((poster: any, index: number) => {
        const col = index % postersPerRow;
        const row = Math.floor(index / postersPerRow);
        const staggerOffset = row % 2 === 0 ? 0 : spacingX / 2;
        return {
          id: poster._id,
          name: poster.title,
          image: poster.image?.asset?.url,
          position: [col * spacingX - offsetX + staggerOffset, -(row * spacingY) + offsetY, 0],
          ratio: poster.ratio || "1/1",
        };
      });

      // Save to Zustand & localStorage cache
      useAppStore.setState({ posters: mapped });
      localStorage.setItem("snapwave_posters", JSON.stringify(mapped));

      // Update bounds dynamically
      const halfWidth = (totalCols * spacingX) / 2;
      const halfHeight = (totalRows * spacingY) / 2;
      setBounds({
        minX: -halfWidth * 0.9,
        maxX: halfWidth * 0.9,
        minY: -halfHeight * 0.9,
        maxY: halfHeight * 0.9,
      });

      setProducts(mapped);
      setIsLoaded(true);
    }

    fetchPosters();
  }, []);

  return (
    <Canvas>
      <OrthographicCamera makeDefault position={[0, 0, 80]} zoom={300} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Loading Spinner */}
      {!isLoaded && (
        <Html center>
          <div className="flex flex-col items-center justify-center text-gray-600">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
          </div>
        </Html>
      )}

      {/* Render posters */}
      {isLoaded &&
        products.map((product, index) => (
          <ProductItem key={product.id} product={product} index={index} />
        ))}

      {/* Controls */}
      <MapControls
        ref={controlsRef}
        enableRotate={false}
        screenSpacePanning={true}
        enableZoom={false}
      />

      {/* Camera logic */}
      <CameraBoundary
        controlsRef={controlsRef}
        bounds={bounds}
        zoomLimits={zoomLimits}
        isLoaded={isLoaded}
      />
    </Canvas>
  );
}
