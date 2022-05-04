import React, { useState, useEffect } from "react";
import { ExpandMore, ExpandLess, NavigateBefore, NavigateNext, DoubleArrow, Flag, CenterFocusWeak } from "@material-ui/icons";
import { Card, CardActions, CardContent, Typography, Grid, Paper, TextField, Button, TableCell, TableRow, TableBody, TableHead,Modal, Box, Table, TablePagination } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { IconButton } from "@material-ui/core";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import axios from 'axios';
import "./JoinUs.scss";
function JoinUs() {
    const [allopenings, setAllOpenings] = useState([]);
    const [allNews, setAllNews] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [inputFilter, SetInputFilter] = useState("");
    const [nestedNews, setNestedNews] = useState({});
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  useEffect(() => {
    axios.get('http://192.168.1.166:5000/joinus').then((opening)=>{
        setAllOpenings(
          opening.data.map((one)=>
          {
            // var year = new Date(one.Date).getFullYear();
            // var month = monthNames[new Date(one.Date).getMonth()];
                    // console.log(one,"hello");
              return ({ id: one._id, opening: one })
          }
            
          )
        );
      });
    }, []);

  useEffect(() => {
      const tempList = allNews.filter(({ id, news }) => {
        return (
          news.Title.toLowerCase().indexOf(inputFilter.toLowerCase()) !==
            -1 ||
          (monthNames[new Date(news.Date).getMonth()] + " " + new Date(news.Date).getFullYear()).toLowerCase().indexOf(inputFilter.toLowerCase()) !==
            -1
        );
      });
      setFilteredData(tempList);
    }, [inputFilter, allNews]);

  useEffect(() => {
    var recentNews = filteredData.sort((a, b) => a.Date < b.Date).slice(0, 5).map(({id, news}) => id);

    var tempNestedNews = {}
    filteredData?.forEach(({id, news}) => {
      var year = new Date(news.Date).getFullYear();
      var month = new Date(news.Date).getMonth();
      if(!tempNestedNews[year]) {
        tempNestedNews[year] = {
          title: year,
          collapsed: true,
          children: {}
        };
      } 
      if(!tempNestedNews[year].children[month]) {
        tempNestedNews[year].children[month] = {
          title: monthNames[month],
          collapsed: true,
          children: {}
        };
      }
      tempNestedNews[year].children[month].children[id] = news;
      if(recentNews.find(el => el == id)) {
        tempNestedNews[year].collapsed = nestedNews[year] ? nestedNews[year].collapsed : false;
        tempNestedNews[year].children[month].collapsed = nestedNews[year] && nestedNews[year].children[month] ? nestedNews[year].children[month].collapsed : false;
      }
    });
    setNestedNews(tempNestedNews);
  }, [filteredData])
    
    function LeftArrow() {
      const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext)
    
      return (
        <div className="arrow left" onClick={() => scrollPrev()} >
          <NavigateBefore disabled={isFirstItemVisible} />
        </div>
      );
    }
    
    function RightArrow() {
      const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext)
    
      return (
        <div className="arrow right"  onClick={() => scrollNext()}>
          <NavigateNext disabled={isLastItemVisible}/>
        </div>
      );
    }
    

    return (
        <div className="page">
            <div className="heading">Job Opening</div>
        {allopenings?.map(({ id, opening }) => (
        
        <Card style={{
        maxWidth: "95%",
        boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
        backgroundColor: "#fafafa",
        marginBottom: "10px"
      }}>
      <CardContent>
        <Typography className="title" color="blue" variant="h5" >
          {opening.role}
        </Typography>
        <Typography variant="h6" component="h2">
          {opening.description}
        </Typography>
        <Typography className="pos" color="textSecondary">
          Due Date: {new Date(opening.dueDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions style={{
          display: "flex",
          justifyContent: "flex-end"
      }}>
      <Button style={{
            padding: "10px 20px",
            backgroundColor: "dodgerblue",
            // background-color: dodgerblue,
            border: "1px solid #ddd",
            color: "white",
            alignContent: "left",
            // cursor: pointer
        }} size="small" onClick={()=> window.open(opening.jdPdf, "_blank")}>View JD</Button>
        <Button style={{
            padding: "10px 20px",
            backgroundColor: "dodgerblue",
            // background-color: dodgerblue,
            border: "1px solid #ddd",
            color: "white",
            // cursor: pointer
        }} size="small" onClick={()=> window.open(opening.applyLink, "_blank")}>Apply</Button>

      </CardActions>
    </Card>
        ))}
        </div>
      
)
}

export default JoinUs;
