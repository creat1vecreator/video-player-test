import { useEffect, useRef } from 'react';

export const useWebStreamRecorder = (
  setBlobVideo: (blob: Blob) => void,
  recordingExpiringTime: number,
) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const getCameraStream = async () => {
    if (videoRef?.current)
      videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
  };

  useEffect(() => {
    getCameraStream().catch((error) =>
      console.log('Ошибка при получении доступа к камере: ', error),
    );
  }, []);

  return { videoRef };
};
