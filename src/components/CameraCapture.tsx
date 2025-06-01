import React, { useEffect } from 'react';
import Webcam from 'react-webcam';
import { X, Camera } from 'lucide-react';
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
    width: { min: 720, ideal: 1280, max: 1920 },
    height: { min: 1280, ideal: 1920, max: 2560 },
    facingMode: "user",
    aspectRatio: 3/4
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={handleCancel}>Go Back</Button>
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
      {/* Close button */}
      <div className="absolute top-safe right-4 z-10 pt-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleCancel} 
          className="text-white bg-black/20 backdrop-blur-sm hover:bg-white/10"
        >
          <X />
        </Button>
      </div>

      {/* Camera container with proper aspect ratio */}
      <div className="relative h-full">
        <div className="absolute inset-0">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            onUserMedia={handleCameraReady}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Overlay with guide circle */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="relative w-[80vw] max-w-[400px] aspect-square">
            <div className="absolute inset-0 border-2 border-dashed border-white/70 rounded-full" />
          </div>
        </div>

        {/* Guidance text */}
        <div className="absolute left-4 right-4 bottom-32 text-center">
          <div className="inline-block px-6 py-3 bg-black/40 backdrop-blur-sm rounded-2xl">
            <p className="text-white/90 text-lg">
              Position your face within the circle
            </p>
          </div>
        </div>

        {/* Capture button */}
        <div className="absolute inset-x-0 bottom-0 pb-8 pt-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="flex justify-center">
            <Button
              onClick={handleCapture}
              disabled={!isCameraReady}
              className="w-20 h-20 rounded-full p-0 relative overflow-hidden group disabled:opacity-50"
            >
              <motion.div
                className="absolute inset-0 bg-white"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="absolute inset-2 rounded-full border-4 border-gray-100 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-600" />
                </div>
              </motion.div>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CameraCapture;