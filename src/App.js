import React from "react";
import "./App.scss";
import Home from "./Components/Home/Home";
import Team from "./Components/Team/Team";
import Publications from "./Components/Publications/Publication";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/Navbar";
import Footer from "./Components/Footer/Footer";
import HomeCMS from "./Components/CMS/HomeCMS/CMS";
import LoginCMS from "./Components/CMS/LoginCMS/LoginCMS";
import Project from "./Components/Projects/Project";
import ProjectDetails from "./Components/Projects/ProjectDetails";
import News from "./Components/News/News";
import JoinUs from "./Components/JoinUs/JoinUs";
import { useSelector } from "react-redux";
import Chatbot from "./Components/Chatbot/chatbot";
import Blogs from "./Components/Blogs/Blogs";
import BlogPage from "./Components/Blogs/BlogPage";

function App() {
  const user = useSelector((state) => state.isLogged);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/CMS">
            {user ? (
              <>
                <HomeCMS />
              </>
            ) : (
              <>
                <LoginCMS />
              </>
            )}
          </Route>
          <Route path="/">
            <NavBar />
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/team" exact>
                <Team />
              </Route>
              <Route path="/publications" exact>
                <Publications />
              </Route>
              <Route path="/projects/chatbot" exact>
                <Chatbot />
              </Route>
              <Route path="/projects" exact>
                <Project />
              </Route>
              <Route path="/projects/:id" exact component={ProjectDetails} />
              <Route path="/blogs" exact>
                <Blogs />
              </Route>
              <Route path="/blog/:id" exact component={BlogPage} />
              <Route path="/news" exact>
                <News />
              </Route>
              <Route path="/joinus" exact>
                <JoinUs />
              </Route>
            </Switch>
            <Footer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
