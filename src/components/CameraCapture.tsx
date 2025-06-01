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
    if (!isCameraReady) return;
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
      <div className="fixed inset-0 flex items-center justify-center bg-black p-4">
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
      {/* Close button */}
      <motion.div 
        className="absolute top-safe right-4 z-10 pt-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleCancel}
          className="bg-black/20 backdrop-blur-sm hover:bg-white/10 text-white"
        >
          <X className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Camera view */}
      <div className="relative h-full">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={handleCameraReady}
          className="h-full w-full object-cover"
        />

        {/* Guide overlay */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Face guide circle */}
          <div className="relative w-[80vw] max-w-[400px] aspect-square">
            <motion.div 
              className="absolute inset-0 border-2 border-dashed border-white/70 rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            />
          </div>
        </motion.div>

        {/* Guidance text */}
        <motion.div 
          className="absolute left-4 right-4 bottom-32 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-block px-6 py-3 bg-black/40 backdrop-blur-sm rounded-2xl">
            <p className="text-white/90 text-lg">
              Position your face within the circle
            </p>
          </div>
        </motion.div>

        {/* Capture button */}
        <motion.div 
          className="absolute inset-x-0 bottom-0 pb-8 pt-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex justify-center">
            <motion.button
              onClick={handleCapture}
              disabled={!isCameraReady}
              className={`relative w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center focus:outline-none ${
                !isCameraReady ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.div 
                className="absolute inset-2 rounded-full border-4 border-gray-100"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-600" />
                </div>
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CameraCapture;