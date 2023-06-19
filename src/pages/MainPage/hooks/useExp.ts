import { useState } from 'react';

export const useExp = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [chunksExp, setChunksExp] = useState<Blob | null>(null);

  // define a function to start capturing the screen
  const handleCaptureClick = async () => {
    try {
      //  use the getDisplayMedia method to access the screen
      const screenStream = await navigator.mediaDevices.getDisplayMedia();
      setStream(screenStream);

      // create and object to recorder the screen
      const screenRecorder = new MediaRecorder(screenStream, {
        mimeType: 'video/webm',
      });
      setRecorder(screenRecorder);
      const chunks: Blob[] = [];
      // create and array to store the recorder data chunks
      screenRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
        setChunksExp(event.data as any);
      };

      // when recording stops, create a blob object and url for the recorder video
      screenRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const newVideoUrl = URL.createObjectURL(blob);
        setVideoUrl(newVideoUrl);
      };

      // Start recording
      screenRecorder.start();
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  //  define a funtion to stop capturing the screen
  const handleStopClick = () => {
    if (recorder) recorder.stop();
    if (stream) stream.getTracks().forEach((track) => track.stop());
  };

  // define a funtion to handle the downloading
  const handleDownloadClick = () => {
    const a = document.createElement('a');
    a.href = videoUrl || '';
    a.download = 'screen-recording.webm';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // reload the page to remove video preview section
    window.location.reload();
  };

  return { handleCaptureClick, handleDownloadClick, handleStopClick };
};
