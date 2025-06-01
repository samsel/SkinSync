import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

export const useCamera = () => {
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  // Handle camera ready state
  const handleCameraReady = useCallback(() => {
    console.log('Camera ready');
    setIsCameraReady(true);
    setError(null);
  }, []);

  // Capture a frame from the webcam
  const captureImage = useCallback(() => {
    if (!webcamRef.current) {
      setError('Camera is not initialized');
      return null;
    }
    
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        setError('Failed to capture image');
        return null;
      }
      return imageSrc;
    } catch (error) {
      console.error('Failed to capture image:', error);
      setError('Failed to capture image');
      return null;
    }
  }, []);

  // Cleanup camera resources
  const cleanup = useCallback(() => {
    if (webcamRef.current) {
      const stream = webcamRef.current.video?.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
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