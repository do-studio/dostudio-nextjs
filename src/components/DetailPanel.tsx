'use client';
import { useAppStore } from '../../lib/store';
import { motion, AnimatePresence } from 'framer-motion';

export function DetailPanel() {
  const { selectedProduct, setSelectedProduct } = useAppStore();

  return (
    <AnimatePresence>
      {selectedProduct && (
        <motion.div
          key="panel"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute left-0 top-0 z-10 h-full w-full max-w-md bg-white shadow-lg p-8"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 text-2xl font-bold"
          >
            &times;
          </button>
          
          <h2 className="text-5xl font-bold mb-4">{selectedProduct.name}</h2>
          
          <div className="w-full h-64 bg-gray-200 mb-4">
             {/* We use a simple img tag here */}
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name} 
              className="w-full h-full object-contain"
            />
          </div>
          
          <h3 className="text-xl font-semibold mb-2">Collection</h3>
          {/* You would map over selectedProduct.collection_images here */}
          <div className="flex space-x-2">
            <div className="w-16 h-16 bg-gray-300"></div>
            <div className="w-16 h-16 bg-gray-300"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}