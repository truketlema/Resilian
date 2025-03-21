import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import logo from "./assets/Rectangle.png"
import saving from "./assets/saving.jpg";
import budget from "./assets/budget.jpg"

function HomePage() {
  return (
    <div className="home-page">
      <header className="header">
        <div className="container">
          <div className="logo">
            <img src={logo} alt="Resilian Logo" width={24} height={24} />
            <span>Resilian</span>
          </div>
          <nav className="nav">
            <a href="#" className="nav-link">
              Home
            </a>
            <a href="#" className="nav-link">
              About
            </a>
            <a href="#" className="nav-link">
              Services
            </a>
            <Link to="/budget-tracker" className="nav-link">
              Budget Tracker
            </Link>
          </nav>
          <button className="button primary">Sign In</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1>Take control of your financial future</h1>
              <p>
                Access tools, resources and knowledge to help you achieve
                financial independence and secure your future.
              </p>
              <div className="hero-buttons">
                <button className="button primary">Get Started</button>
                <Link to="/budget-tracker" className="button secondary">
                  Try Budget Tracker
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="image-wrapper">
                              <img src={ saving} alt="Financial control" />
              </div>
            </div>
          </div>
        </section>

        <section className="quote">
          <div className="container">
            <blockquote>
              <p>"Financial independence is the key to a woman's freedom."</p>
              <footer>- Oprah Winfrey</footer>
            </blockquote>
            <div className="features">
              <div className="feature">
                <div className="feature-dot blue"></div>
                <span>Reliability</span>
              </div>
              <div className="feature">
                <div className="feature-dot green"></div>
                <span>Security</span>
              </div>
              <div className="feature">
                <div className="feature-dot yellow"></div>
                <span>Budget Control</span>
              </div>
              <div className="feature">
                <div className="feature-dot purple"></div>
                <span>Community</span>
              </div>
            </div>
          </div>
        </section>

        <section className="budget-promo">
          <div className="container">
            <div className="promo-content">
              <h2>Track Your Savings Like a Habit</h2>
              <p>
                Our new Budget Tracker tool helps you set saving goals based on
                your income, track expenses, and build wealth consistently.
              </p>
              <ul className="promo-features">
                <li>
                  <CheckCircle2 size={20} />
                  <span>Personalized saving plans based on your income</span>
                </li>
                <li>
                  <CheckCircle2 size={20} />
                  <span>Daily or weekly tracking options</span>
                </li>
                <li>
                  <CheckCircle2 size={20} />
                  <span>Visual progress tracking to stay motivated</span>
                </li>
                <li>
                  <CheckCircle2 size={20} />
                  <span>Expert saving tips tailored to your goals</span>
                </li>
              </ul>
              <Link to="/budget-tracker" className="button primary">
                Try Budget Tracker Now
              </Link>
            </div>
            <div className="promo-image">
              <img src={budget} alt="Budget Tracker Tool" />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} Resilian. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
