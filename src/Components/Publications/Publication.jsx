import React, { useState, useEffect } from "react";
import "../../Page.scss";
import db from "../../firebase";
import axios from 'axios';
import { Description } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

function Publication() {
  const [allPublications, setAllPublications] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [inputFilter, SetInputFilter] = useState("");

  useEffect(() => {
    // db.collection("Publications")
    //   .orderBy("Year", "desc")
    //   .onSnapshot((snapshot) => {

    //     // axios.post(`${process.env.REACT_APP_BASE_URL}/publications/import`,snapshot.docs.map((doc) => ({ id: doc.id, publications: doc.data() })));

    //     setAllPublications(
    //       snapshot.docs.map((doc) => ({ id: doc.id, publication: doc.data() }))
    //     );
    //   });

    axios.get(`${process.env.REACT_APP_BASE_URL}/publications`).then(res=>{
      setAllPublications(
        res.data.map((doc)=>({id:doc._id,publication:doc}))
      )
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
    <div className="page">
      <div className="page-wrapper">
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
              <div className="subtitle">{publication.Authors}</div>
              <div className="description">{publication.Description}</div>
            </div>
            <div className="right">
			{publication?.PublicationURL == "" ?    <> < />  : (<IconButton
                onClick={() => window.open(`${publication.PublicationURL}`)}>
<Description />
              </IconButton>)}
              
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Publication;
