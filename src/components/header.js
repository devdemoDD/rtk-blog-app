import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import authSlice from '../modules/slices/auth';
import styles from '../styles/header.module.css';

const Header = ({ nickname, email, count }) => {
  const dispatch = useDispatch();

  const onClickLogout = useCallback(() => {
    dispatch(authSlice.actions.logout());
  }, []);

  return (
    <div className={styles.lContainer}>
      <div className={styles.searchContainer}>
        <div className={styles.result}>
          <span className={styles.name}>{nickname}</span>
          님의 포스트 : <span className={styles.count}>{count}</span>개
        </div>
        <Link className={styles.link} to="/form">
          포스트 추가
        </Link>
      </div>
      <div className={styles.userInfoContainer}>
        <div>{nickname}</div>
        <div>{email}</div>
        <button className={styles.button} onClick={onClickLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default React.memo(Header);
