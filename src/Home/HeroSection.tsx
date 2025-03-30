import { useEffect, useState } from "react";
import pic1 from "../assets/controlmoney.jpg";
import pic2 from "../assets/golden atm.jpg";
import styles from "./HeroSection.module.css";
import card from "../assets/credit card.png";
import line from "../assets/Vector.png";
const images = [pic1, pic2];

export default function HeroSection() {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${styles.home1} flex justify-between items-center overflow-hidden relative pt-0 pb-4 px-40`}
    >
      <div className={styles.con}>
        <div className={styles.text_container}>
          <h1>Take control of your financial future</h1>
          <p>
            Resilian helps woman gain financial literacy , track savings,find
            business funding, and connect with mentors.
          </p>

          <button className={styles.button1}>Get started</button>
          <button className={styles.button2}>Log in </button>
        </div>

        <div className={styles.card} style={{ top: "50%", left: "80%" }}>
          <img src={card} alt="Credit Card" />
        </div>
        <div className={styles.line} style={{ top: "57%", left: "9%" }}>
          <img src={line} alt="line " />
        </div>
        <div
          className={styles.text}
          style={{ top: "33%", left: "95%", backgroundColor: "white" }}
        >
          <span>
            <p>Enter amount</p>
            <h4>$450.00</h4>
          </span>
          <button>Send </button>
        </div>
      </div>

      <div className={styles.imageContainer}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="control your financial future"
            className={index === imageIndex ? styles.active : ""}
          />
        ))}
      </div>
    </div>
  );
}
