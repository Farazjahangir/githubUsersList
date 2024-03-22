import React from "react";

import styles from "./style.module.scss";

const ListBox = ({onNameClick}) => {
  return (
    <div className={styles.container}>
      <img
        src="https://avatars.githubusercontent.com/u/38138258?v=4"
        className={styles.userPicture}
      />
      <div className={styles.detailsBox}>
        <p className={styles.name} onClick={onNameClick}>Faraz Jahangir</p>
        <a
          href="https://github.com/Farazjahangir/githubUsersList"
          target="_blank"
          className={styles.url}
        >
          https://github.com/Farazjahangir/githubUsersList
        </a>
      </div>
    </div>
  );
};

export default ListBox;
