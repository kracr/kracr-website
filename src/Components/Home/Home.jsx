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
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";

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
  const [allNews, setAllNews] = useState([]);
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  useEffect(() => {
    db.collection("News")
      .orderBy("Date", "desc")
      .limit(8)
      .onSnapshot((snapshot) => {
        setAllNews(
            snapshot.docs.map((doc) => ({ id: doc.id, news: doc.data() }))
        );
      });
    }, []);

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

  function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext)
  
    return (
      <div className="arrow left" onClick={() => scrollPrev()} >
        <NavigateBefore disabled={isFirstItemVisible} />
      </div>
    );
  }
  
  function RightArrow() {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext)
  
    return (
      <div className="arrow right"  onClick={() => scrollNext()}>
        <NavigateNext disabled={isLastItemVisible}/>
      </div>
    );
  }
  

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
              Background knowledge and the ability to draw appropriate inferences when required plays a central role in human decision making. At the Knowledgeable Computing and Reasoning (KRaCR; pronounced as cracker) Lab affiliated with the <a href="https://cse.iiitd.ac.in/" >CSE department</a> at <a href="https://iiitd.ac.in/" >IIIT-Delhi</a>, we investigate techniques to incorporate these features into the machine and improve its decision making. We work on all aspects of the Semantic Web and Knowledge Graphs, including ontology modelling, knowledge graphs, ontology reasoning, and their applications to different domains such as healthcare, air pollution, and robotics.
            </div>
          </div>
          <div className="right">
            <Slide>
              <div className="each-slide">
                <div
                  style={{
                    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/kracr-website.appspot.com/o/slideshow%2F1.jpg?alt=media&token=6a6dbf95-a448-49c6-b858-11c22eb8a46a')`,
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
                    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/kracr-website.appspot.com/o/slideshow%2F2.jpg?alt=media&token=775a7b67-e5da-4a09-adde-996ec08b2fb6')`,
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
                    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/kracr-website.appspot.com/o/slideshow%2F13.jpg?alt=media&token=e4406585-1ba8-4076-a895-c5464979b3b8')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <span>Slide 3</span>
                </div>
              </div>
			  <div className="each-slide">
                <div
                  style={{
                    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/kracr-website.appspot.com/o/slideshow%2F4.jpg?alt=media&token=e2be144f-54fd-49ab-afcf-034cdd5ce404')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <span>Slide 4</span>
                </div>
              </div>
			  <div className="each-slide">
                <div
                  style={{
                    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/kracr-website.appspot.com/o/slideshow%2F5.jpg?alt=media&token=31d5f471-fc3c-48d4-85f8-bb4268891630')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <span>Slide 5</span>
                </div>
              </div>
			  <div className="each-slide">
                <div
                  style={{
                    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/kracr-website.appspot.com/o/slideshow%2F6.jpg?alt=media&token=f0facd4f-1bed-4a0a-a639-3b202996ff2f')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <span>Slide 6</span>
                </div>
              </div>
			  <div className="each-slide">
                <div
                  style={{
                    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/kracr-website.appspot.com/o/slideshow%2F7.jpg?alt=media&token=bb3d3822-e23d-4c9f-bebb-38cf09539329')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <span>Slide 7</span>
                </div>
              </div>
			  <div className="each-slide">
                <div
                  style={{
                    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/kracr-website.appspot.com/o/slideshow%2F8.jpg?alt=media&token=c8d1d7b0-a63c-40da-a554-5e5e02da94b8')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <span>Slide 8</span>
                </div>
              </div>
			  <div className="each-slide">
                <div
                  style={{
                    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/kracr-website.appspot.com/o/slideshow%2F9.jpg?alt=media&token=b696478f-ecd6-4e1c-9d1a-526a4da8653e')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <span>Slide 9</span>
                </div>
              </div>
			  <div className="each-slide">
                <div
                  style={{
                    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/kracr-website.appspot.com/o/slideshow%2F10.jpg?alt=media&token=241121d9-0d21-4f54-a6f4-a1836703c2e0')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <span>Slide 10</span>
                </div>
              </div>
			  <div className="each-slide">
                <div
                  style={{
                    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/kracr-website.appspot.com/o/slideshow%2F11.jpg?alt=media&token=ca6c9e20-3589-4564-aef6-5dd10884803d')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <span>Slide 11</span>
                </div>
              </div>
			  <div className="each-slide">
                <div
                  style={{
                    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/kracr-website.appspot.com/o/slideshow%2F12.jpg?alt=media&token=fc6cafae-2162-40d0-b6ba-12473e359f72')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <span>Slide 12</span>
                </div>
              </div>
        <div className="each-slide">
                <div
                  style={{
                    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/kracr-website.appspot.com/o/slideshow%2F3.jpg?alt=media&token=6bd325f0-b11c-4c1b-9688-2a8bfed17dde')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <span>Slide 13</span>
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
      <div className="News">
        <div className="wrapper">
          <div className="title">News</div>
          <div className="tiles">
            <div className="horizontalScroll">
              {allNews.map(({id, news}) => {
                var year = new Date(news.Date.seconds * 1000).getFullYear();
                var month = monthNames[new Date(news.Date.seconds * 1000).getMonth()];
                return(
                <div itemId={id} className="item">
                  <div className="item-title">{month + " " + year}</div>
                  <div className="item-description">{news.Title}</div>
                </div>)
              }
              ).slice(0, 4)}
            </div>
          </div>
          
          <div className="more">
            <Link to="/News">Show More</Link>
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
