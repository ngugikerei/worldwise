import styles from './Button.module.css';
export default function Button({ children, onClick, type }) {
  return (
    //add two css classes in classname depending on type
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
