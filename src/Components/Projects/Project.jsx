import React, { useState, useEffect } from "react";
import "./Project.scss";
import db from "../../firebase";
import { Description } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

function Project() {
  const [allPublications, setAllPublications] = useState([]);
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
        setAllPublications(
          snapshot.docs.map((doc) => ({ id: doc.id, publication: doc.data() }))
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
    const tempList = allPublications.filter(({ id, publication }) => {
      return (
        publication.Title.toLowerCase().indexOf(inputFilter.toLowerCase()) !==
          -1 ||
        publication.Description.toLowerCase().indexOf(
          inputFilter.toLowerCase()
        ) !== -1 ||
        publication.Authors.toLowerCase().indexOf(inputFilter.toLowerCase()) !==
          -1
      );
    });
    setFilteredData(tempList);
  }, [inputFilter, allPublications]);

  return (
    <div className="publications">
      <div className="publication-wrapper">
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
              ({ id, publication }) =>
                publication.Category == "Ontology Modelling and Enrichment"
            )
            .map(({ id, publication }) => (
              <div className="Container">
                <div className="left">
                  <div className="title">{publication.Title}</div>
                  <div className="author">{publication.Authors}</div>
                  <div className="description">{publication.Description}</div>
                </div>
                <div className="right">
                  <IconButton
                    onClick={() => window.open(`${publication.PublicationURL}`)}
                  >
                    <Description />
                  </IconButton>
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
              ({ id, publication }) =>
                publication.Category == "Description Logic Reasoning"
            )
            .map(({ id, publication }) => (
              <div className="Container">
                <div className="left">
                  <div className="title">{publication.Title}</div>
                  <div className="author">{publication.Authors}</div>
                  <div className="description">{publication.Description}</div>
                </div>
                <div className="right">
                  <IconButton
                    onClick={() => window.open(`${publication.PublicationURL}`)}
                  >
                    <Description />
                  </IconButton>
                </div>
              </div>
            ))}
        </div>
        <div className="collapsableCategory">
          {typeC ? <div className="title">Knowledge Graphs</div> : ""}

          {filteredData
            ?.filter(
              ({ id, publication }) =>
                publication.Category == "Knowledge Graphs"
            )
            .map(({ id, publication }) => (
              <div className="Container">
                <div className="left">
                  <div className="title">{publication.Title}</div>
                  <div className="author">{publication.Authors}</div>
                  <div className="description">{publication.Description}</div>
                </div>
                <div className="right">
                  <IconButton
                    onClick={() => window.open(`${publication.PublicationURL}`)}
                  >
                    <Description />
                  </IconButton>
                </div>
              </div>
            ))}
        </div>
        <div className="collapsableCategory">
          {typeD ? <div className="title">SPARQL Querying</div> : ""}

          {filteredData
            ?.filter(
              ({ id, publication }) => publication.Category == "SPARQL Querying"
            )
            .map(({ id, publication }) => (
              <div className="Container">
                <div className="left">
                  <div className="title">{publication.Title}</div>
                  <div className="author">{publication.Authors}</div>
                  <div className="description">{publication.Description}</div>
                </div>
                <div className="right">
                  <IconButton
                    onClick={() => window.open(`${publication.PublicationURL}`)}
                  >
                    <Description />
                  </IconButton>
                </div>
              </div>
            ))}
        </div>
        <div className="collapsableCategory">
          {typeE ? <div className="title">Semantic Web Applications</div> : ""}
          {filteredData
            ?.filter(
              ({ id, publication }) =>
                publication.Category == "Semantic Web Applications"
            )
            .map(({ id, publication }) => (
              <div className="Container">
                <div className="left">
                  <div className="title">{publication.Title}</div>
                  <div className="author">{publication.Authors}</div>
                  <div className="description">{publication.Description}</div>
                </div>
                <div className="right">
                  <IconButton
                    onClick={() => window.open(`${publication.PublicationURL}`)}
                  >
                    <Description />
                  </IconButton>
                </div>
              </div>
            ))}
        </div>
        <div className="collapsableCategory">
          {typeF ? <div className="title">Others</div> : ""}
          {filteredData
            ?.filter(({ id, publication }) => publication.Category == "Others")
            .map(({ id, publication }) => (
              <div className="Container">
                <div className="left">
                  <div className="title">{publication.Title}</div>
                  <div className="author">{publication.Authors}</div>
                  <div className="description">{publication.Description}</div>
                </div>
                <div className="right">
                  <IconButton
                    onClick={() => window.open(`${publication.PublicationURL}`)}
                  >
                    <Description />
                  </IconButton>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Project;
