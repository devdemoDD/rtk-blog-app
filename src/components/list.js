import React from 'react';
import Post from './post';
import styles from '../styles/list.module.css';

const List = ({ posts }) => {
  return (
    <ul className={styles.container}>
      {posts && posts.length > 0 && posts.map((item) => <Post key={item.id} {...item} />)}
    </ul>
  );
};

export default React.memo(List);
