'use client';
import { useAppStore } from '../../lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function FullScreenViewer() {
  const { selectedProduct, setSelectedProduct } = useAppStore();
  const [animationOrigin, setAnimationOrigin] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  useEffect(() => {
    if (selectedProduct && selectedProduct.screenPosition) {
      setAnimationOrigin(selectedProduct.screenPosition);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  // Calculate animation values based on screen position
  const initialX = selectedProduct.screenPosition?.x || window.innerWidth / 2;
  const initialY = selectedProduct.screenPosition?.y || window.innerHeight / 2;
  const initialWidth = 100; // Starting width
  const initialHeight = 150; // Starting height

  const targetWidth = Math.min(window.innerWidth * 0.9, 1200);
  const targetHeight = Math.min(window.innerHeight * 0.9, 800);

  return (
    <AnimatePresence mode="wait">
      {selectedProduct && (
        <motion.div
          key="viewer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/95"
          onClick={() => setSelectedProduct(null)}
        >
          {/* Animated Image */}
          <motion.div
            className="fixed pointer-events-none z-50"
            style={{
              originX: 0.5,
              originY: 0.5,
            }}
            initial={{
              x: initialX - initialWidth / 2,
              y: initialY - initialHeight / 2,
              width: initialWidth,
              height: initialHeight,
              opacity: 0.8,
            }}
            animate={{
              x: window.innerWidth / 2 - targetWidth / 2,
              y: window.innerHeight / 2 - targetHeight / 2,
              width: targetWidth,
              height: targetHeight,
              opacity: 1,
            }}
            exit={{
              x: initialX - initialWidth / 2,
              y: initialY - initialHeight / 2,
              width: initialWidth,
              height: initialHeight,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.6
            }}
          >
            <img
              ref={imageRef}
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-contain rounded-lg shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>

          {/* Close Button */}
          <motion.button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-6 right-8 text-white text-4xl font-bold z-50 hover:opacity-80 transition-opacity duration-200 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            &times;
          </motion.button>

          {/* Product Name */}
          {selectedProduct.name && (
            <motion.div
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-center z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold bg-black/50 px-4 py-2 rounded-lg">
                {selectedProduct.name}
              </h2>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}