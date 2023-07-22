import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import postsSlice from '../modules/slices/posts';
import { addPost, editPost } from '../modules/actions/posts';
import styles from '../styles/form.module.css';

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: postID } = useLocation();
  const user = useSelector((state) => state.auth.user);
  const { message, posts } = useSelector(
    (state) => ({
      message: state.posts.message,
      posts: state.posts.data,
    }),
    shallowEqual
  );

  const [post, setPost] = useState({
    title: '',
    description: '',
  });
  const { title, description } = post;

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!title || !description) {
        alert('제목 혹은 내용을 입력하세요.');
        return;
      }

      if (postID) {
        const body = {
          id: Number(postID),
          data: {
            title,
            description,
          },
        };
        dispatch(editPost(body));
      } else {
        const body = {
          author: user.nickname,
          title,
          description,
          date: Date.now(),
        };
        dispatch(addPost(body));
      }
    },
    [post]
  );
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setPost({
        ...post,
        [name]: value,
      });
    },
    [post]
  );
  const onClickCancel = useCallback(() => {
    navigate(-1);
  }, []);

  useEffect(() => {
    if (postID) {
      const _post = posts.filter((post) => post.id === Number(postID))[0];
      setPost(_post);
    }
  }, []);

  useEffect(() => {
    if (message === 'Created') {
      alert('포스트가 추가되었습니다.');
      navigate('/', { replace: true });
    } else if (message === 'Edited') {
      alert('포스트가 수정되었습니다.');
      navigate('/', { replace: true });
    }

    return () => {
      dispatch(postsSlice.actions.clearMessage());
    };
  }, [message]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{`포스트 ${postID ? '수정' : '추가'}`}</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          name="title"
          type="text"
          placeholder="제목 입력"
          value={title}
          onChange={onChange}
        />
        <textarea
          className={styles.textarea}
          name="description"
          placeholder="내용 입력"
          value={description}
          onChange={onChange}
        />
      </form>
      <div className={styles.buttonContainer}>
        <button className={styles.cancelButton} onClick={onClickCancel}>
          취소
        </button>
        <button type="submit" className={styles.completeButton} onClick={onSubmit}>
          완료
        </button>
      </div>
    </div>
  );
};

export default Form;
