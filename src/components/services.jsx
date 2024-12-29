import React from "react";

export const Services = (props) => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p> */}
        </div>
        <div
          className="row"
          style={{
            display: "flex",

            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-3 col-sm-12">
                  {" "}
                  <img
                    src={d.icon}
                    style={{
                      height: "100px",

                      border: "1px solid #92c53a",
                      padding: "20px",
                      borderRadius: "50%",
                      "-webkit-box-shadow":
                        "-19px 21px 82px -51px rgba(147,194,67,1)",
                      "-moz-box-shadow":
                        "-19px 21px 82px -51px rgba(147,194,67,1)",
                      boxShadow: "-19px 21px 82px -51px rgba(147,194,67,1)",
                    }}
                  />
                  <div className="service-desc">
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
