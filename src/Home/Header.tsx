import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../assets/Logo.png";
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src={logo} alt="Resilian logo" />
        <h1>Resilian</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {" "}
            <Link to="/about">About us</Link>
          </li>
        </ul>
        <div className={styles.buttons}>
          <button className={`${styles.button1} pt-1.5 pb-2 text-[14px]`}>
            Log in
          </button>
          <button className={`${styles.button2} text-[14px] pt-1.5 pb-2 px-4`}>
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
