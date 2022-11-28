import React from "react";
import "./cms.scss";
import { Link, Switch, Route } from "react-router-dom";
import TeamCMS from "../TeamCMS/TeamCMS";
import PublicationCMS from "../PublicationCMS/PublicationCMS";
import ProjectCMS from "../ProjectCMS/ProjectCMS";
import NewsCMS from "../NewsCMS/NewsCMS";
import JoinUsCMS from "../JoinUsCMS/JoinUsCMS";
import BlogCMS from "../BlogCMS/BlogCMS";

function CMS() {
  return (
    <div className="CMSwrapper">
      <div className="navbar">
        <ul className="menu">
          <Link to="/CMS/team">
            <li>Team</li>
          </Link>
          <Link to="/CMS/publications">
            <li>Publications</li>
          </Link>
          <Link to="/CMS/projects">
            <li>Projects</li>
          </Link>
          <Link to="/CMS/news">
            <li>News</li>
          </Link>
          <Link to="/CMS/joinus">
            <li>Join Us</li>
          </Link>
          <Link to="/CMS/blog">
            <li>Blog</li>
          </Link>
        </ul>
      </div>
      <div className="content">
        <Switch>
          <Route path="/CMS/team">
            <TeamCMS />
          </Route>
          <Route path="/CMS/publications">
            <PublicationCMS />
          </Route>
          <Route path="/CMS/projects">
            <ProjectCMS />
          </Route>
          <Route path="/CMS/news">
            <NewsCMS />
          </Route>
          <Route path="/CMS/joinus">
            <JoinUsCMS />
          </Route>
          <Route path="/CMS/blog">
            <BlogCMS />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default CMS;
