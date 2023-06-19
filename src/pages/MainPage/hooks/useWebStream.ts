import { useEffect, useRef } from 'react';

export const useWebStream = (
  webStreamRecorder: MediaRecorder | null,
  setWebStreamRecorder: (webStreamRecorder: MediaRecorder | null) => void,
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
