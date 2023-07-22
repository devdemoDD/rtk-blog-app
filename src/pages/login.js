import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../modules/actions/auth';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/uForm.module.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userInfo;

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(login(userInfo));
    },
    [userInfo]
  );

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setUserInfo({
        ...userInfo,
        [name]: value,
      });
    },
    [userInfo]
  );

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>로그인</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          type="text"
          name="email"
          value={email}
          placeholder="이메일 입력"
          onChange={onChange}
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호 입력"
          onChange={onChange}
        />
        <button className={styles.button} type="submit">
          로그인
        </button>
      </form>
      or
      <div className={styles.linkContainer}>
        <Link className={styles.link} to="/signup">
          회원가입
        </Link>
        <Link className={styles.link} to="/">
          홈
        </Link>
      </div>
    </div>
  );
};

export default Login;
