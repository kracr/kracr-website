import React, {useEffect, useState} from 'react'
import axios from 'axios';
import "../../Page.scss";
import {
    Typography,
    Grid,
    Paper
  } from "@material-ui/core";

function ProjectDetails() {

    const [projectData, setProjectData] = useState([]);

      useEffect(()=>{
          axios.get(`http://localhost:5000/project/6218f5af94bbf68e2c1f0000`).then(res=>{
              setProjectData(res.data);
              // console.log(res.data[0].title);
            });
            
      }, []);
    return(
    <div className="page">
      <div className="page-wrapper">
          <div className="title">
          <div className="left">{projectData.title}</div>
          </div>
          <div className="collapsableCategory">
          <div className="title">{projectData.description}</div>
          </div>
        
      </div>
    </div>
    );
}
export default ProjectDetails;