import React from 'react';
import Input from './Input';
import Output from './Output';

import styles from './App.less';

export default (props) => (
  <div className={styles.app}>
    <h1 className={styles.header}>Paste your HAR</h1>
    <Input />
    <Output />
  </div>
)
