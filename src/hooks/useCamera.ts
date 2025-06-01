import { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';

export const useCamera = () => {
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Cleanup function that ensures all tracks are stopped
  const cleanup = useCallback(() => {
    try {
      // Function to stop all tracks in a stream
      const stopStream = (stream: MediaStream | null) => {
        if (stream) {
          stream.getTracks().forEach(track => {
            track.enabled = false;
            track.stop();
          });
        }
      };

      // Stop stream from streamRef
      stopStream(streamRef.current);
      streamRef.current = null;

      // Stop stream from webcam video element
      if (webcamRef.current?.video?.srcObject) {
        stopStream(webcamRef.current.video.srcObject as MediaStream);
        webcamRef.current.video.srcObject = null;
      }

      // Clear any active media streams
      navigator.mediaDevices.getUserMedia({ video: false })
        .then(stream => {
          stream.getTracks().forEach(track => track.stop());
        })
        .catch(() => {});

      setIsCameraReady(false);
      setError(null);
    } catch (error) {
      console.error('Error during cleanup:', error);
      setError('Error during cleanup');
    }
  }, []);

  // Handle camera ready state
  const handleCameraReady = useCallback((stream: MediaStream) => {
    try {
      streamRef.current = stream;
      setIsCameraReady(true);
      setError(null);
    } catch (error) {
      console.error('Error in handleCameraReady:', error);
      setError('Failed to initialize camera');
      cleanup();
    }
  }, [cleanup]);

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
      console.error('Error capturing image:', error);
      setError('Failed to capture image');
      return null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    webcamRef,
    isCameraReady,
    error,
    captureImage,
    handleCameraReady,
    cleanup
  };
};