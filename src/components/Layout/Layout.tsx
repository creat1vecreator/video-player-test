import React from 'react';
import { Outlet } from 'react-router';
import cn from 'classnames/bind';
import styles from './Layout.module.scss';

const cx = cn.bind(styles);
export const Layout = () => {
  return (
    <div className={styles.Layout}>
      <section className={cx(styles.Layout__outletWrapper)}>
        <Outlet />
      </section>
    </div>
  );
};
