import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import NavigationBar from './NavigationBar'

const Header = () => {
    return (
        <header className={styles.header}>
            <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
                <h1>🗂️ Todo App</h1>
            </Link>
            <NavigationBar />
        </header>
    )
}

export default Header
