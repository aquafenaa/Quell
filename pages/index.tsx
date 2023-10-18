import React from 'react';
import AddStreamMenu from '../components/AddStreamMenu';

import styles from '../styles/index.module.css';

export default function Home() {
  return (
    <div id={styles.home_page}>
      <h1 id={styles.title}>Quell</h1>
      <p id={styles.description}>
        A site that allows you to watch your favorite streams in one place, without having to switch back and forth between two tabs.
      </p>
      <AddStreamMenu />
    </div>
  );
}
