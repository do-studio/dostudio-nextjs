'use client';
import { useAppStore } from '../../lib/store';
import { motion, AnimatePresence } from 'framer-motion';

export function FullScreenViewer() {
  const { selectedProduct, setSelectedProduct } = useAppStore();

  return (
    <AnimatePresence>
      {selectedProduct && (
        <motion.div
          key="viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          {/* shared animation image */}
          <motion.img
            layoutId={`poster-${selectedProduct.id}`}
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          />

          {/* close button */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-6 right-8 text-white text-4xl font-bold z-50 hover:opacity-80"
          >
            &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
