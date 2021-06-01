import React, { useState, useEffect } from "react";
import "./teamCMS.scss";
import { makeStyles } from "@material-ui/core/styles";
import { storage } from "../../../firebase";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import db from "../../../firebase";
import firebase from "firebase";
import { DeleteForever } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import TeamCMSMember from "./TeamCMSMember";

function TeamCMS() {
  //Getting Team Members
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    db.collection("TeamMembers").onSnapshot((snapshot) => {
      setTeamMembers(
        snapshot.docs.map((doc) => ({ id: doc.id, member: doc.data() }))
      );
    });
  }, []);

  //Adding Team Members
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [interest, setInterest] = useState("");
  const [webpage, setWebpage] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [mail, setMail] = useState("");

  const addTeamMember = async (e) => {
    e.preventDefault();
    if (
      name === "" ||
      designation === ""
    ) {
      window.alert("Please fill both name and designation");  
    } 
	else {
      e.preventDefault();
	  if (
	  
	    file === null
		)
		{
			 db.collection("TeamMembers").doc().set({
              Name: name,
              Interests: interest,
              Designation: designation,
              Position: category,
			  webpageLink: webpage,
              githubLink: github,
              twitterLink: twitter,
              linkedinLink: linkedin,
              Mail: mail,
              ImageURL: url,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            setName("");
            setInterest("");
			setWebpage("");
            setTwitter("");
            setLinkedin("");
            setGithub("");
            setDesignation("");
            setMail("");
            setFile(null);
            e.target.value = null;
         
    }
		else {
			  let uploadTask = storage.ref(`/Team/${file.name}`).put(file);
      uploadTask.on("state_changed", console.log, console.error, () => {
        storage
          .ref("Team")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setFile(null);
            setURL(url);
            const uploadTask = storage.ref(`/Team/${file.name}`).put(file);
            db.collection("TeamMembers").doc().set({
              Name: name,
              Interests: interest,
              Designation: designation,
              Position: category,
			  webpageLink: webpage,
              githubLink: github,
              twitterLink: twitter,
              linkedinLink: linkedin,
              Mail: mail,
              ImageURL: url,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            setName("");
            setInterest("");
			setWebpage("");
            setTwitter("");
            setLinkedin("");
            setGithub("");
            setDesignation("");
            setMail("");
            setFile(null);
            e.target.value = null;
          });
		});
           
		
		}
    }
  };

  //Deleting Member

  const deleteMember = (id) => {
    db.collection("TeamMembers").doc(id).delete();
  };

  //UPLOADING FILE STARTED
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  function handleImageChange(e) {
    setFile(e.target.files[0]);
  }
  const handleUpload = async (e) => {
    const uploadTask = await storage.ref(`/Team/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("Team")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
        });
    });
  };
  //UPLOADING FILE ENDING
  //DROP DOWN MENU STARTED
  const useStyles = makeStyles((theme) => ({
    button: {
      display: "block",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  const classes = useStyles();
  const [category, setcategory] = React.useState("B.Tech");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setcategory(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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

  //DROP DOWN MENU ENDS
  return (
    <div className="teamCMSwrapper">
      <div className="addMember">
        <div className="title">Add Member</div>
        <form action="">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name *" 
            ></input>
            <span className="border"></span>
          </div>
          <div>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="Designation *"
            ></input>
            <span className="border"></span>
          </div>
          <div>
            <input
              type="text"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              placeholder="Interests"
            ></input>
            <span className="border"></span>
          </div>
          <div>
            <input
              type="file"
              placeholder="Image"
              onChange={handleImageChange}
            ></input>
            <span className="border"></span>
          </div>
          <div>
            <input
              type="text"
              value={webpage}
              onChange={(e) => setWebpage(e.target.value)}
              placeholder="Webpage Link"
            ></input>
            <span className="border"></span>
          </div>
          <div>
            <input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="Github Link"
            ></input>
            <span className="border"></span>
          </div>
          <div>
            <input
              type="text"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="Twitter Link"
            ></input>
            <span className="border"></span>
          </div>
          <div>
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="Linkedin Link"
            ></input>
            <span className="border"></span>
          </div>
          <div>
            <input
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder="Email"
            ></input>
            <span className="border"></span>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                category *
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={category}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Faculty"}>Faculty</MenuItem>
                <MenuItem value={"PhD"}>Ph.D</MenuItem>
                <MenuItem value={"Masters"}>Masters</MenuItem>
                <MenuItem value={"BTech"}>B.Tech</MenuItem>
              <MenuItem value={"Alumni"}>Alumni</MenuItem>
              <MenuItem value={"RA"}>RA</MenuItem>
              <MenuItem value={"Intern"}>Intern</MenuItem>
              <MenuItem value={"Collaborator"}>Collaborator</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <button onClick={addTeamMember}>Add</button>
          </div>
        </form>
      </div>
      {teamMembers?.map(({ id, member }) => (
        <TeamCMSMember member={member} id={id}></TeamCMSMember>
      ))}
    </div>
  );
}

export default TeamCMS;
