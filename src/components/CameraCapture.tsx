import React, { useEffect } from 'react';
import Webcam from 'react-webcam';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './UI/Button';
import { useCamera } from '../hooks/useCamera';
import { useAppStore } from '../store';

const CameraCapture: React.FC = () => {
  const { 
    webcamRef, 
    isCameraReady,
    captureImage, 
    handleCameraReady,
    cleanup,
    error
  } = useCamera();

  const { setCurrentStep, setCapturedImage } = useAppStore();

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  const handleCapture = () => {
    const imageSrc = captureImage();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      setCurrentStep('analyzing');
    }
  };

  const handleCancel = () => {
    setCurrentStep('landing');
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={handleCancel}>Go Back</Button>
      </div>
    );
  }

  return (
    <motion.div 
      className="relative h-full flex flex-col items-center justify-start pt-8 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute top-4 right-4 z-10">
        <Button variant="ghost" size="icon" onClick={handleCancel} className="text-white">
          <X />
        </Button>
      </div>
      
      <div className="relative w-full max-w-md mx-auto">
        <div className="aspect-[3/4] relative overflow-hidden">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            onUserMedia={handleCameraReady}
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Face position guide */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/5 h-3/5 border-2 border-dashed border-white/70 rounded-full" />
          </div>
          
          {/* Guidance text */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/50 py-2 px-4 mx-4 rounded-lg">
            Position your face within the circle
          </div>
        </div>
      </div>

      {/* Circular capture button */}
      <div className="mt-12">
        <motion.button
          onClick={handleCapture}
          disabled={!isCameraReady}
          className="relative w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border-4 border-white disabled:opacity-50 disabled:cursor-not-allowed"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="absolute inset-2 rounded-full bg-white" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CameraCapture;