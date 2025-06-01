import { useState, useRef, useCallback } from 'react';

export const useCamera = () => {
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const webcamRef = useRef<any>(null);

  // Capture a frame from the webcam
  const captureImage = useCallback(() => {
    if (!webcamRef.current) {
      setError('Camera is not ready');
      return null;
    }
    
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      return imageSrc;
    } catch (error) {
      console.error('Failed to capture image:', error);
      setError('Failed to capture image');
      return null;
    }
  }, []);

  // Handle camera ready state
  const handleCameraReady = useCallback(() => {
    setIsCameraReady(true);
    setError(null);
  }, []);

  // Cleanup
  const cleanup = useCallback(() => {
    setIsCameraReady(false);
    setError(null);
  }, []);

  return {
    webcamRef,
    isCameraReady,
    error,
    captureImage,
    handleCameraReady,
    cleanup
  };
};