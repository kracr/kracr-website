import React, { useState, useEffect } from "react";
import "./home.scss";
import Particles from "react-particles-js";
import { Line } from "react-chartjs-2";
import firebase from "firebase";
import db from "../../firebase";
import SimpleImageSlider from "react-simple-image-slider";
import { Slide, Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Link } from "react-router-dom";

function Home() {
  //Image SLider CODE BEGINS
  const images = [
    "https://dummyimage.com/600x400/000/fff",
    "https://dummyimage.com/600x400/000/fff",
    "https://dummyimage.com/600x400/000/fff",
  ];
  //Image SLider CODE ENDS
  //Contact Form Backend
  const [contactEmail, setContactEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [allProjects, setAllProjects] = useState([]);

  //Getting the Projects
  useEffect(() => {
    db.collection("Projects")
      .orderBy("timestamp", "desc")
      .limit(4)
      .onSnapshot((snapshot) => {
        setAllProjects(
          snapshot.docs.map((doc) => ({ id: doc.id, project: doc.data() }))
        );
      });
  }, []);
  //Ending THe Projects

  const sendContact = (e) => {
    if (!validate(contactEmail)) {
      window.alert("Email not entered correctly");
    } else {
      if (contactName === "" || contactMessage === "") {
        window.alert("Please Fill all the details");
      } else {
        e.preventDefault();
        db.collection("ContactUs").doc().set({
          Message: contactMessage,
          Email: contactEmail,
          Name: contactName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setContactMessage("");
        setContactEmail("");
        setContactName("");
        window.alert("Message Sent");
      }
    }
  };

  const validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  //Ending Contact Form Backend

  return (
    <div>
      <div className="splash">
        <Particles
          canvasClassName="particleBackground"
          params={{
            particles: {
              number: { value: 70, density: { enable: true, value_area: 800 } },
              color: { value: "#1b1b1b" },
              shape: {
                type: "circle",
                stroke: { width: 0, color: "#1b1b1b" },
                polygon: { nb_sides: 5 },
                image: { src: "img/github.svg", width: 100, height: 100 },
              },
              opacity: {
                value: 0.5,
                random: true,
                anim: {
                  enable: false,
                  speed: 0.2,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 3,
                random: true,
                anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
              },
              line_linked: {
                enable: true,
                distance: 70,
                color: "#1b1b1b",
                opacity: 0.4,
                width: 1,
              },
              move: {
                enable: true,
                speed: 3,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { enable: false, rotateX: 600, rotateY: 1200 },
              },
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: false, mode: "push" },
                resize: false,
              },
              modes: {
                grab: { distance: 150, line_linked: { opacity: 0.5 } },
                bubble: {
                  distance: 400,
                  size: 40,
                  duration: 2,
                  opacity: 8,
                  speed: 3,
                },
                repulse: { distance: 200, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 },
              },
            },
            retina_detect: true,
          }}
        />
        <div className="content">
          <div className="wrapper">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="toprow">
              Knowledgeable Computing and <br />
              Reasoning Lab
            </div>
            <div className="middlerow">KRaCR</div>
            <div className="bottomrow">Cracker Of A Lab</div>
          </div>
        </div>
      </div>
      <div className="AboutUs">
        <div className="wrapper">
          <div className="left">
            <div className="title">About Us</div>
            <div className="content">
              At the Knowledgeable Computing and Reasoning (KRaCR; pronounced as
              cracker) Lab affiliated with the department of CSE at IIIT-Delhi,
              we investigate techniques to incorporate these features into the
              machine and improve its decision making. We work on all aspects of
              the Semantic Web and Knowledge Graphs, including ontology
              modelling, knowledge graphs, ontology reasoning, and their
              applications to different domains such as healthcare, air
              pollution, and robotics.
            </div>
          </div>
          <div className="right">
            <Slide>
              <div className="each-slide">
                <div
                  style={{
                    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/kracr-website.appspot.com/o/slideshow%2Fslideshow1.jpeg?alt=media&token=6a9352af-9628-439e-9749-09d71997c63d')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <span>Slide 1</span>
                </div>
              </div>
              <div className="each-slide">
                <div
                  style={{
                    backgroundImage: `url('https://dummyimage.com/500x400/000/fff')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <span>Slide 2</span>
                </div>
              </div>
              <div className="each-slide">
                <div
                  style={{
                    backgroundImage: `url('https://dummyimage.com/500x400/000/fff')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <span>Slide 3</span>
                </div>
              </div>
            </Slide>
          </div>
        </div>
      </div>
      <div className="Projects">
        <div className="wrapper">
          <div className="title">Projects</div>
          <div className="tiles">
            {allProjects?.map(({ id, project }) => (
              <div className="tile">
                <div className="tile_up">
                  <div className="title-tile">{project.Title}</div>
                  <div className="author-tile">{project.Authors}</div>
                </div>
                <div className="tile_down">
                  <div className="tile_desc">{project.Description}</div>
                  <div className="category-tile">{project.Category}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="more">
            <Link to="/Projects">Show More</Link>
          </div>
        </div>
      </div>
      <div className="contactUs">
        <div className="wrapper">
          <div className="left">
            <div className="title">Contact Us</div>
            <div className="form">
              <div className="topRow">
                <div>
                  <input
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                  />
                  <span className="border"></span>
                </div>
                <div>
                  <input
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    type="text"
                    placeholder="Name"
                  />
                  <span className="border"></span>
                </div>
              </div>
              <div className="middleRow">
                <div>
                  <textarea
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    rows="1"
                    placeholder="Message"
                  ></textarea>
                  <span className="border"></span>
                </div>
              </div>
              <div className="bottomRow">
                <button onClick={sendContact}>Send</button>
              </div>
            </div>
          </div>
          {/*<div className="right"></div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
