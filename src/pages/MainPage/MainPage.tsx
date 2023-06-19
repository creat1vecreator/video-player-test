import React, { FC, useEffect, useState } from 'react';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import { useWebStream } from './hooks/useWebStream';
import styles from './styles.module.scss';

import { RECORDING_EXPIRING_TIME } from '@/pages/MainPage/constants';
import { useScreenRecorder } from '@/pages/MainPage/hooks/useScreenRecorder';

export const MainPage: FC = () => {
  const [blobScreen, setBlobScreen] = useState<Blob | null>(null);
  const [blobVideo, setBlobVideo] = useState<Blob | null>(null);

  const { stopScreenRecord } = useScreenRecorder(
    setBlobScreen,
    RECORDING_EXPIRING_TIME,
  );

  const handleDownloadClick = () => {
    const zip = new JSZip();

    if (blobScreen) zip.file('screen-recording.webm', blobScreen);
    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, 'records.zip');
    });
  };

  useEffect(() => {
    console.log('useEffect blobScreen', blobScreen);
  }, [blobScreen]);

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

        {/* <video */}
        {/*  autoPlay */}
        {/*  muted */}
        {/*  loop */}
        {/*  playsInline */}
        {/*  className={styles.MainPage__webStream} */}
        {/*  ref={videoRef} */}
        {/* /> */}
      </div>

      <div className="preview">
        <video controls width="640" height="360" />
      </div>

      <button onClick={() => stopScreenRecord()}>STOP</button>
    </div>
  );
};
