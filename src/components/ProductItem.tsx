"use client";
import { useRef, useMemo } from "react";
import { Image } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useAppStore, Product } from "../../lib/store";
import * as THREE from "three";

interface ProductItemProps {
  product: Product & { ratio?: string };
  i: number;
}

export function ProductItem({ product, i }: ProductItemProps) {
  const setSelectedProduct = useAppStore((state) => state.setSelectedProduct);
  const meshRef = useRef<THREE.Group>(null!);
  const { mouse, camera } = useThree();
  const raycaster = useRef(new THREE.Raycaster());

  // 🧮 Parse ratio from string like "4/5" → 4 ÷ 5 = 0.8
  const parsedRatio = useMemo(() => {
    if (!product.ratio) return 1; // fallback
    const parts = product.ratio.split("/");
    if (parts.length !== 2) return 1;
    const w = parseFloat(parts[0]);
    const h = parseFloat(parts[1]);
    return isFinite(w / h) ? w / h : 1;
  }, [product.ratio]);

  // Constants for scaling
  const BASE_HEIGHT = 3; // The "height" unit for each image
  const BASE_WIDTH = BASE_HEIGHT * parsedRatio; // Adjust width based on ratio
  const MAX_SCALE = 1.2;
  const NEAR_DISTANCE = 5;
  const LERP_SPEED = 0.04;

  useFrame(() => {
    if (!meshRef.current) return;

    // Create a ray from camera through mouse position
    raycaster.current.setFromCamera(mouse, camera);

    // Flat plane (z=0)
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectPoint = new THREE.Vector3();

    raycaster.current.ray.intersectPlane(plane, intersectPoint);

    // Distance between mouse projection and this poster
    const distance = intersectPoint.distanceTo(meshRef.current.position);

    // Determine target scale based on proximity
    const targetScale =
      distance < NEAR_DISTANCE
        ? THREE.MathUtils.mapLinear(
            distance,
            0,
            NEAR_DISTANCE,
            MAX_SCALE,
            1
          )
        : 1;

    // Smoothly interpolate the scale
    const current = meshRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(current, targetScale, LERP_SPEED);

    meshRef.current.scale.set(newScale, newScale, newScale);
  });

  return (
    <group ref={meshRef} position={product.position}>
      <Image
        url={product.image}
        scale={[BASE_WIDTH, BASE_HEIGHT]} // ✅ maintain ratio here
        transparent
        onClick={() => setSelectedProduct(product, i)}
      />
    </group>
  );
}
