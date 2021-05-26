import React, { useState, useEffect } from "react";
import "./Publication.scss";
import db from "../../firebase";
import { Description } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

function Publication() {
  const [allPublications, setAllPublications] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [inputFilter, SetInputFilter] = useState("");

  useEffect(() => {
    db.collection("Publications")
      .orderBy("Year", "desc")
      .onSnapshot((snapshot) => {
        setAllPublications(
          snapshot.docs.map((doc) => ({ id: doc.id, publication: doc.data() }))
        );
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
          <div className="left">Publications</div>
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
        {filteredData?.map(({ id, publication }) => (
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
  );
}

export default Publication;
