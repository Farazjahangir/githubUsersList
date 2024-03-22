import React from "react";
import clsx from "clsx";

import styles from "./styles.module.scss";

const DetailsBox = ({ title, value, type }) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{title}:</p>
      {type === "url" ? (
        <a
          className={clsx(styles.text, styles.orangeText)}
          href={value}
          target="_blank"
        >
          {value}
        </a>
      ) : (
        <p className={clsx(styles.text, styles.orangeText)}>{value}</p>
      )}
    </div>
  );
};

export default DetailsBox;
