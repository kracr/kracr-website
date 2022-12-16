import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import { IconButton } from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';
import { Description } from "@material-ui/icons";
import "../../Page.scss";
// import * as op from '../../Assets';
import {
  Typography,
  CardContent,
  Card,
  Grid,
  Paper
} from "@material-ui/core";
import { useParams } from "react-router";
import ReactHtmlParser from 'react-html-parser';
const iconPath = process.env.PUBLIC_URL + '/Assets/';

const BlogPage = () => {
    const { id } = useParams();
    const [projectData, setProjectData] = useState([]);
    const [images, setImages] = useState([]);
    const [subHeadings, setSubHeading] = useState([]);
    useEffect(() => {
      console.log(id);
      axios.get(`${process.env.REACT_APP_BASE_URL}/blog/${id}`).then(res => {
        setProjectData(res.data);
        setImages(res.data.images.map((i) => {
          return { "original": process.env.REACT_APP_BASE_URL + "/image/" + i, "thumbnail": process.env.REACT_APP_BASE_URL + "/image/" + i };
        }));
        setSubHeading(res.data.sections.map(i => {
          return {
            "subHeading": i.subHeading, "description": i.description, "images": i.images.map((j) => {
              return { "original": process.env.REACT_APP_BASE_URL + "/image/" + j };
            })
          }
        }));
      });
  
    }, []);
    return (
      <div className="project-details">
        <div className="page-wrapper">
          <div className="title">
            {projectData.title}
          </div>
          <div>
            {images.length > 0 && (<ImageGallery items={images} />)}
  
          </div>
          <div className="mainDescription">{projectData.description}</div>
          <div>
            {subHeadings.map((i) => (
              <div >
                <div className="subheading">{i.subHeading}</div>
                <div className="Container">
                  <div className='left'><div className="description">{i.description}</div></div>
                  {i.images.length ? <ImageGallery className="image-gallery1" items={i.images} /> : ''}
                </div>
              </div>
            )
            )}
          </div>
        
          {projectData.htmlEmbedLink && <iframe src={projectData.htmlEmbedLink} title="" height='500px' width='80%' className='html-embed'></iframe>}
          
          <Grid container spacing={3}>
            <Grid item>
              <Card style={{
                width: 300,
                marginBottom: 10,
                backgroundColor: "grey",
              }}
              >
                <CardContent>
                  <Typography
                    style={{ fontSize: 20 }}
                    color="textSecondary"
                    gutterBottom
                  >
                    Authors
                  </Typography>
                  <Typography>{projectData.authors}</Typography>
  
  
                </CardContent>
              </Card>
            </Grid>
            
            </Grid>
  
        </div>
      </div>
    );
}

export default BlogPage