import React from "react";

export const About = (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src="img/about.png" className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About Us</h2>
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
              <h3
                style={{
                  color: "#92c53a",
                }}
              >
                Why Choose Us?
              </h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div>
             
            </div>
            
          </div>
          <div className="container">
                <div className="col-md-10 col-md-offset-1 section-title">
                  <p id="about-mission-p">
                    {/* Our journey is driven by a mission and fueled by a vision.
                    We're committed to providing high-quality automotive
                    services that ensure the best for our customers. */}
                  </p>
                </div>

                <div className="row">
                  {/* Mission Section */}
                  <div className="col-md-6">
                    <div className="feature-box">
                      <h3>Our Mission</h3>
                      <p>
                        To give each customer the assurance that their vehicle
                        is well-maintained by providing the highest quality
                        automotive products and services delivered quickly and
                        conveniently in a superior environment by a friendly,
                        professional staff emphasizing integrity in every
                        action.
                      </p>
                    </div>
                  </div>

                  {/* Vision Section */}
                  <div className="col-md-6">
                    <div className="feature-box">
                      <h3>Our Vision</h3>
                      <p>
                        We are the preeminent automotive maintenance provider,
                        leading our industry through excellence, innovation, and
                        growth.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
};
