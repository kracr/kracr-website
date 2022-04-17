import React, { useState, useEffect } from "react";
import "./ProjectCMS.scss";
import { makeStyles } from "@material-ui/core/styles";
import { storage } from "../../../firebase";
import db from "../../../firebase";
import firebase from "firebase";
import { DeleteForever, Description } from "@material-ui/icons";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import MultiImageInput from 'react-multiple-image-input';

function ProjectCMS() {
  //Getting Team Members
  const [allpublications, setAllPublications] = useState([]);

  useEffect(() => {
    db.collection("Projects")
      .orderBy("Title", "asc")
      .onSnapshot((snapshot) => {
        setAllPublications(
          snapshot.docs.map((doc) => ({ id: doc.id, publication: doc.data() }))
        );
      });
  }, []);

  //Adding Team Members
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [github, setGithub] = useState("");
  const [formValues, setFormValues] = useState([{ name: "", email : "", images : {}}]);
  const [images, setImages] = useState({});
  const [images2, setImages2] = useState({});

  const addTeamMember = async (e) => {
    e.preventDefault();
    if (title === "" || description === "") {
      window.alert("Please fill Title and Description");
    } else {
		e.preventDefault();
		if (
	    file === null
		)
		{	
      db.collection("Projects").doc().set({
        Title: title,
        Description: description,
        Authors: author,
        PublicationURL: url,
        Category: category,
        GithubLink: github,
        Year: year,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setTitle("");
      setDescription("");
      setAuthor("");
      setYear("");
      setFile(null);
			setGithub("");
			setURL("");

          }
	
	else {
      let uploadTask = storage.ref(`/Projects/${file.name}`).put(file);
      uploadTask.on("state_changed", console.log, console.error, () => {
        storage
          .ref("Projects")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setFile(null);
            setURL(url);
            const uploadTask = storage.ref(`/Projects/${file.name}`).put(file);
            db.collection("Projects").doc().set({
              Title: title,
              Description: description,
              Authors: author,
              PublicationURL: url,
              Category: category,
              GithubLink: github,
              Year: year,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            setTitle("");
            setDescription("");
            setAuthor("");
            setYear("");
            setFile(null);
			setGithub("");
			setURL("");
          });
      });
         
      
		
	}
	}
  };
let handleChangeinForm = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    // newFormValues[i][images] = images2
    setFormValues(newFormValues);
  }
let handleChangeinImages = (i, e) => {
  let newFormValues = [...formValues];
    newFormValues[i][images] = e;
    setFormValues(newFormValues);
}
let addFormFields = () => {
    setFormValues([...formValues, { name: "", email: "" , images: {}}])
  }

let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
}
  //Deleting Member

  const crop = {
    unit: '%',
    aspect: 4 / 3,
    width: '100'
  };
  const deleteMember = (id) => {
    db.collection("Projects").doc(id).delete();
  };

  //UPLOADING FILE STARTED
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  function handleImageChange(e) {
    setFile(e.target.files[0]);
  }
  const handleUpload = async (e) => {
    const uploadTask = await storage.ref(`/Projects/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("Projects")
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
  const [category, setcategory] = React.useState("B.Tech-");
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
    <div className="projectCMSwrapper">
      <div className="addMember">
        <div className="title">Add Projects</div>
        <form action="">
          <div >
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title *"
            ></input>
            <span className="border"></span>
          </div>
          <div>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description *"
            ></input>
            <span className="border"></span>
          </div>
          <div>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Project Member(s)"
            ></input>
            <span className="border"></span>
          </div>
          <div>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Year"
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
                <MenuItem value={"Ontology Modelling and Enrichment"}>
                  Ontology Modelling and Enrichment
                </MenuItem>
                <MenuItem value={"Description Logic Reasoning"}>
                  Description Logic Reasoning
                </MenuItem>
                <MenuItem value={"Knowledge Graphs"}>Knowledge Graphs</MenuItem>
                <MenuItem value={"SPARQL Querying"}>SPARQL Querying</MenuItem>
                <MenuItem value={"Semantic Web Applications"}>
                  Semantic Web Applications
                </MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div>
            <input
              type="file"
              placeholder="Image"
              onChange={handleImageChange}
            ></input>
            <span className="border"></span>
          </div>
          
          
          <label>Main Images</label>
          <MultiImageInput allowCrop={false}
            images={images}
            setImages={setImages}
          />
          


          {formValues.map((element, index) => (
            // <div className="subheading">
            <div className="form-inline" key={index}>
              <input type="text" name="subheading" placeholder="Subheading" value={element.name || ""} onChange={e => handleChangeinForm(index, e)} />
              <input type="text" name="subheadingdetails" placeholder="Details" value={element.email || ""} onChange={e => handleChangeinForm(index, e)} />
              <label>Sub Images</label>
              <MultiImageInput allowCrop={false}
                images={element.images}
                setImages={setImages2}

              />
              {
                index ? 
                  <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                : null
              }
            </div>
            // </div>
          ))}
          
          <div className="button-section">
              <button className="button add" type="button" onClick={() => addFormFields()}>Add subheading</button>
          </div>
          <div className="button-section">
            <button className="button project" onClick={addTeamMember}>Add</button>
          </div>

        </form>
      </div>
      {allpublications?.map(({ id, publication }) => (
        <div className="Publication">
          <div className="Document">
            <a target="_blank" href={publication.PublicationURL}>
              <Description />
            </a>
          </div>
          <div className="data" s>
            <div className="title">
              {publication.Title}, {publication.Authors}
            </div>
            <div className="delete">
              <button
                onClick={() => {
                  if (window.confirm(`Delete ${publication.Title}?`)) {
                    deleteMember(id);
                  }
                }}
              >
                <DeleteForever />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectCMS;
