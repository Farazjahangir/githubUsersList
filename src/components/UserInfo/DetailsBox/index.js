import React from 'react'
import clsx from 'clsx'

import styles from "./styles.module.scss"

const DetailsBox = () => {
    return (
        <div className={styles.container}>
            <p className={styles.text}>Followers:</p>
            <p className={clsx(styles.text, styles.orangeText)}>100</p>
        </div>
    )
}

export default DetailsBox