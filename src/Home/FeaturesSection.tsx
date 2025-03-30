import styles from "./Features.module.css";
import { Link } from "react-router-dom";
import community from "../assets/community.png";
import coaching from "../assets/coaching.png";
import tracker from "../assets/tracker.png";
import venture from "../assets/venture.png";
export default function Features() {
  return (
    <div className={styles.home11}>
      <h1>
        "Financial independence is the key to a woman’s freedom." Oprah Winfrey
      </h1>
      <ul>
        <li>
          <Link to="./community" className={styles.icons}>
            <img src={community} alt="" />
            <span>Community</span>
          </Link>
        </li>
        <li>
          <Link to="./coaching" className={styles.icons}>
            <img src={coaching} alt="" />
            <span>Coaching</span>
          </Link>
        </li>
        <li>
          <Link to="./venture" className={styles.icons}>
            <img src={venture} alt="" />
            <span>Venture</span>
          </Link>
        </li>
        <li>
          <Link to="./tracker" className={styles.icons}>
            <img src={tracker} alt="" />
            <span>Tracker</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
