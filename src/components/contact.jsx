import { useState } from "react";
import emailjs from "emailjs-com";
import React from "react";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export const Contact = (props) => {
  const [, setState] = useState(initialState);
  const [loading, setLoading] = useState(false); // For loading indicator
  const [successMessage, setSuccessMessage] = useState(""); // For success message
  const [errorMessage, setErrorMessage] = useState(""); // For error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setSuccessMessage("");
    setErrorMessage("");

    emailjs
      .sendForm(
        "service_q9u68vc",
        "template_n5t722z",
        e.target,
        "zzAyPhERWmycjcTzZ"
      )
      .then(
        (result) => {
          console.log(result.text);
          setLoading(false); // Stop loading
          setSuccessMessage("Your message has been sent successfully!");
          clearState();
        },
        (error) => {
          console.log(error.text);
          setLoading(false); // Stop loading
          setErrorMessage("Failed to send the message. Please try again.");
        }
      );
  };

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Get In Touch</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                {loading && (
                  <p>
                    Sending... <i className="fa fa-spinner fa-spin"></i>
                  </p>
                )}{" "}
                {/* Loading indicator */}
                <button
                  type="submit"
                  className="btn btn-custom btn-lg"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
              {successMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
              )}
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
          </div>
          {/* Contact Info Section */}
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i
                    className="fa fa-map-marker"
                    style={{
                      color: "#92c53a",
                    }}
                  ></i>{" "}
                  Address
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i
                    className="fa fa-phone"
                    style={{
                      color: "#92c53a",
                    }}
                  ></i>{" "}
                  Phone
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i
                    className="fa fa-envelope-o"
                    style={{
                      color: "#92c53a",
                    }}
                  ></i>{" "}
                  Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i
                    className="fa fa fa-clock-o"
                    style={{
                      color: "#92c53a",
                    }}
                  ></i>{" "}
                  Working Days
                </span>{" "}
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 400,
                  }}
                >
                  9 AM -  5 PM Monday 
                  <br />
                   9 AM - 1 PM Saturday
                </span>
              </p>
            </div>
          </div>
          {/* Footer Section */}
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <i className="fa fa-facebook"></i>
                  </li>
                  <li>
                    <i className="fa fa-twitter"></i>
                  </li>
                  <li>
                    <i className="fa fa-youtube"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2024 CarZone Ltd Design by{" "}
            <a href="https://rigoninja.netlify.app/" rel="nofollow">
              RigoEffector Ninja
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
