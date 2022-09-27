import React, { useState, useEffect } from "react";
import "./JoinUsCMS.scss";
import { makeStyles } from "@material-ui/core/styles";
import { storage } from "../../../firebase";
import { DeleteForever, Description } from "@material-ui/icons";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

function JoinUsCMS() {
  //Getting Team Members
  const [alljobs, setAllJobs] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/joinus`).then((jobs)=>{
      setAllJobs(
        jobs.data.map((one)=>
        {
          var due = new Date(one.dueDate).toDateString();
            return ({ id: one._id, job: one })
        }
          
        )
      );
    })
  }, []);

  //Adding New Jobs
  const [jobrole, setJobRole] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [formLink, setformLink] = useState("");

  //UPLOADING FILE STARTED
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  let handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }
  const addJobOpening = async (e) => {
    e.preventDefault();
    if (jobrole === "" || description === "" || formLink === "") {
      window.alert("Please fill JobRole, Description and JobLink");
    } else {
		  e.preventDefault();
		if (
	    file === null
		)
		{	
      const payload = {
        role: jobrole,
        description: description,
        dueDate: dueDate,
        applyLink: formLink,
        jdPdf: url,
        timestamp: Date.now(),
  }
  axios.post(`${process.env.REACT_APP_BASE_URL}/joinUs/add/`, payload).then(res=>{window.alert("New Job Added")})

            setJobRole("");
            setDescription("");
            setDueDate("");
            setformLink("");
            setURL("");
            e.target.value = null;
		
      
  }
  else {

      // let uploadTask = storage.ref(`/Publications/${file.name}`).put(file);
      // uploadTask.on("state_changed", console.log, console.error, () => {
      //   storage
      //     .ref("Publications")
      //     .child(file.name)
      //     .getDownloadURL()
      //     .then((url) => {
      //       setFile(null);
      //       setURL(url);
      //       const uploadTask = storage
      //         .ref(`/Publications/${file.name}`)
      //         .put(file);
      //         const payload = {
      //         Title: title,
      //         Description: description,
      //         Authors: author,
      //         PublicationURL: url,
      //         Category: category,
      //         Year: year,
      //         timestamp: Date.now(),
      //   }
      //   axios.post(`${process.env.REACT_APP_BASE_URL}/publications/add/`, payload).then(res=>{window.alert("New Publication Added")})
      //       setTitle("");
      //       setDescription("");
      //       setAuthor("");
      //       setFile(null);
      //       setYear("");
			// setURL("");
      //       e.target.value = null;
      //     });
      // });

	  
  }
  }
  };


  //Deleting Member

  const deleteMember = (id) => {
    // db.collection("Publications").doc(id).delete();
  };


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
        <div className="title">Add New Opening</div>
        <form action="">
          <div>
            <input
              type="text"
              value={jobrole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="Job Role *"
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
              value={formLink}
              onChange={(e) => setformLink(e.target.value)}
              placeholder="Apply Link "
            ></input>
            <span className="border"></span>
          </div>
          <div>
              <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="Due Date"
            ></input>
            <span className="border"></span>
          </div>
          <div>

            <input
              type="file"
              placeholder="Image"
              onChange={handleFileChange}
            ></input>
            <span className="border"></span>
          </div>

          <div>
            <button onClick={addJobOpening}>Add</button>
          </div>
        </form>
      </div>
      {alljobs?.map(({ id, job }) => (
        <div className="Publication">
          <div className="Document">
            <a target="_blank" >
              <Description />
            </a>
          </div>
          <div className="data">
            <div className="title">
              {job.role}, {job.description}, Due Date: {new Date(job.dueDate).toDateString()}
            </div>
            <div className="delete">
              <button
                onClick={() => {
                  if (window.confirm(`Delete ${job.description}?`)) {
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

export default JoinUsCMS;
