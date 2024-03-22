import React from "react";

import Input from "../../components/Input/input";
import ListBox from "../../components/ListBox";
import styles from "./style.module.scss";

const Users = () => {
  return (
    <div className={styles.container}>
      <div className={styles.dataBox}>
        <h2 className={styles.title}>Github Users</h2>
        <div className={styles.inputBox}>
          <Input placeholder="Search User" />
        </div>
        <div className={styles.userBox}>
          <ListBox />
        </div>
        <div className={styles.userBox}>
          <ListBox />
        </div>
      </div>
    </div>
  );
};

export default Users;
