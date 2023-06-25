import { useEffect, useState } from 'react';

export const useScreenRecorder = (
  setBlobScreen: (blob: Blob) => void,
  recordingExpiringTime: number,
) => {
  const [screenRecorder, setScreenRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [stream, setStream] = useState<MediaStream | null>(null);

  const stopScreenRecord = () => {
    console.log('screenRecorder', screenRecorder);
    if (screenRecorder) {
      console.log('stop');
      screenRecorder?.stop();
      if (stream) stream.getTracks().forEach((track) => track.stop());
    }
  };

  const createScreenRecord = () => {
    try {
      navigator.mediaDevices
        .getDisplayMedia({ audio: true })
        .then((screenStream) => {
          setStream(screenStream);

          const recorder = new MediaRecorder(screenStream, {
            mimeType: 'video/webm',
          });

          const chunks: Blob[] = [];
          // create and array to store the recorder data chunks
          recorder.ondataavailable = (event) => {
            chunks.push(event.data);
          };

          // when recording stops, create a blob object and url for the recorder video
          recorder.onstop = () => {
            console.log('onstop');
            const blob = new Blob(chunks, { type: 'video/webm' });
            setBlobScreen(blob);
          };
          recorder.start();

          setScreenRecorder(recorder);
        });
    } catch (e) {
      console.error('error', e);
    }
  };

  useEffect(() => {
    if (!screenRecorder) createScreenRecord();
  }, []);

  return { stopScreenRecord };
};
