import React from "react";

export const Services = (props) => {


  const divStyle = {
    width: "100px",
    padding: "20px",
    border: "1px solid #92c53a",
    margin: "auto",
    borderRadius: "50%",
    boxShadow: "-19px 21px 82px -51px rgba(147,194,67,1)",
  };
  
  const imgStyle = {
    height: "50px",
    width: "50px",
  };
  
 

  
  
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
                  <div style={divStyle}>
                  <img style={imgStyle} src={d.icon} alt="icon"/>
                  </div>
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
