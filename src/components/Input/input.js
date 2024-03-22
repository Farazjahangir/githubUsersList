import React from 'react'

import styles from "./style.module.scss"

const Input = ({
    placeholder,
    onKeyUp
}) => {
    return (
        <input className={styles.input} placeholder={placeholder} onKeyUp={onKeyUp} />
    )
}

export default Input
