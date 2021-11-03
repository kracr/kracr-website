import db from "../../firebase";
import React, { useState, useEffect } from "react";
import { ExpandMore, ExpandLess, NavigateBefore, NavigateNext, DoubleArrow, Flag } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

function News() {
    const [allNews, setAllNews] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [inputFilter, SetInputFilter] = useState("");
    const [nestedNews, setNestedNews] = useState({});
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  useEffect(() => {
      db.collection("News")
        .orderBy("Date", "desc")
        .onSnapshot((snapshot) => {
          setAllNews(
              snapshot.docs.map((doc) => ({ id: doc.id, news: doc.data() }))
          );
        });
      }, []);

  useEffect(() => {
      const tempList = allNews.filter(({ id, news }) => {
        return (
          news.Title.toLowerCase().indexOf(inputFilter.toLowerCase()) !==
            -1 ||
          (monthNames[new Date(news.Date.seconds * 1000).getMonth()] + " " + new Date(news.Date.seconds * 1000).getFullYear()).toLowerCase().indexOf(inputFilter.toLowerCase()) !==
            -1
        );
      });
      setFilteredData(tempList);
    }, [inputFilter, allNews]);

  useEffect(() => {
    var recentNews = filteredData.sort((a, b) => a.Date < b.Date).slice(0, 5).map(({id, news}) => id);

    var tempNestedNews = {}
    filteredData?.forEach(({id, news}) => {
      var year = new Date(news.Date.seconds * 1000).getFullYear();
      var month = new Date(news.Date.seconds * 1000).getMonth();
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
        <div className="page-wrapper">
            <div className="title">
                <div className="left">News</div>
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
            {Object.keys(nestedNews).sort().reverse().map((year) => {
              return (<div className="collapsableCategory">
                <div className="header">
                  <div className="title">{nestedNews[year].title}</div>
                  <IconButton onClick={() => {
                    var temp = {...nestedNews};
                    temp[year].collapsed = !temp[year].collapsed
                    setNestedNews(temp);
                    }}>{nestedNews[year].collapsed ? <ExpandMore /> : <ExpandLess />}</IconButton>
                </div>

                <div className="body" aria-collapsed={nestedNews[year].collapsed}>
                {Object.keys(nestedNews[year].children).sort().reverse().map((month) => {
                  console.log()
                  return (
                    <div className="collapsableCategory">
                      <div className="header">
                        <div className="subtitle">{nestedNews[year].children[month].title}</div>
                        <IconButton onClick={() => {
                            var temp = {...nestedNews}
                            temp[year].children[month].collapsed = !temp[year].children[month].collapsed
                            setNestedNews(temp);
                            }}>{nestedNews[year].children[month].collapsed ? <ExpandMore /> : <ExpandLess />}</IconButton>
                      </div>
                      <div className="body" aria-collapsed={nestedNews[year].children[month].collapsed}>
                        {Object.keys(nestedNews[year].children[month].children).map((id) => {
                            var news = nestedNews[year].children[month].children[id];
                            return (
                            <div className="item">
                              <Flag /><div className="content">{news.Title}</div>
                            </div>)
                          })}
                      </div>
                    </div>
                  )
                })}
                </div>
              </div>)
            })
            }
        </div>
    </div>)
}

export default News;
