// src/components/Footer.js
import React from "react";
import Counter from "./Counter";

const Footer = () => {
  return (
    <footer className="w-full">
      {/* === Top Grid Section === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {/* Box 1 */}
        <div className="bg-gray-100 p-8 md:p-12 lg:col-span-2 flex items-start">
          <h2 className="uppercase font-extrabold tracking-tight leading-tight text-xl md:text-2xl lg:text-3xl">
            Xperience Park, a hub of fun activities to share with family,
            friends, or colleagues! Choose your activity to have fun 7 days a
            week, even on Sundays, just 5 minutes from Mulhouse!
          </h2>
          <Counter target={1972} duration={1400} stagger={70} />
        </div>
        {/* Box 2 */}
        <div className="bg-gray-100 p-8 md:p-12">
          <h3 className="uppercase font-extrabold tracking-wide text-xl md:text-2xl mb-4">
            900 m² of trampolines
          </h3>
          <p>
            1500 m² of play areas, including 900 m² of trampolines to test your
            agility in complete safety.
          </p>
        </div>
        {/* Box 3 */}
        <div className="bg-yellow-400 p-8 md:p-12">
          <h3 className="uppercase font-extrabold tracking-wide text-xl md:text-2xl mb-4">
            Without reservation
          </h3>
          <p>Access to our trampoline park is without reservation.</p>
        </div>
        {/* Box 4 */}
        <div className="bg-yellow-400 p-8 md:p-12 flex flex-col">
          <h3 className="uppercase font-extrabold tracking-wide text-xl md:text-2xl mb-6">
            Air–conditioned park
          </h3>
        </div>
        {/* Box 5 */}
        <div className="bg-gray-100 p-8 md:p-12">
          <h3 className="uppercase font-extrabold tracking-wide text-xl md:text-2xl mb-4">
            Socks and wristbands required
          </h3>
          <p>
            For your safety and hygiene reasons, non-slip socks and a wristband
            are mandatory. If you don&apos;t have one, the complete set is
            available for purchase at reception.
          </p>
        </div>
        {/* Box 6 */}
        <div className="bg-yellow-400 p-8 md:p-12">
          <h3 className="uppercase font-extrabold tracking-wide text-xl md:text-2xl mb-4">
            Food and drinks
          </h3>
          <p>
            Beverages and food from your bag are prohibited within the
            amusement park.
          </p>
        </div>
        {/* Box 7 */}
        <div className="bg-gray-100 p-8 md:p-12">
          <h3 className="uppercase font-extrabold tracking-wide text-xl md:text-2xl mb-4">
            Lockers available
          </h3>
          <p>
            To keep your belongings safe, but also for your safety and that of
            others, your valuables can be stored in our available lockers.
          </p>
        </div>
      </div>

      {/* === Contact and Newsletter Row === */}
      <div className="bg-white p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <p className="text-base leading-relaxed">
            Trampoline, Ninja Warrior, arcades, shuffleboard, Connect 4
            basketball, augmented reality: come and experience the thrills and
            activities of your trampoline park in Mulhouse, Alsace. You can
            perform tricks in the trampoline area, try somersaults on the giant
            airbag, or win your challenge against your opponent during an epic
            dodge ball or Ninja Warrior course. Come test your agility and feel
            like Lebron James for a game of Connect 4 basketball! Experience
            augmented reality with the Hado game and discover new sensations.
          </p>

          {/* Right Column - Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              Receive the latest Xperience Park news
            </h3>
            <div className="flex items-center border-b border-gray-800 mb-6">
              <input
                type="email"
                placeholder="E-mail address"
                className="w-full py-2 px-1 focus:outline-none"
              />
              <button type="submit" className="text-2xl font-bold">
                &gt;
              </button>
            </div>
            {/* Social Icons */}
            <div className="flex space-x-4">
              {["F", "I", "X", "in", "YT", "S", "T"].map((icon, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <span className="text-sm font-bold">{icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === Sitemap Row === */}
      <div className="bg-white p-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left side */}
          <div className="flex items-center space-x-4 flex-wrap">
            <div className="w-10 h-10 rounded-full bg-gray-900/10 border-2 border-gray-900/20 flex items-center justify-center">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"
                  className="text-gray-900"
                />
              </svg>
            </div>
            {[
              "Information & documents to provide",
              "Sponsorship",
              "Partners",
              "Regulations",
              "Credits",
              "Terms and Conditions",
              "Legal notices",
            ].map((link, idx) => (
              <a key={idx} href="#" className="text-sm hover:underline">
                {link}
              </a>
            ))}
          </div>

          {/* Right side - Mars Rouge */}
          <div className="text-lg font-extrabold tracking-wide uppercase">
            MARS ROUGE
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
