import { useEffect, useRef, useState } from 'react';

export const useScreenRecorder = (
  setBlobScreen: (blob: Blob) => void,
  recordingExpiringTime: number,
) => {
  const screenRecorderRef = useRef<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const stopScreenRecord = () => {
    console.log('screenRecorderRef', screenRecorderRef);
    if (screenRecorderRef.current) {
      console.log('screenRecorderRef', `${screenRecorderRef.current?.onstop}`);
      screenRecorderRef.current?.stop();
      if (stream) stream.getTracks().forEach((track) => track.stop());
    }
  };

  const createScreenRecord = () => {
    navigator.mediaDevices.getUserMedia().then((screenStream) => {
      setStream(screenStream);
      console.log('screenStream', screenStream);

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

      screenRecorderRef.current = recorder;
    });
  };

  useEffect(() => {
    if (!screenRecorderRef.current) createScreenRecord();
  }, [screenRecorderRef.current]);

  return { stopScreenRecord };
};
