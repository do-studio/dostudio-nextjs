'use client';
import { FullScreenViewer } from '../../components/FullScreenViewer';
import { useAppStore } from '../../../lib/store';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IoExitOutline } from 'react-icons/io5';

const Scene = dynamic(() => import('../../components/Scene').then((mod) => mod.Scene), {
  ssr: false,
});

export default function Home() {
  const { selectedProduct, zoomIn, zoomOut } = useAppStore();
  const isPanelOpen = selectedProduct !== null;
  const router = useRouter();

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) e.preventDefault();
    };

    const handleGesture = (e) => {
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

  const handleBack = () => {
    // Navigate back to previous page
    router.back();
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#f5f6ee]">
      {/* Exit/Back Button at Top Left */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 z-50 bg-black text-white w-32 text-lg h-10 flex items-center justify-center gap-2 cursor-pointer rounded-md hover:bg-white hover:text-black duration-150 transition-colors shadow-lg"
        title="Go back"
      >
        <IoExitOutline /> <div>
          Exit
        </div>
      </button>
      <motion.div
        className="absolute top-0 right-0 h-full"
        animate={{ width: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Scene />
      </motion.div>

      <FullScreenViewer />

      <div className="absolute bottom-4 right-4 flex gap-2 z-50">
        <button
          onClick={zoomIn}
          className="bg-black text-white w-10 h-10 text-xl cursor-pointer rounded-md hover:bg-gray-800 transition-colors"
        >
          +
        </button>
        <button
          onClick={zoomOut}
          className="bg-black text-white w-10 h-10 text-xl cursor-pointer rounded-md hover:bg-gray-800 transition-colors"
        >
          -
        </button>
      </div>
    </main>
  );
}