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
      // Stop all tracks from the stored stream reference
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
        });
        streamRef.current = null;
      }

      // Stop all tracks from the video element
      if (webcamRef.current?.video?.srcObject instanceof MediaStream) {
        const stream = webcamRef.current.video.srcObject as MediaStream;
        stream.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
        });
        webcamRef.current.video.srcObject = null;
      }

      // Explicitly stop any active user media
      if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({ video: false, audio: false })
          .then(stream => {
            stream.getTracks().forEach(track => {
              track.stop();
              track.enabled = false;
            });
          })
          .catch(() => {});
      }

      setIsCameraReady(false);
      setError(null);
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }, []);

  // Handle camera ready state
  const handleCameraReady = useCallback((stream: MediaStream) => {
    try {
      // Store the stream reference for later cleanup
      streamRef.current = stream;
      setIsCameraReady(true);
      setError(null);
    } catch (error) {
      console.error('Error in handleCameraReady:', error);
      cleanup();
      setError('Failed to initialize camera');
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
      
      // Immediately cleanup after successful capture
      cleanup();
      return imageSrc;
    } catch (error) {
      console.error('Error capturing image:', error);
      cleanup();
      setError('Failed to capture image');
      return null;
    }
  }, [cleanup]);

  // Cleanup on unmount
  useEffect(() => {
    // Initial cleanup to ensure no lingering streams
    cleanup();
    
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