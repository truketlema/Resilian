import mother from "../assets/mother.jpg";
import community from "../assets/community.png";
import coaching from "../assets/coaching.png";
import tracker from "../assets/tracker.png";
import venture from "../assets/venture.png";
import guide from "../assets/Investment guide.png";
import styles from "./Services.module.css";
export default function Services() {
  return (
    <div className="flex justify-center items-center w-[75%] mx-auto pb-[10px] gap-[50px] pt-[50px] overflow-hidden">
      <div className="flex-1 h-[80vh] overflow-hidden relative pr-[30px]">
        <img
          className="w-full h-[80vh] object-cover object-center shadow-md shadow-[#443627]"
          src={mother}
          alt="image of mother braiding her child's hair"
        />
        <div className="absolute" style={{ bottom: "-60%", right: "57%" }}>
          {/* <h1>
            "Financial independence is the key to a woman’s freedom." Oprah Winfrey
          </h1> */}
        </div>
      </div>

      <div className="flex-1 w-1/2 text-[20px]">
        <h2 className="text-center text-[1.5em] text-[#333] opacity-90">
          Services we provide
        </h2>
        <ul className="flex flex-col">
          <li className="flex gap-[1em] px-[70px] py-[15px]">
            <img
              className="w-[30px] h-[30px]"
              src={community}
              alt="Community support"
            />
            <span>Community support</span>
          </li>
          <li className="flex gap-[1em] px-[70px] py-[15px]">
            <img
              className="w-[30px] h-[30px]"
              src={coaching}
              alt="Personalized coaching"
            />
            <span>Personalized coaching</span>
          </li>
          <li className="flex gap-[1em] px-[70px] py-[15px]">
            <img
              className="w-[30px] h-[30px]"
              src={venture}
              alt="Venture connection"
            />
            <span>Venture connection</span>
          </li>
          <li className="flex gap-[1em] px-[70px] py-[15px]">
            <img
              className="w-[30px] h-[30px]"
              src={tracker}
              alt="Budget tracker"
            />
            <span>Budget tracker</span>
          </li>
          <li className="flex gap-[1em] px-[70px] py-[15px]">
            <img
              className="w-[30px] h-[30px]"
              src={guide}
              alt="Investment and saving guides"
            />
            <span>Investment and saving guides</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
