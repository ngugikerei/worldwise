import Logo from './Logo';
import AppNav from './AppNav';
import styles from './Sidebar.module.css';
import { Outlet } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p> &copy; Copyright {new Date().getFullYear()} Worldwise Inc</p>
      </footer>
    </div>
  );
}
