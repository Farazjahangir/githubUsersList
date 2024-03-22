import React from 'react'

import styles from "./style.module.scss"

const Input = ({
    placeholder,
    onChange
}) => {
    return (
        <input className={styles.input} placeholder={placeholder} onChange={onChange} />
    )
}

export default Input
