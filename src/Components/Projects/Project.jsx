import React, { useState, useEffect } from "react";
import "../../Page.scss";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Description } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';
import db from "../../firebase";
import firebase from "firebase";
// import { doc, onSnapshot, collection, query, } from "firebase/firestore";

function Project() {
  const [allProjects, setAllProjects] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [inputFilter, SetInputFilter] = useState("");

  const [typeA, setTypeA] = useState(false);
  const [typeB, setTypeB] = useState(false);
  const [typeC, setTypeC] = useState(false);
  const [typeD, setTypeD] = useState(false);
  const [typeE, setTypeE] = useState(false);
  const [typeF, setTypeF] = useState(false);

  useEffect(() => {

    // db.collection("Projects")
    //   .orderBy("Title", "asc")
    //   .onSnapshot((snapshot) => { 
    //     axios.post(`${process.env.REACT_APP_BASE_URL}/project/import`,snapshot.docs.map((doc) => ({ id: doc.id, project: doc.data() })));
    //   }
    //   );
    axios.get(`${process.env.REACT_APP_BASE_URL}/project`).then(res=> {

    //     axios.post(`http://192.168.1.166:5000/project/import`,snapshot.docs.map((doc) => ({ id: doc.id, project: doc.data() })));
    //   }
    //   );

      console.log(res);
        setAllProjects(
          res.data.map((doc) => ({ id: doc._id, project: doc }))
        );
        res.data.map((doc) => {
          if (doc.category == "Ontology Modelling and Enrichment") {
            setTypeA(true);
          } else if (doc.category == "Description Logic Reasoning") {
            setTypeB(true);
          } else if (doc.category == "Knowledge Graphs") {
            setTypeC(true);
          } else if (doc.category == "SPARQL Querying") {
            setTypeD(true);
          } else if (doc.category == "Semantic Web Applications") {
            setTypeE(true);
          } else if (doc.category == "Others") {
            setTypeF(true);
          }
        });
      });
  }, []);

  useEffect(() => {
    const tempList = allProjects.filter(({ id, project }) => {
      return (
        project.title ||
        project.description ||
        project.authors 
      );
    });
    setFilteredData(tempList);
  }, [inputFilter, allProjects]);

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="title">
          <div className="left">Projects</div>
          <div className="right">
            <div>
              <input
                value={inputFilter}
                onChange={(e) => SetInputFilter(e.target.value)}
                type="text"
                placeholder="Filter"
              />
              <span className="border"></span>
            </div>
          </div>
        </div>
        <div className="collapsableCategory">
          {typeA ? (
            <div className="title">Ontology Modelling and Enrichment</div>
          ) : (
            ""
          )}

          {filteredData
            ?.filter(
              ({ id, project }) =>
                project.category == "Ontology Modelling and Enrichment"
            )
            .map(({ id, project }) => (
              <div className="Container">
                <div className="left">
                  <div className="title">{project.title}</div>
                  <div className="subtitle">{project.authors}</div>
                  <div className="description">{project.description}</div>
                  <div>
                  <Link to={`Projects/${project._id}`} style={{ textDecoration: "none" }}>
                  <a className="more">View more</a>
                  </Link>
                  </div>
                  
				  {project?.githubUrl == "" ?    <> < />  : (<IconButton 
                onClick={() => window.open(`${project.githubUrl}`)}>
                <GitHubIcon />
                </IconButton>)}
				
				{project?.publicationUrl == "" ?    <> < />  : (<IconButton 
                onClick={() => window.open(`${project.ProjepublicationUrlctURL}`)}>
                <Description />
                </IconButton>)}
                
				</div>

                
              </div>
            ))}
        </div>
        <div className="collapsableCategory">
          {typeB ? (
            <div className="title">Description Logic Reasoning</div>
          ) : (
            ""
          )}

          {filteredData
            ?.filter(
              ({ id, project }) =>
                project.category == "Description Logic Reasoning"
            )
            .map(({ id, project }) => (
              <div className="Container">
                <div className="left">
                  <div className="title">{project.title}</div>
                  <div className="author">{project.authors}</div>
                  <div className="description">{project.description}</div>
				   {project?.githubUrl == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.githubUrl}`)}>
                <GitHubIcon />
                </IconButton>)}
				
				{project?.publicationUrl == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.publicationUrl}`)}>
                <Description />
                </IconButton>)}
                </div>
              
              </div>
            ))}
        </div>
        <div className="collapsableCategory">
          {typeC ? <div className="title">Knowledge Graphs</div> : ""}

          {filteredData
            ?.filter(
              ({ id, project }) =>
                project.category == "Knowledge Graphs"
            )
            .map(({ id, project }) => (
              <div className="Container">
                <div className="left">
                  <div className="title">{project.title}</div>
                  <div className="author">{project.authors}</div>
                  <div className="description">{project.description}</div>
				   {project?.githubUrl == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.githubUrl}`)}>
                <GitHubIcon />
                </IconButton>)}
				
				{project?.publicationUrl == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.publicationUrl}`)}>
                <Description />
                </IconButton>)}
                </div>

              </div>
            ))}
        </div>
        <div className="collapsableCategory">
          {typeD ? <div className="title">SPARQL Querying</div> : ""}

          {filteredData
            ?.filter(
              ({ id, project }) => project.category == "SPARQL Querying"
            )
            .map(({ id, project }) => (
              <div className="Container">
                <div className="left">
                  <div className="title">{project.title}</div>
                  <div className="author">{project.authors}</div>
                  <div className="description">{project.description}</div>
				   {project?.githubUrl == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.githubUrl}`)}>
                <GitHubIcon />
                </IconButton>)}
				
				{project?.publicationUrl == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.publicationUrl}`)}>
                <Description />
                </IconButton>)}
                </div>

              </div>
            ))}
        </div>
        <div className="collapsableCategory">
          {typeE ? <div className="title">Semantic Web Applications</div> : ""}
          {filteredData
            ?.filter(
              ({ id, project }) =>
                project.category == "Semantic Web Applications"
            )
            .map(({ id, project }) => (
              <div className="Container">
                <div className="left">
                  <div className="title">{project.title}</div>
                  <div className="author">{project.authors}</div>
                  <div className="description">{project.description}</div>
				   {project?.githubUrl == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.githubUrl}`)}>
                <GitHubIcon />
                </IconButton>)}
				
				{project?.publicationUrl == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.publicationUrl}`)}>
                <Description />
                </IconButton>)}
                </div>

              </div>
            ))}
        </div>
        <div className="collapsableCategory">
          {typeF ? <div className="title">Others</div> : ""}
          {filteredData
            ?.filter(({ id, project }) => project.category == "Others")
            .map(({ id, project }) => (
              <div className="Container">
                <div className="left">
                  <div className="title">{project.title}</div>
                  <div className="author">{project.authors}</div>
                  <div className="description">{project.description}</div>
				   {project?.githubUrl == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.githubUrl}`)}>
                <GitHubIcon />
                </IconButton>)}
				
				{project?.publicationUrl == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.publicationUrl}`)}>
                <Description />
                </IconButton>)}
                </div>

              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Project;
