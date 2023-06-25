import React, { FC, useEffect, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import styles from './styles.module.scss';

import { RECORDING_EXPIRING_TIME } from '@/pages/MainPage/constants';
import { useScreenRecorder } from '@/pages/MainPage/hooks/useScreenRecorder';
import { useWebStreamRecorder } from '@/pages/MainPage/hooks/useWebStreamRecorder';

export const MainPage: FC = () => {
  const [blobScreen, setBlobScreen] = useState<Blob | null>(null);
  const [blobVideo, setBlobVideo] = useState<Blob | null>(null);
  const { videoRef } = useWebStreamRecorder(
    setBlobVideo,
    RECORDING_EXPIRING_TIME,
  );
  const { stopScreenRecord } = useScreenRecorder(
    setBlobScreen,
    RECORDING_EXPIRING_TIME,
  );

  const {
    startRecording: startRecordingVideo,
    stopRecording: stopRecordingVideo,
  } = useReactMediaRecorder({
    video: true,
    screen: false,
    audio: false,
    onStop: (blobUrl: string, blob: Blob) => {
      setBlobVideo(blob);
    },
  });

  const handleDownloadClick = () => {
    const zip = new JSZip();

    if (blobScreen) zip.file('screen-recording.webm', blobScreen);
    if (blobVideo) zip.file('vide-recording.webm', blobVideo);
    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, 'records.zip');
    });
  };

  useEffect(() => {
    startRecordingVideo();
  }, []);

  useEffect(() => {
    if (blobVideo && blobScreen) handleDownloadClick();
  }, [blobScreen, blobVideo]);

  return (
    <div className={styles.MainPage}>
      <div className={styles.MainPage__videoAndWeb}>
        <video
          className={styles.MainPage__video}
          autoPlay
          muted
          loop
          playsInline
          controls
        >
          <source src="https://tvbet.tv/wp-content/uploads/2021/02/video-glavnaya_na-zagruzku.mp4" />
        </video>

        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.MainPage__webStream}
          ref={videoRef}
        />
      </div>

      <button
        onClick={() => {
          stopRecordingVideo();
          stopScreenRecord();
        }}
      >
        STOP
      </button>
    </div>
  );
};
