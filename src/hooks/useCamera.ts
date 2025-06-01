import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

export const useCamera = () => {
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Handle camera ready state
  const handleCameraReady = useCallback(() => {
    if (webcamRef.current?.video?.srcObject) {
      streamRef.current = webcamRef.current.video.srcObject as MediaStream;
    }
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
    try {
      // Stop all tracks from the stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
        });
        streamRef.current = null;
      }

      // Also check webcam ref's video stream
      if (webcamRef.current?.video?.srcObject) {
        const stream = webcamRef.current.video.srcObject as MediaStream;
        stream.getTracks().forEach(track => {
          track.stop();
        });
        webcamRef.current.video.srcObject = null;
      }

      setIsCameraReady(false);
      setError(null);
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
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