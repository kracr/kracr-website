import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import { IconButton, Tooltip } from "@material-ui/core";
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


function ProjectDetails() {

  const { id } = useParams();
  const [projectData, setProjectData] = useState([]);
  const [images, setImages] = useState([]);
  const [subHeadings, setSubHeading] = useState([]);
  const authors = projectData.authors?.split(",");
  const [links, setLinks] = useState([]);
  useEffect(() => {
    console.log(id);
    axios.get(`${process.env.REACT_APP_BASE_URL}/project/${id}`).then(res => {
      setProjectData(res.data);
      console.log("ok",authors);
      setImages(res.data.images.map((i) => {
        return { "original": process.env.REACT_APP_BASE_URL + "/image/" + i, "thumbnail": process.env.REACT_APP_BASE_URL + "/image/" + i };
      }));
      setLinks(res.data.links?.map(i => {
        return {
          "linkType": i.linkType, "link": i.link
        };
      }))
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
        
        <div style={{display:'flex',justifyContent:'space-between', padding:'1.5rem'}}>
          <div>
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
                  Team Members
                </Typography>
                {authors?.map(function(item, i){
                                return  <Typography><li key = {i}>{item}</li></Typography>;
                              })}
              </CardContent>
            </Card>
          </div>
          <div>
            <Card style={{
              width: 300,
              backgroundColor: "grey",
            }}
            >
              <CardContent>
                <Typography
                  style={{ fontSize: 20 }}
                  color="textSecondary"
                  gutterBottom
                >
                  Important Links</Typography>{projectData?.githubUrl == "" ? <> < />  : (
                    <Tooltip title="Github">
                    <IconButton
                    onClick={() => window.open(`${projectData.githubUrl}`)}>
                    <GitHubIcon />
                  </IconButton>
                  </Tooltip>)}
                  {links?.map((i) => ( 
                   <Tooltip title={i.linkType}>
                  <IconButton
                      onClick={() => window.open(`${i.link}`)}>
                      <Description />
                    </IconButton>
                    </Tooltip>))}
                    {projectData?.publicationUrl == "" ? <> < />  : (<IconButton
                      onClick={() => window.open(`${projectData.ProjepublicationUrlctURL}`)}>
                      <Description />
                    </IconButton>)}
                    </CardContent>
          </Card>
          </div>
          </div>

      </div>
    </div>
  );
}
export default ProjectDetails;