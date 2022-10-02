import React, { useState, useEffect } from "react";
import "./NewsCMS.scss";
import { makeStyles } from "@material-ui/core/styles";
import { DeleteForever, Description } from "@material-ui/icons";
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

function NewsCMS() {
  //Getting Team Members
  const [allnews, setAllNews] = useState([]);
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/news`).then((news)=>{
      setAllNews(
        news.data.map((one)=>
        {
          var year = new Date(one.Date).getFullYear();
          var month = monthNames[new Date(one.Date).getMonth()];
                  console.log(one.Title);
            return ({ id: one._id, title: one.Title, date: `${month} ${year}` })
        }
          
        )
      );
    })
    // db.collection("News")
    //   .orderBy("Date", "desc")
    //   .onSnapshot((snapshot) => {
    //     setAllNews(
    //       snapshot.docs.map((doc) => {
    //         var year = new Date(doc.data().Date.seconds * 1000).getFullYear();
    //         var month = monthNames[new Date(doc.data().Date.seconds * 1000).getMonth()];
    //               console.log(doc.data().Title);
    //         return ({ id: doc.id, title: doc.data().Title, date: `${month} ${year}` })
    //         })
    //     );
    //   });
  }, []);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const deleteMember = (id) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/news/${id}`);
  };

  const addNews = async (e) => {
    e.preventDefault();
    console.log(title);
    console.log(date);
    if (title === "" || date === "") {
      window.alert("Please fill News and Date");
    } else {
		e.preventDefault();
    const payload = {
      Title: title, 
      Date: date
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}/news/add/`, payload).then(res=>{window.alert("News Added")})
    // db.collection("News").doc().set({
    //   Title: title,
    //   Date: firebase.firestore.Timestamp.fromDate(new Date(date)),
    // });
    setTitle("");
    setDate("");
	}
  };


  return (
    <div className="publicationCMSwrapper">
      <div className="addMember">
        <div className="title">Add News</div>
        <form action="">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="News *"
            ></input>
            <span className="border"></span>
          </div>
          <div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Date"
            ></input>
            <span className="border"></span>
          </div>
          <div>
            <button onClick={addNews}>Add</button>
          </div>
        </form>
      </div>
      {allnews?.map(({ id, title, date }) => (
        <div className="Publication">
          <div className="data">
          <div className="title">
              {date}
            </div>
            <div className="body">
              {title}
            </div>
            <div className="delete">
              <button
                onClick={() => {
                  if (window.confirm(`Delete ${title}?`)) {
                    deleteMember(id);
                  }
                }}
              >
                <DeleteForever />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsCMS;
