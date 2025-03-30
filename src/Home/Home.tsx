import Header from "./Header";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import Services from "./Services";
import styles from "./Home.module.css";
import CallToAction from "./CallToAction";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className={styles.home}>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Services />
      <CallToAction />
      <Footer />
    </div>
  );
}
