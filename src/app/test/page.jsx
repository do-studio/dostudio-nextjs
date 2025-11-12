'use client'; // This page must be a client component

import { FullScreenViewer } from '../../components/FullScreenViewer';
import { useAppStore } from '../../../lib/store';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';


// We must dynamically import the Scene with ssr: false
const Scene = dynamic(() => import('../../components/Scene').then((mod) => mod.Scene), {
  ssr: false,
});

export default function Home() {
  // Get the state and actions from the store
  const { selectedProduct, zoomIn, zoomOut } = useAppStore();
  const isPanelOpen = selectedProduct !== null;

  useEffect(() => {
    const handleWheel = (e) => {
      // Disable pinch zoom (Ctrl + scroll)
      if (e.ctrlKey) e.preventDefault();
    };

    const handleGesture = (e) => {
      // Disable pinch zoom gestures (macOS trackpad)
      e.preventDefault();
    };

    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("gesturestart", handleGesture);
    document.addEventListener("gesturechange", handleGesture);
    document.addEventListener("gestureend", handleGesture);

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("gesturestart", handleGesture);
      document.removeEventListener("gesturechange", handleGesture);
      document.removeEventListener("gestureend", handleGesture);
    };
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#f5f6ee]">

      {/* This motion.div is the container for the 3D/2D Canvas.
        We animate its `width` to create the split-screen effect.
      */}
      <motion.div
        className="absolute top-0 right-0 h-full"
        animate={{ width:  '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Scene />
      </motion.div>

      {/* The UI Panel (sits on top) */}
      <FullScreenViewer />

      {/* --- MODIFIED SECTION --- */}
      {/* Removed "menu" and "filter" buttons */}

      <div className="absolute bottom-4 right-4 flex gap-2 z-50">
        {/* Wire up the buttons to the store's functions */}
        <button
          onClick={zoomIn}
          className="bg-black text-white w-10 h-10 text-xl cursor-pointer"
        >
          +
        </button>
        <button
          onClick={zoomOut}
          className="bg-black text-white w-10 h-10 text-xl cursor-pointer"
        >
          -
        </button>
      </div>
      {/* --- END MODIFIED SECTION --- */}

    </main>
  );
}