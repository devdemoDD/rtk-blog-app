import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../modules/actions/auth';
import authSlice from '../modules/slices/auth';
import styles from '../styles/uForm.module.css';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector((state) => state.auth.message);
  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
    password1: '',
    password2: '',
  });

  const { email, nickname, password1, password2 } = userInfo;

  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;

      setUserInfo({
        ...userInfo,
        [name]: value,
      });
    },
    [userInfo]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (password1 !== password2) {
        alert('비밀번호가 다릅니다.');
        return;
      }

      const body = {
        email,
        nickname,
        password: password1,
        type: 1,
      };
      dispatch(signup(body));
    },
    [userInfo]
  );

  useEffect(() => {
    if (message === 'Created') {
      alert('가입이 완료되었습니다. 다시 로그인을 해주세요.');
      navigate('/login', { replace: true });
    }

    return () => {
      dispatch(authSlice.actions.clearMessage());
    };
  }, [message]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>회원가입</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          name="email"
          type="email"
          value={email}
          placeholder="이메일 입력"
          onChange={onChange}
          required
        />
        <input
          className={styles.input}
          name="nickname"
          type="text"
          value={nickname}
          placeholder="닉네임 입력"
          onChange={onChange}
          required
        />
        <input
          className={styles.input}
          name="password1"
          type="password"
          value={password1}
          placeholder="비밀번호 입력"
          onChange={onChange}
          required
        />
        <input
          className={styles.input}
          name="password2"
          type="password"
          value={password2}
          placeholder="비밀번호 확인"
          onChange={onChange}
          required
        />
        <button type="submit" className={styles.button}>
          가입하기
        </button>
      </form>
      or
      <div className={styles.linkContainer}>
        <Link className={styles.link} to="/login">
          로그인
        </Link>
        <Link className={styles.link} to="/">
          홈
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
