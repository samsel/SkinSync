import React from 'react';
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
    handleCameraError,
    cleanup,
    error
  } = useCamera();

  const { setCurrentStep, setCapturedImage } = useAppStore();

  const handleCapture = () => {
    if (!isCameraReady) return;
    
    const imageSrc = captureImage();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      setCurrentStep('analyzing');
    }
  };

  const handleCancel = () => {
    cleanup();
    setCurrentStep('landing');
  };

  const videoConstraints = {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: "user",
    aspectRatio: 4/3
  };

  if (error) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Button onClick={handleCancel} variant="primary">Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="fixed inset-0 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.button
        onClick={handleCancel}
        className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="w-6 h-6" />
      </motion.button>

      <motion.div 
        className="absolute inset-x-0 top-12 z-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-white/90 text-lg font-light">
          Position your face within the circle
        </p>
      </motion.div>

      <div className="relative h-full">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={handleCameraReady}
          onUserMediaError={handleCameraError}
          className="h-full w-full object-cover"
          mirrored
        />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-72 h-72 rounded-full border-2 border-white/30" />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-32 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <motion.button
            onClick={handleCapture}
            disabled={!isCameraReady}
            className={`w-20 h-20 rounded-full border-[8px] border-white flex items-center justify-center 
              ${!isCameraReady ? 'opacity-50' : 'hover:scale-105 active:scale-95'} 
              transition-transform duration-200`}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-16 h-16 rounded-full bg-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CameraCapture;