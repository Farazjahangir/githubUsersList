import React from "react";

import styles from "./style.module.scss";

const ListBox = ({onNameClick, data}) => {
  return (
    <div className={styles.container}>
      <img
        src={data.pic}
        alt="User Picture"
        className={styles.userPicture}
      />
      <div className={styles.detailsBox}>
        <p className={styles.name} onClick={onNameClick}>{data.username}</p>
        <a
          href={data.profileUrl}
          target="_blank"
          className={styles.url}
        >
         {data.profileUrl}
        </a>
      </div>
    </div>
  );
};

export default ListBox;
