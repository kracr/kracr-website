import React, { useState, useEffect } from "react";
import "./team.scss";
import {
  KeyboardArrowDown,
  KeyboardDropUp,
  Home,
  Twitter,
  LinkedIn,
  GitHub,
  Mail,
} from "@material-ui/icons";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import db from "../../firebase";
import axios from 'axios';

function Team() {
  const [viewCollab, setViewCollab] = useState(false);
  const [allMembers, setAllMembers] = useState([]);
  const [nFaculty, setNFaculty] = useState(false);
  const [nRA, setNRA] = useState(false);
  const [nBtech, setNBtech] = useState(false);
  const [nMtech, setNMTECH] = useState(false);
  const [nPHD, setNPhd] = useState(false);
  const [nAlumni, setNAlumni] = useState(false);

  useEffect(() => {
    // db.collection("TeamMembers")
    //   .orderBy("Name", "asc")
    //   .onSnapshot((snapshot) => {
      axios.get('http://localhost:5000/team').then((snapshot)=>{
        // axios.post(`http://localhost:5000/team/import`,snapshot.docs.map((doc) => ({ id: doc.id, team: doc.data() })));
        setAllMembers(
          snapshot.data.map((doc) => ({ id: doc.id, member: doc }))
        );
        snapshot.data.map((doc) => {
          if (doc.Position == "Faculty") {
            setNFaculty(true);
          } else if (doc.Position == "Intern") {
            setNRA(true);
          } else if (doc.Position == "RA") {
            setNRA(true);
          } else if (doc.Position == "PhD") {
            setNPhd(true);
          } else if (doc.Position == "Masters") {
            setNMTECH(true);
          } else if (doc.Position == "BTech") {
            setNBtech(true);
          } else if (doc.Position == "Alumni") {
            setNAlumni(true);
		  } else if (doc.Position == "Collaborator") {
            setViewCollab(true);
          }
        });
      });
  }, []);

  const changeViewFaculty = () => {
    if (nFaculty) {
      setNFaculty(false);
    } else {
      setNFaculty(true);
    }
  };
    const changeViewPhD = () => {
    if (nPHD) {
      setNPhd(false);
    } else {
      setNPhd(true);
    }
  };
  const changeViewCollab = () => {
    if (viewCollab) {
      setViewCollab(false);
    } else {
      setViewCollab(true);
    }
  };
  const changeViewAlumni = () => {
    if (nAlumni) {
      setNAlumni(false);
    } else {
      setNAlumni(true);
    }
  };
  const changeViewBtech = () => {
    if (nBtech) {
      setNBtech(false);
    } else {
      setNBtech(true);
    }
  };
  const changeViewMtech = () => {
    if (nMtech) {
      setNMTECH(false);
    } else {
      setNMTECH(true);
    }
  };
  return (
 

    <div className="team">
      <div className="Team-wrapper">
        <div className="title">Meet Our Team</div>
        <div className="row">
		<div className="title" onClick={changeViewFaculty}> Faculty {"  "}
		{nFaculty ? (  <ExpandLessIcon style={{ color: "#a63f04", width: 50}}  /> ) : ( <ExpandMoreIcon style={{ color: "#a63f04", width: 50 }} /> )}
        </div>
		</div>
		{nFaculty ? (
          <div className="row">
            <div className="profiles">
              {allMembers
                ?.filter(({ id, member }) => member.Position === "Faculty")
                .map(({ id, member }) => (
                  <div className="container">
                    <img src={member.ImageURL} alt={member.Name} />
                    <div className="middle">
                      <div className="wrapper">
                        <div className="Title">
						 {member.Name}
						 <div className="interests">{member.Designation}</div>	
						</div>
						
                        {member?.Interests !== "" ? (<div className="SubTitle"> 
                         Research Interests:
						 <div className="interests">{member.Interests}</div></div>
                        
                          ) : (
                            <></>
                          )}
						
                        <div className="socials">
						  {member?.webpageLink !== "" ? (
                            <a
                              href={member?.webpageLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Home />
                            </a>
                          ) : (
                            <></>
                          )}
                          {member?.twitterLink !== "" ? (
                            <a
                              href={member?.twitterLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Twitter />
                            </a>
                          ) : (
                            <></>
                          )}

                          {member?.linkedinLink !== "" ? (
                            <a
                              href={member?.linkedinLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <LinkedIn />
                            </a>
                          ) : (
                            <></>
                          )}
                          {member?.githubLink !== "" ? (
                            <a
                              href={member?.githubLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <GitHub />
                            </a>
                          ) : (
                            <></>
                          )}
                          {member?.Mail !== "" ? (
                            <a
                              href={`mailto:${member?.Mail}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Mail />
                            </a>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          ""
        )}
		<div className="row">
		<div className="title" onClick={changeViewPhD}> Ph. D Students {"  "}
		{nPHD ? (  <ExpandLessIcon style={{ color: "#a63f04", width: 50}}  /> ) : ( <ExpandMoreIcon style={{ color: "#a63f04", width: 50 }} /> )}
        </div>
		</div>
		{nPHD ? (
          <div className="row">
            <div className="profiles">
              {allMembers
                ?.filter(({ id, member }) => member.Position === "PhD")
                .map(({ id, member }) => (
                  <div className="container">
                    <img src={member.ImageURL} alt={member.Name} />
                    <div className="middle">
                      <div className="wrapper">
                        <div className="Title">
						 {member.Name}
						 <div className="interests">{member.Designation}</div>	
						</div>
						
                        {member?.Interests !== "" ? (<div className="SubTitle"> 
                         Research Interests:
						 <div className="interests">{member.Interests}</div></div>
                        
                          ) : (
                            <></>
                          )}
					
                        <div className="socials">
						  {member?.webpageLink !== "" ? (
                            <a
                              href={member?.webpageLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Home />
                            </a>
                          ) : (
                            <></>
                          )}
                          {member?.twitterLink !== "" ? (
                            <a
                              href={member?.twitterLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Twitter />
                            </a>
                          ) : (
                            <></>
                          )}

                          {member?.linkedinLink !== "" ? (
                            <a
                              href={member?.linkedinLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <LinkedIn />
                            </a>
                          ) : (
                            <></>
                          )}
                          {member?.githubLink !== "" ? (
                            <a
                              href={member?.githubLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <GitHub />
                            </a>
                          ) : (
                            <></>
                          )}
                          {member?.Mail !== "" ? (
                            <a
                              href={`mailto:${member?.Mail}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Mail />
                            </a>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          ""
        )}
		<div className="row">
		<div className="title" onClick={changeViewMtech}> Masters Students {"  "}
		{nMtech ? (  <ExpandLessIcon style={{ color: "#a63f04", width: 50}}  /> ) : ( <ExpandMoreIcon style={{ color: "#a63f04", width: 50 }} /> )}
        </div>
		</div>
        {nMtech ? (
          <div className="row">
 
            <div className="profiles">
              {allMembers
                ?.filter(({ id, member }) => member.Position === "Masters")
                .map(({ id, member }) => (
                  <div className="container">
                    <img src={member.ImageURL} alt={member.Name} />
                    <div className="middle">
                      <div className="wrapper">
                        <div className="Title">
						 {member.Name}
						 <div className="interests">{member.Designation}</div>	
						</div>
						
                        {member?.Interests !== "" ? (<div className="SubTitle"> 
                         Research Interests:
						 <div className="interests">{member.Interests}</div></div>
                        
                          ) : (
                            <></>
                          )}

                        <div className="socials">
						  {member?.webpageLink !== "" ? (
                            <a
                              href={member?.webpageLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Home />
                            </a>
                          ) : (
                            <></>
                          )}
                          {member?.twitterLink !== "" ? (
                            <a
                              href={member?.twitterLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Twitter />
                            </a>
                          ) : (
                            <></>
                          )}

                          {member?.linkedinLink !== "" ? (
                            <a
                              href={member?.linkedinLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <LinkedIn />
                            </a>
                          ) : (
                            <></>
                          )}
                          {member?.githubLink !== "" ? (
                            <a
                              href={member?.githubLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <GitHub />
                            </a>
                          ) : (
                            <></>
                          )}
                          {member?.Mail !== "" ? (
                            <a
                              href={`mailto:${member?.Mail}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Mail />
                            </a>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          ""
        )}
	
		<div className="row">
		<div className="title" onClick={changeViewBtech}> B.Tech Students {"  "}
		{nBtech ? (  <ExpandLessIcon style={{ color: "#a63f04", width: 50}}  /> ) : ( <ExpandMoreIcon style={{ color: "#a63f04", width: 50 }} /> )}
        </div>
		</div>
        {nBtech ? (
          <div className="row">

            <div className="profiles">
              {allMembers
                ?.filter(({ id, member }) => member.Position === "BTech")
                .map(({ id, member }) => (
                  <div className="container">
                    <img src={member.ImageURL} alt={member.Name} />
                    <div className="middle">
                      <div className="wrapper">
                        <div className="Title">
						 {member.Name}
						 <div className="interests">{member.Designation}</div>	
						</div>
						
                        {member?.Interests !== "" ? (<div className="SubTitle"> 
                         Research Interests:
						 <div className="interests">{member.Interests}</div></div>
                        
                          ) : (
                            <></>
                          )}

                        <div className="socials">
						  {member?.webpageLink !== "" ? (
                            <a
                              href={member?.webpageLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Home />
                            </a>
                          ) : (
                            <></>
                          )}
                          {member?.twitterLink !== "" ? (
                            <a
                              href={member?.twitterLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Twitter />
                            </a>
                          ) : (
                            <></>
                          )}

                          {member?.linkedinLink !== "" ? (
                            <a
                              href={member?.linkedinLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <LinkedIn />
                            </a>
                          ) : (
                            <></>
                          )}
                          {member?.githubLink !== "" ? (
                            <a
                              href={member?.githubLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <GitHub />
                            </a>
                          ) : (
                            <></>
                          )}
                          {member?.Mail !== "" ? (
                            <a
                              href={`mailto:${member?.Mail}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Mail />
                            </a>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          ""
        )}
        {nRA ? (
          <div className="row">
            <div className="title">R.A. / Interns</div>
            <div className="profiles">
              {allMembers
                ?.filter(
                  ({ id, member }) =>
                    member.Position === "RA" || member.Position === "Intern"
                )
                .map(({ id, member }) => (
                  <div className="container">
                    <img src={member.ImageURL} alt={member.Name} />
                    <div className="middle">
                      <div className="wrapper">
                        <div className="Title">
						 {member.Name}
						 <div className="interests">{member.Designation}</div>	
						</div>
						
                        {member?.Interests !== "" ? (<div className="SubTitle"> 
                         Research Interests:
						 <div className="interests">{member.Interests}</div></div>
                        
                          ) : (
                            <></>
                          )}

                        <div className="socials">
						  {member?.webpageLink !== "" ? (
                            <a
                              href={member?.webpageLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Home />
                            </a>
                          ) : (
                            <></>
                          )}
                          {member?.twitterLink !== "" ? (
                            <a
                              href={member?.twitterLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Twitter />
                            </a>
                          ) : (
                            <></>
                          )}

                          {member?.linkedinLink !== "" ? (
                            <a
                              href={member?.linkedinLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <LinkedIn />
                            </a>
                          ) : (
                            <></>
                          )}
                          {member?.githubLink !== "" ? (
                            <a
                              href={member?.githubLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <GitHub />
                            </a>
                          ) : (
                            <></>
                          )}
                          {member?.Mail !== "" ? (
                            <a
                              href={`mailto:${member?.Mail}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Mail />
                            </a>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          ""
        )}
		
		 <div className="row">		
          <div className="title" onClick={changeViewCollab}> Collaborators {"  "}
			  {viewCollab ? (  <ExpandLessIcon style={{ color: "#a63f04", width: 50}}  /> ) : ( <ExpandMoreIcon style={{ color: "#a63f04", width: 50 }} /> )}
          </div>
        </div>  	
		{viewCollab ? (
          <div className="row">
            <div className="profiles">
              {allMembers
                ?.filter(({ id, member }) => member.Position === "Collaborator")
                .map(({ id, member }) => (

                  <div className="container2">

                    <div className="middle">
                      <div className="wrapper">
                        <div className="Title">
						  {member?.webpageLink !== "" ? (
                            <a
                              href={member?.webpageLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {member.Name}
                            </a>
                          ) : (
                            <> {member.Name} </>
                          )}
                        
                          <div className="interests">{member.Designation}</div>
                        
                       </div>

					  </div>
                    </div>

				  </div>


                ))}
            </div>
          </div>
        ) : (
          ""
        )}

		 <div className="row">		
          <div className="title" onClick={changeViewAlumni}> Alumni {"  "}
			  {nAlumni ? (  <ExpandLessIcon style={{ color: "#a63f04", width: 50}}  /> ) : ( <ExpandMoreIcon style={{ color: "#a63f04", width: 50 }} /> )}
          </div>
        </div>  
        {nAlumni ? (
          <div className="row">
           
			<div className="profiles">
              {allMembers
                ?.filter(({ id, member }) => member.Position === "Alumni")
                .map(({ id, member }) => (
                  <div className="container">
                    <img src={member.ImageURL} alt={member.Name} />
                    <div className="middle">
                      <div className="wrapper">
                        <div className="Title">
						 {member.Name}
						 <div className="interests">{member.Designation}</div>	
						</div>
						
                        {member?.Interests !== "" ? (<div className="SubTitle"> 
                         Research Interests:
						 <div className="interests">{member.Interests}</div></div>
                        
                          ) : (
                            <></>
                          )}

                        <div className="socials">
						  {member?.webpageLink !== "" ? (
                            <a
                              href={member?.webpageLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Home />
                            </a>
                          ) : (
                            <></>
                          )}
                          {member?.twitterLink !== "" ? (
                            <a
                              href={member?.twitterLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Twitter />
                            </a>
                          ) : (
                            <></>
                          )}

                          {member?.linkedinLink !== "" ? (
                            <a
                              href={member?.linkedinLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <LinkedIn />
                            </a>
                          ) : (
                            <></>
                          )}
                          {member?.githubLink !== "" ? (
                            <a
                              href={member?.githubLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <GitHub />
                            </a>
                          ) : (
                            <></>
                          )}
                          {member?.Mail !== "" ? (
                            <a
                              href={`mailto:${member?.Mail}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Mail />
                            </a>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          ""
        )}

      </div>

    </div>
  );
}

export default Team;
