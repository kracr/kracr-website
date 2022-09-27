import React, { useState, useEffect } from "react";
import "./PublicationCMS.scss";
import { makeStyles } from "@material-ui/core/styles";
import { storage } from "../../../firebase";
import { DeleteForever, Description } from "@material-ui/icons";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import axios from 'axios';

function PublicationCMS() {
  //Getting Team Members
  const [allpublications, setAllPublications] = useState([]);

  useEffect(() => {
    // db.collection("Publications")
    //   .orderBy("Year", "desc")
    //   .onSnapshot((snapshot) => {
    //     setAllPublications(
    //       snapshot.docs.map((doc) => ({ id: doc.id, publication: doc.data() }))
    //     );
    //   });
    
    axios.get(`${process.env.REACT_APP_BASE_URL}/publications`).then((publications)=>{
      setAllPublications(
        publications.data.map((one)=>
        {
            return ({ id: one._id, publication: one })
        }
          
        )
      );
    })

  }, []);

  //Adding Team Members
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const addTeamMember = async (e) => {
    e.preventDefault();
    if (title === "" || description === "" || author === "") {
      window.alert("Please fill Title, Description and Author");
    } else {
		  e.preventDefault();
		if (
	    file === null
		)
		{	
      const payload = {
        Title: title,
        Description: description,
        Authors: author,
        PublicationURL: url,
        Category: category,
        Year: year,
        timestamp: Date.now(),
  }
  axios.post(`${process.env.REACT_APP_BASE_URL}/publications/add/`, payload).then(res=>{window.alert("New Publication Added")})
		
			
 
            // db.collection("Publications").doc().set({
            //   Title: title,
            //   Description: description,
            //   Authors: author,
            //   PublicationURL: url,
            //   Category: category,
            //   Year: year,
            //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            // });
            setTitle("");
            setDescription("");
            setAuthor("");
            setFile(null);
            setYear("");
			setURL("");
            e.target.value = null;
		
      
  }
  else {

      let uploadTask = storage.ref(`/Publications/${file.name}`).put(file);
      uploadTask.on("state_changed", console.log, console.error, () => {
        storage
          .ref("Publications")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setFile(null);
            setURL(url);
            const uploadTask = storage
              .ref(`/Publications/${file.name}`)
              .put(file);
              const payload = {
              Title: title,
              Description: description,
              Authors: author,
              PublicationURL: url,
              Category: category,
              Year: year,
              timestamp: Date.now(),
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/publications/add/`, payload).then(res=>{window.alert("New Publication Added")})
            // db.collection("Publications").doc().set({
            //   Title: title,
            //   Description: description,
            //   Authors: author,
            //   PublicationURL: url,
            //   Category: category,
            //   Year: year,
            //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            // });
            setTitle("");
            setDescription("");
            setAuthor("");
            setFile(null);
            setYear("");
			setURL("");
            e.target.value = null;
          });
      });

	  
  }
  }
  };

  //Deleting Member

  const deleteMember = (id) => {
    // db.collection("Publications").doc(id).delete();
  };

  //UPLOADING FILE STARTED
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  function handleImageChange(e) {
    setFile(e.target.files[0]);
  }
  const handleUpload = async (e) => {
    const uploadTask = await storage
      .ref(`/Publications/${file.name}`)
      .put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("Publications")
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
    <div className="publicationCMSwrapper">
      <div className="addMember">
        <div className="title">Add Publication</div>
        <form action="">
          <div>
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
              placeholder="Author *"
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
          {/* <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                category
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
                <MenuItem value={"TypeA"}>TypeA</MenuItem>
                <MenuItem value={"TypeB"}>TypeB</MenuItem>
                <MenuItem value={"TypeC"}>TypeC</MenuItem>
              </Select>
            </FormControl>
          </div> */}
          <div>
            <input
              type="file"
              placeholder="Image"
              onChange={handleImageChange}
            ></input>
            <span className="border"></span>
          </div>

          <div>
            <button onClick={addTeamMember}>Add</button>
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
          <div className="data">
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

export default PublicationCMS;
