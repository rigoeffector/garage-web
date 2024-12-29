import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Testimonials } from "./components/testimonials";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";

import "./App.css";
import ScrollToTop from "react-scroll-up";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <ScrollToTop showUnder={160}>
        <div
          style={{
            borderRadius: "30%",
            height: "50px",
            width: "50px",
            lineHeight: "50px",
            border: "1px solid",
            textAlign: "center",
            background: "#c0ce4c",
          }}
        >
          <i
            className="fa fa-arrow-up"
            style={{
              color: "white",
              fontSize: "30px",
              marginTop: "8px",
            }}
          ></i>
        </div>
      </ScrollToTop>
      <Header data={landingPageData.Header} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />

      <Testimonials data={landingPageData.Testimonials} />

      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default App;
