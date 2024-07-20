import React from 'react'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <h3>Escreva sobre o que você tem interese!</h3>
      <p>Mini Blog &copy; {new Date().getFullYear()}</p>
    </footer>
  )
}
