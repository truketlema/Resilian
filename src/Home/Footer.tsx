import { useState } from "react";
import birr from "../assets/birr.png";
import qoute from "../assets/quotation.png";
export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // const [emails, setEmails] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    console.log("Form submitted with:", { email, message });

    setEmail("");
    setMessage("");
  };
  return (
    <div className="flex  items-center justify-center bg-color1 text-customText  h-screen pt-16 mt-8 pb-4 shadow-[5px_5px_15px_rgba(68,58,39,1)] ">
      <div className="container w-[85%] flex  ">
        <div className=" container1 w-1/2 pr-16 ">
          <h2 className="mb-12 text-[40px] ">About us</h2>
          <p className="mb-6">
            Resilian is more than a platform—it’s a movement. We equip women
            with the tools, support, and opportunities to break financial
            barriers, build thriving businesses, and step into independence with
            confidence.
          </p>
          <img src={qoute} className="w-8 mb-6" alt="" />
          <p>
            We believe in a future where every woman has the confidence,
            resources, and support to build her own path to success.
          </p>
        </div>
        <div className="container2 w-1/2 flex flex-col items-center justify-center mx-auto">
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col justify-center w-[85%] rounded-[10px] p-8 bg-color11 "
          >
            <img src={birr} alt="" className="w-16 mb-4 mx-auto" />
            <label htmlFor="">Email:</label>
            <br />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              placeholder="Enter your email"
              className="p-3 rounded-[10px] text-[14px] bg-customText focus:ring-2 focus:ring-color2 focus:outline-none text-black"
            />
            <br />
            <label htmlFor="">Message:</label> <br />
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              name=""
              id=""
              placeholder="Enter your message"
              className="rounded-[10px] bg-customText pl-2 pt-4 text-[14px] focus:ring-2 focus:ring-color2 focus:outline-none text-black"
            ></textarea>
            <br />
            <button
              type="submit"
              className=" bg-color2 shadow-[0px_0px_20px_rgba(255,165,0,0.9)] 
                      pt-1.5 pb-2 px-4 mx-auto rounded-[10px] border-none text-[14px] 
                      transition-all duration-300 
                      hover:bg-color1 hover:shadow-[0px_0px_20px_rgba(68,58,39,1)]"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
