import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import postsSlice from '../modules/slices/posts';
import { deletePost } from '../modules/actions/posts';
import { getDateStr } from '../utils/functions';
import styles from '../styles/detail.module.css';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts, message } = useSelector(
    (state) => ({
      posts: state.posts.data,
      message: state.posts.message,
    }),
    shallowEqual
  );

  const user = useSelector((state) => state.auth.user);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const _post = posts.filter((post) => post.id === Number(id))[0];
    setPost(_post);
  }, []);

  useEffect(() => {
    if (message === 'Deleted') {
      alert('포스트가 삭제되었습니다.');
      navigate('/', { replace: true });
    }

    return () => {
      dispatch(postsSlice.actions.clearMessage());
    };
  }, [message]);

  const onClickEdit = useCallback(() => {
    navigate('/form', { state: id });
  }, [id]);
  const onClickDelete = useCallback(() => {
    dispatch(deletePost(id));
  }, [id]);
  const onClickHome = useCallback(() => {
    navigate('/');
  }, []);

  return (
    <div className={styles.container}>
      {post && (
        <>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.info}>
            <div>{`${post.author} | ${getDateStr(post.date)}`}</div>
          </div>
          <div className={styles.description}>{post.description}</div>
          <div className={styles.buttonContainer}>
            {user?.nickname === post?.author && (
              <button className={styles.editButton} onClick={onClickEdit}>
                수정
              </button>
            )}
            <button className={styles.homeButton} onClick={onClickHome}>
              홈
            </button>
            {user?.nickname === post?.author && (
              <button className={styles.deleteButton} onClick={onClickDelete}>
                삭제
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
