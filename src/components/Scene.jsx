"use client";
import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MapControls, OrthographicCamera, Html } from "@react-three/drei";
import { ProductItem } from "./ProductItem";
import { useAppStore } from "../../lib/store";
import { client } from "../../utils/sanity";
import * as THREE from "three";

function CameraBoundary({ controlsRef, bounds, zoomLimits, isLoaded }) {
  const { camera } = useThree();
  const zoom = useAppStore((state) => state.zoom);
  const [introZoom] = useState(500);
  
  const targetOffset = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!controlsRef.current) return;
      const speed = 0.001;
      const deltaX = e.deltaX * speed;
      const deltaY = e.deltaY * speed;
      velocity.current.x += deltaX * 1.2;
      velocity.current.y += deltaY * 1.2;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [controlsRef]);

  useFrame((state) => {
    const controls = controlsRef.current;
    if (!controls) return;

    const time = state.clock.getElapsedTime();
    const deltaTime = lastTime.current ? time - lastTime.current : 0.016;
    lastTime.current = time;

    targetOffset.current.x += velocity.current.x * (deltaTime * 60);
    targetOffset.current.y += velocity.current.y * (deltaTime * 60);

    const { x: targetX, y: targetY } = targetOffset.current;
    const currentSpeed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
    const adaptiveLerp = THREE.MathUtils.lerp(0.04, 0.12, Math.min(currentSpeed * 10, 1));

    controls.target.x = THREE.MathUtils.lerp(controls.target.x, controls.target.x + targetX, adaptiveLerp);
    controls.target.y = THREE.MathUtils.lerp(controls.target.y, controls.target.y - targetY, adaptiveLerp);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, controls.target.x, adaptiveLerp);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, controls.target.y, adaptiveLerp);

    controls.target.x = THREE.MathUtils.clamp(controls.target.x, bounds.minX, bounds.maxX);
    controls.target.y = THREE.MathUtils.clamp(controls.target.y, bounds.minY, bounds.maxY);
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, bounds.minX, bounds.maxX);
    camera.position.y = THREE.MathUtils.clamp(camera.position.y, bounds.minY, bounds.maxY);

    const velocityDecay = 0.88;
    const offsetDecay = 0.85;
    
    velocity.current.x *= velocityDecay;
    velocity.current.y *= velocityDecay;
    targetOffset.current.x *= offsetDecay;
    targetOffset.current.y *= offsetDecay;

    if (Math.abs(velocity.current.x) < 0.002) velocity.current.x = 0;
    if (Math.abs(velocity.current.y) < 0.002) velocity.current.y = 0;
    if (Math.abs(targetOffset.current.x) < 0.002) targetOffset.current.x = 0;
    if (Math.abs(targetOffset.current.y) < 0.002) targetOffset.current.y = 0;

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

// ⬇️ ADD CACHE VALIDATION FUNCTION
const isCacheValid = (cachedData) => {
  if (!cachedData) return false;
  
  try {
    const parsed = JSON.parse(cachedData);
    
    // Check if cache is less than 1 hour old
    const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
    if (parsed.timestamp && (Date.now() - parsed.timestamp) > CACHE_DURATION) {
      return false;
    }
    
    return Array.isArray(parsed.data) && parsed.data.length > 0;
  } catch {
    return false;
  }
};

// ⬇️ PRELOAD IMAGES FUNCTION
const preloadImages = (products) => {
  products.forEach((product) => {
    if (product.image) {
      const img = new Image();
      img.src = product.image;
    }
  });
};

export function Scene() {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bounds, setBounds] = useState({
    minX: -20,
    maxX: 20,
    minY: -20,
    maxY: 20,
  });
  const [error, setError] = useState(null);

  const controlsRef = useRef(null);
  const zoomLimits = { min: 20, max: 200 };

  useEffect(() => {
    async function fetchPosters() {
      try {
        // ⬇️ IMPROVED CACHE CHECK with timestamp
        const cached = localStorage.getItem("snapwave_posters");
        
        if (isCacheValid(cached)) {
          try {
            const parsed = JSON.parse(cached);
            console.log('📦 Using cached posters data');
            
            // ⬇️ IMMEDIATELY SHOW CACHED DATA
            setProducts(parsed.data);
            setIsLoaded(true);
            
            // ⬇️ PRELOAD CACHED IMAGES
            preloadImages(parsed.data);
            
            // Calculate bounds for cached data
            updateBounds(parsed.data);
            
          } catch (err) {
            console.warn("Invalid cache, refetching...", err);
          }
        } else {
          console.log('🔄 Cache invalid or expired, fetching fresh data');
        }

        // ⬇️ ALWAYS FETCH FRESH DATA IN BACKGROUND (but don't wait for it)
        const query = `*[_type == "poster" && !(_id in path("drafts.**"))] | order(orderRank){
          _id,
          title,
          ratio,
          image {
            alt,
            asset->{ url }
          }
        }`;

        console.log('🚀 Fetching fresh posters data...');
        const posters = await client.fetch(query);

        if (!posters || !Array.isArray(posters)) {
          throw new Error('Invalid data format');
        }

        const mapped = mapPostersToProducts(posters);

        // ⬇️ ENHANCED CACHING with timestamp
        const cacheData = {
          data: mapped,
          timestamp: Date.now(),
          version: '1.0'
        };
        localStorage.setItem("snapwave_posters", JSON.stringify(cacheData));

        // ⬇️ UPDATE WITH FRESH DATA (even if cache was used)
        setProducts(mapped);
        updateBounds(mapped);
        preloadImages(mapped);
        
        console.log('✅ Posters data loaded successfully');
        
      } catch (err) {
        console.error('❌ Failed to fetch posters:', err);
        setError('Failed to load posters. Please check your connection and try again.');
        
        // ⬇️ SHOW CACHED DATA EVEN ON ERROR (if available)
        const cached = localStorage.getItem("snapwave_posters");
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed.data) && parsed.data.length > 0) {
              setProducts(parsed.data);
              setIsLoaded(true);
              updateBounds(parsed.data);
              setError(null); // Clear error if we have cached data
            }
          } catch {
            // Ignore cache errors
          }
        }
      } finally {
        setIsLoaded(true);
      }
    }

    // ⬇️ EXTRACTED FUNCTION FOR BOUNDS CALCULATION
    const updateBounds = (posters) => {
      const postersPerRow = 10;
      const spacingX = 3.5;
      const spacingY = 3.5;
      const totalRows = Math.ceil(posters.length / postersPerRow);
      const totalCols = Math.min(posters.length, postersPerRow);
      
      const halfWidth = (totalCols * spacingX) / 2;
      const halfHeight = (totalRows * spacingY) / 2;
      
      setBounds({
        minX: -halfWidth * 0.95,
        maxX: halfWidth * 0.95,
        minY: -halfHeight * 0.95,
        maxY: halfHeight * 0.95,
      });
    };

    // ⬇️ EXTRACTED FUNCTION FOR MAPPING
    const mapPostersToProducts = (posters) => {
      const postersPerRow = 10;
      const spacingX = 3.5;
      const spacingY = 3.5;
      const totalRows = Math.ceil(posters.length / postersPerRow);
      const totalCols = Math.min(posters.length, postersPerRow);
      const offsetX = (totalCols - 1) * spacingX * 0.5;
      const offsetY = (totalRows - 1) * spacingY * 0.5;

      return posters.map((poster, index) => {
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
    };

    fetchPosters();
  }, []);

  return (
    <Canvas>
      <OrthographicCamera makeDefault position={[0, 0, 80]} zoom={500} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <Html center>
        <div className="flex flex-col items-center justify-center text-gray-600">
          {!isLoaded && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
              <p className="text-gray-500">Loading posters...</p>
            </div>
          )}
          {error && (
            <div className="text-red-500 text-center max-w-xs bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="font-semibold">Connection Issue</p>
              <p className="text-sm mt-1">{error}</p>
              <p className="text-xs text-gray-600 mt-2">Showing cached version if available</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </Html>

      {isLoaded && !error && products.length > 0 && (
        products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      )}

      <MapControls
        ref={controlsRef}
        enableRotate={false}
        screenSpacePanning={true}
        enableZoom={false}
      />

      <CameraBoundary
        controlsRef={controlsRef}
        bounds={bounds}
        zoomLimits={zoomLimits}
        isLoaded={isLoaded && !error}
      />
    </Canvas>
  );
}