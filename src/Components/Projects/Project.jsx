import React, { useState, useEffect } from "react";
import "../../Page.scss";
import { Link } from "react-router-dom";
import db from "../../firebase";
import { Description } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';

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
    db.collection("Projects")
      .orderBy("Title", "asc")
      .onSnapshot((snapshot) => {
        setAllProjects(
          snapshot.docs.map((doc) => ({ id: doc.id, project: doc.data() }))
        );
        snapshot.docs.map((doc) => {
          if (doc.data().Category == "Ontology Modelling and Enrichment") {
            setTypeA(true);
          } else if (doc.data().Category == "Description Logic Reasoning") {
            setTypeB(true);
          } else if (doc.data().Category == "Knowledge Graphs") {
            setTypeC(true);
          } else if (doc.data().Category == "SPARQL Querying") {
            setTypeD(true);
          } else if (doc.data().Category == "Semantic Web Applications") {
            setTypeE(true);
          } else if (doc.data().Category == "Others") {
            setTypeF(true);
          }
        });
      });
  }, []);

  useEffect(() => {
    const tempList = allProjects.filter(({ id, project }) => {
      return (
        project.Title.toLowerCase().indexOf(inputFilter.toLowerCase()) !==
          -1 ||
        project.Description.toLowerCase().indexOf(
          inputFilter.toLowerCase()
        ) !== -1 ||
        project.Authors.toLowerCase().indexOf(inputFilter.toLowerCase()) !==
          -1 ||
        project.Year.toLowerCase().indexOf(inputFilter.toLowerCase()) !== -1
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
                project.Category == "Ontology Modelling and Enrichment"
            )
            .map(({ id, project }) => (
              <div className="Container">
                <div className="left">
                  <div className="title">{project.Title}</div>
                  <div className="subtitle">{project.Authors}</div>
                  <div className="description">{project.Description}
                  <Link to="/Projects/specific" style={{ textDecoration: "none" }}>
                  <a className="more"> ...View more</a>
                  </Link>
                  </div>
                  
				  {project?.GithubLink == "" ?    <> < />  : (<IconButton 
                onClick={() => window.open(`${project.GithubLink}`)}>
                <GitHubIcon />
                </IconButton>)}
				
				{project?.PublicationURL == "" ?    <> < />  : (<IconButton 
                onClick={() => window.open(`${project.ProjePublicationURLctURL}`)}>
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
                project.Category == "Description Logic Reasoning"
            )
            .map(({ id, project }) => (
              <div className="Container">
                <div className="left">
                  <div className="title">{project.Title}</div>
                  <div className="author">{project.Authors}</div>
                  <div className="description">{project.Description}</div>
				   {project?.GithubLink == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.GithubLink}`)}>
                <GitHubIcon />
                </IconButton>)}
				
				{project?.PublicationURL == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.PublicationURL}`)}>
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
                project.Category == "Knowledge Graphs"
            )
            .map(({ id, project }) => (
              <div className="Container">
                <div className="left">
                  <div className="title">{project.Title}</div>
                  <div className="author">{project.Authors}</div>
                  <div className="description">{project.Description}</div>
				   {project?.GithubLink == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.GithubLink}`)}>
                <GitHubIcon />
                </IconButton>)}
				
				{project?.PublicationURL == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.PublicationURL}`)}>
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
              ({ id, project }) => project.Category == "SPARQL Querying"
            )
            .map(({ id, project }) => (
              <div className="Container">
                <div className="left">
                  <div className="title">{project.Title}</div>
                  <div className="author">{project.Authors}</div>
                  <div className="description">{project.Description}</div>
				   {project?.GithubLink == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.GithubLink}`)}>
                <GitHubIcon />
                </IconButton>)}
				
				{project?.PublicationURL == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.PublicationURL}`)}>
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
                project.Category == "Semantic Web Applications"
            )
            .map(({ id, project }) => (
              <div className="Container">
                <div className="left">
                  <div className="title">{project.Title}</div>
                  <div className="author">{project.Authors}</div>
                  <div className="description">{project.Description}</div>
				   {project?.GithubLink == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.GithubLink}`)}>
                <GitHubIcon />
                </IconButton>)}
				
				{project?.PublicationURL == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.PublicationURL}`)}>
                <Description />
                </IconButton>)}
                </div>

              </div>
            ))}
        </div>
        <div className="collapsableCategory">
          {typeF ? <div className="title">Others</div> : ""}
          {filteredData
            ?.filter(({ id, project }) => project.Category == "Others")
            .map(({ id, project }) => (
              <div className="Container">
                <div className="left">
                  <div className="title">{project.Title}</div>
                  <div className="author">{project.Authors}</div>
                  <div className="description">{project.Description}</div>
				   {project?.GithubLink == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.GithubLink}`)}>
                <GitHubIcon />
                </IconButton>)}
				
				{project?.PublicationURL == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${project.PublicationURL}`)}>
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
