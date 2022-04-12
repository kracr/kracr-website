import React, { useEffect, useState } from 'react'
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
  const [images, setImages] = useState([]);
  const [subHeadings, setSubHeading] = useState([]);
  useEffect(() => {
    console.log(id);
    axios.get(`http://localhost:5000/project/${id}`).then(res => {
      setProjectData(res.data);
      setImages(res.data.images.map((i) => {
        return { "original": i, "thumbnail": i };
      }));
      setSubHeading(res.data.sections.map(i => {
        return {
          "subHeading": i.subHeading, "description": i.description, "images": i.images.map((j) => {
            return { "original": j };
          })
        }
      }));
    });

  }, []);
  return (
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
          {subHeadings.map((i) => (
            <div className='Container'>
              <div className="subtitle">{i.subHeading}</div>
              <div className="description">{i.description}</div>
              <ImageGallery items={i.images} />
            </div>
          )
          )}
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
              // projectData.authors.map((x)=>
              // {
              //   console.log(x);
              //   return(
              <Typography>{projectData.authors}</Typography>
              // }
              // )

            }
          </CardContent>
        </Card>



      </div>
    </div>
  );
}
export default ProjectDetails;