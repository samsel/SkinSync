import { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';

export const useCamera = () => {
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mountedRef = useRef(true);

  // Cleanup function that ensures all tracks are stopped
  const cleanup = useCallback(() => {
    try {
      // Stop all tracks from the stored stream reference
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
        });
        streamRef.current = null;
      }

      // Stop all tracks from the video element
      if (webcamRef.current?.video?.srcObject instanceof MediaStream) {
        const stream = webcamRef.current.video.srcObject as MediaStream;
        stream.getTracks().forEach(track => {
          track.stop();
        });
        webcamRef.current.video.srcObject = null;
      }

      if (mountedRef.current) {
        setIsCameraReady(false);
      }
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }, []);

  // Handle camera ready state
  const handleCameraReady = useCallback((stream: MediaStream) => {
    if (!mountedRef.current) {
      stream.getTracks().forEach(track => track.stop());
      return;
    }

    try {
      streamRef.current = stream;
      setIsCameraReady(true);
      setError(null);
    } catch (error) {
      console.error('Error in handleCameraReady:', error);
      cleanup();
      setError('Failed to initialize camera');
    }
  }, [cleanup]);

  // Handle camera errors
  const handleCameraError = useCallback((error: string | DOMException) => {
    const errorMessage = error instanceof DOMException 
      ? 'Camera access denied. Please grant permission to use your camera.'
      : 'Failed to access camera. Please try again.';
    
    setError(errorMessage);
    setIsCameraReady(false);
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
      
      // Immediately cleanup after capture
      cleanup();
      return imageSrc;
    } catch (error) {
      console.error('Error capturing image:', error);
      cleanup();
      setError('Failed to capture image');
      return null;
    }
  }, [cleanup]);

  // Cleanup on mount and unmount
  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      cleanup();
    };
  }, [cleanup]);

  return {
    webcamRef,
    isCameraReady,
    error,
    captureImage,
    handleCameraReady,
    handleCameraError,
    cleanup
  };
};