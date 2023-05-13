import React, { useState, useEffect } from "react";
import "./BlogCMS.scss";
import { makeStyles } from "@material-ui/core/styles";
import { storage } from "../../../firebase";
import { DeleteForever, Description } from "@material-ui/icons";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import MultiImageInput from 'react-multiple-image-input';
import  axios from "axios";

const BlogCMS = () => {
    const [allpublications, setAllPublications] = useState([]);

    useEffect(() => {
      // db.collection("Projects")
      //   .orderBy("Title", "asc")
      //   .onSnapshot((snapshot) => {
      //     setAllPublications(
      //       snapshot.docs.map((doc) => ({ id: doc.id, publication: doc.data() }))
      //     );
      //   });
      console.log(formValues);
      axios.get(`${process.env.REACT_APP_BASE_URL}/project`).then((projects)=>{
        setAllPublications(
          projects.data.map((one)=>
          {
            // var year = new Date(one.Date).getFullYear();
            // var month = monthNames[new Date(one.Date).getMonth()];
                    // console.log(one,"hello");
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
    const [github, setGithub] = useState("");
    const [htmlEmbedLink, setHtmlEmbedLink] = useState('');
    const [htmlFile, setHtmlFile] = useState(null);
    const [formValues, setFormValues] = useState([]);
    // const [sections, setSections] = useState([{subheading:"", description : "", images : []}]);
    const [images, setImages] = useState([]);
    const [imgUrl,setimgUrl] = useState([]);
    const [images2, setImages2] = useState({});
    
    const callAPI = async(arr)=>{
  
      let urls = [];
      const allAPICalls = arr?.map(async (img) => {
        const formData = new FormData();
        formData.append("image", img);
        return await axios.post(`${process.env.REACT_APP_BASE_URL}/image/upload`, formData);
      });
  
      const allAPICallsCalled = await Promise.all(allAPICalls);
  
      allAPICallsCalled?.map((response) => {
        urls.push(response.data.name);
      });
  
      return urls;
      
    }
  
    const uploadAllImages = async () => {
  
      return new Promise(async(resolve,reject)=>{
        let bannerImages = [...images];
        let bannerImagesURL = await callAPI(bannerImages);
        let sections = await Promise.all(formValues?.map(async(sub) => {
            let img = [...sub.images];
            let imgURL = await callAPI(img);
            return {subHeading: sub.subheading, description: sub.subheadingdetails, images: imgURL}
          }
        ));
        resolve([bannerImagesURL,sections]);
      });
    }
  
    const getPayload = ()=>{
  
        return new Promise((resolve,reject)=>{
          uploadAllImages().then(data=>{
            console.log(data[0],data[1]);
            resolve({
              title: title,
              description: description,
              authors: author,
              publicationUrl: url,
              category: category,
              githubUrl: github,
              year: year,
              images: data[0],
              sections: data[1],
              htmlEmbedLink: htmlEmbedLink,
              timestamp: 0,
            });
          })
          .catch(err=>{
            reject(err);
          });
        });
    }
  
    const addTeamMember = async (e) => {
      e.preventDefault();
      if (title === "" || description === "") {
        window.alert("Please fill Title and Description");
        return;
      }
      getPayload().then((payload) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/blog/add/`, payload).then(res => {
          window.alert("New Blog Added");
          setTitle("");
          setDescription("");
          setAuthor("");
          setYear("");
          setFile(null);
          setGithub("");
          setURL("");
          setImages([]);
          setFormValues([]);
        }).catch((err)=>{
          console.log("Error occured while uploading project");
        })
      }).catch((err)=>{
        console.log("error occured while uploading images");
      });
    
    };
  
  let handleChangeinForm = (i, e) => {
      // console.log(formValues);
      let newFormValues = [...formValues];
      newFormValues[i][e.target.name] = e.target.value;
      // newFormValues[i][images] = images2
      setFormValues(newFormValues);
    }
  let handleSubImageChange = (i, e) => {
      // console.log(e.target.files);
      let newFormValues = [...formValues];
      newFormValues[i][e.target.name] = e.target.files;
      // newFormValues[i][images] = images2
      setFormValues(newFormValues);
      console.log(formValues)
    }
  let handleImageChange = (e) => {
    setImages(e.target.files);
    
  }
  let addFormFields = () => {
    // console.log(sections);
      setFormValues([...formValues, { subheading: "", subheadingdetails: "" , images: {}}])
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
      axios.delete(`${process.env.REACT_APP_BASE_URL}/blog/${id}`);
    };
  
    //UPLOADING FILE STARTED
    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");
    // function handleImageChange(e) {
    //   setFile(e.target.files[0]);
    // }
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
          <div className="title">Add Blog</div>
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
                placeholder="Authors"
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
                value={htmlEmbedLink}
                onChange={(e) => setHtmlEmbedLink(e.target.value)}
                placeholder="HTML document link for embedding"
              ></input>
              <span className="border"></span>
            </div>
            <label>HTML File for embedding</label>
            <div>
            <input type="file" name="images" id="file" onChange={e => setHtmlFile(e.target.files)}/>
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
  
            {/* <div>
              <input
                type="file"
                placeholder="Image"
                onChange={handleImageChange}
              ></input>
              <span className="border"></span>
            </div> */}
            
            
            <label>Main Images</label>
            <div>
            <input type="file" name="images" id="file" multiple onChange={e => handleImageChange(e)}/>
            </div>
            {/* <MultiImageInput allowCrop={false}
              images={images}
              setImages={setImages}
            /> */}
  
        
            
           
  
            {formValues.map((element, index) => (
              // <div className="subheading">
              
              <div className="form-inline" key={index}>
                <input type="text" name="subheading" placeholder="Subheading" value={element.subheading || ""} onChange={e => handleChangeinForm(index, e)} />
                <input type="text" name="subheadingdetails" placeholder="Details" value={element.subheadingdetails || ""} onChange={e => handleChangeinForm(index, e)} />
                <label>Sub Images</label>
                <input type="file" name="images" id="file" multiple onChange={e => handleSubImageChange(index, e)}/>
                {/* <MultiImageInput allowCrop={false}
                  images={element.images}
                  setImages={setImages2}
  
                /> */}
                
               
                    <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                  
              </div>
              // </div>
            ))}
            
            <div className="button-section">
                <button className="button add" type="button" onClick={() => addFormFields()}>Add subheading</button>
            </div>
            <div className="button-section">
              <button className="button project" type="button" onClick={addTeamMember}>Add</button>
            </div>
            
          </form>
        </div>
        {allpublications?.map(({ id, publication }) => (
          <div className="Publication">
            <div className="Document">
              <a target="_blank" href={publication.publicationUrl}>
                <Description />
              </a>
            </div>
            <div className="data" s>
              <div className="title">
                {publication.title}
              </div>
              <div className="delete">
                <button
                  onClick={() => {
                    if (window.confirm(`Delete ${publication.title}?`)) {
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

export default BlogCMS