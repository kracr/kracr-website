import React, {useEffect, useState} from 'react'
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import "../../Page.scss";
import {
    Typography,
    CardContent,
    Card,
    Grid,
    Paper
  } from "@material-ui/core";
import { useParams } from "react-router";

function ProjectDetails() {

    const { id } = useParams();
    const [projectData, setProjectData] = useState([]);

    const images = [
      {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
      },
      {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
      },
      {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
      },
    ];

      useEffect(()=>{
          console.log(id);
          axios.get(`http://localhost:5000/project/${id}`).then(res=>{
              setProjectData(res.data);
              console.log(res.data);  
            });
            
      }, []);
    return(
    <div className="project-page">
      <div className="page-wrapper">
          <div className="title">
          {projectData.title}
          </div>
          <div>
          <ImageGallery items={images} />
          </div>
          <div className="description">{projectData.description}</div>
          <div>
          <div className="subtitle">Sub Heading </div>
          <img className="sub-image" src={"https://picsum.photos/id/1018/1000/600/"} alt={"Carlie Anglemire"}/>
          <div className="description">More Description</div>
          </div>
          <Card style={{
          width: 400,
          backgroundColor: "grey",
        }}
      >
        <CardContent>
          <Typography
            style={{ fontSize: 14 }}
            color="textSecondary"
            gutterBottom
          >
            Authors
          </Typography>
          {projectData.authors && 
            projectData.authors.map((x)=>
            {
              console.log(x);
              return(
            <Typography>{x}</Typography>)
            }
            )
          
        }
        </CardContent>
      </Card>

          
        
      </div>
    </div>
    );
}
export default ProjectDetails;