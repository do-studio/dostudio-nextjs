"use client";
import { useRef, useMemo, useState, useCallback } from "react";
import { Image } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useAppStore } from "../../lib/store";
import * as THREE from "three";

export function ProductItem({ product }) {
  const setSelectedProduct = useAppStore((state) => state.setSelectedProduct);
  const meshRef = useRef(null);
  const { mouse, camera, size } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const [isHovered, setIsHovered] = useState(false);
  const [screenPosition, setScreenPosition] = useState({ x: 0, y: 0 });

  const parsedRatio = useMemo(() => {
    if (!product.ratio) return 1;
    const parts = product.ratio.split("/");
    if (parts.length !== 2) return 1;
    const w = parseFloat(parts[0]);
    const h = parseFloat(parts[1]);
    return isFinite(w / h) ? w / h : 1;
  }, [product.ratio]);

  // Calculate screen position for animation
  useFrame(() => {
    if (!meshRef.current) return;

    // Convert 3D position to 2D screen position
    const vector = new THREE.Vector3();
    meshRef.current.getWorldPosition(vector);
    vector.project(camera);

    const x = (vector.x * 0.5 + 0.5) * size.width;
    const y = -(vector.y * 0.5 - 0.5) * size.height;

    setScreenPosition({ x, y });

    // Hover detection
    raycaster.current.setFromCamera(mouse, camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectPoint = new THREE.Vector3();

    if (raycaster.current.ray.intersectPlane(plane, intersectPoint)) {
      const distance = intersectPoint.distanceTo(meshRef.current.position);
      const targetScale = distance < 5
        ? THREE.MathUtils.mapLinear(distance, 0, 5, 1.2, 1)
        : 1;

      const current = meshRef.current.scale.x;
      const newScale = THREE.MathUtils.lerp(current, targetScale, 0.04);
      meshRef.current.scale.set(newScale, newScale, newScale);

      setIsHovered(distance < 2.5);
    }
  });

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    
    // Pass screen position for animation
    setSelectedProduct({
      ...product,
      screenPosition, // Add screen position to product data
      elementSize: { width: 100, height: 150 } // Approximate size
    });
  }, [product, setSelectedProduct, screenPosition]);

  const BASE_HEIGHT = 3;
  const BASE_WIDTH = BASE_HEIGHT * parsedRatio;

  return (
    <group 
      ref={meshRef} 
      position={product.position}
      onPointerEnter={() => document.body.style.cursor = 'pointer'}
      onPointerLeave={() => document.body.style.cursor = 'default'}
    >
      <Image
        url={product.image}
        scale={[BASE_WIDTH, BASE_HEIGHT]}
        transparent
        onClick={handleClick}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      />
      
      {isHovered && (
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[BASE_WIDTH * 1.1, BASE_HEIGHT * 1.1]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}