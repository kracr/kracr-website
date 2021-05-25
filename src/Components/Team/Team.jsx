import React, { useState, useEffect } from "react";
import "./team.scss";
import {
  KeyboardArrowUp,
  Home,
  Twitter,
  LinkedIn,
  GitHub,
  Mail,
} from "@material-ui/icons";
import db from "../../firebase";

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
    db.collection("TeamMembers")
      .orderBy("Name", "asc")
      .onSnapshot((snapshot) => {
        setAllMembers(
          snapshot.docs.map((doc) => ({ id: doc.id, member: doc.data() }))
        );
        snapshot.docs.map((doc) => {
          if (doc.data().Position == "Faculty") {
            setNFaculty(true);
          } else if (doc.data().Position == "Intern") {
            setNRA(true);
          } else if (doc.data().Position == "RA") {
            setNRA(true);
          } else if (doc.data().Position == "PhD") {
            setNPhd(true);
          } else if (doc.data().Position == "Masters") {
            setNMTECH(true);
          } else if (doc.data().Position == "BTech") {
            setNBtech(true);
          } else if (doc.data().Position == "Alumni") {
            setNAlumni(true);
		  } else if (doc.data().Position == "Collaborator") {
            setViewCollab(true);
          }
        });
      });
  }, []);

  /*const changeViewCollab = () => {
    if (viewCollab) {
      setViewCollab(false);
    } else {
      setViewCollab(true);
    }
  };*/

  return (
    <div className="team">
      <div className="Team-wrapper">
        <div className="title">Meet Our Team</div>
        {nFaculty ? (
          <div className="row">
            <div className="title">Faculty</div>
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
						<div className="interests">{member.Designation}</div>	</div>
						<div className="SubTitle"> Research Interests:
						<div className="interests">{member.Interests}</div>
					
                        </div>
                        
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
		{nPHD ? (
          <div className="row">
            <div className="title">Ph.D Students</div>
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
						<div className="interests">{member.Designation}</div>	</div>
						<div className="SubTitle"> Research Interests:	
						<div className="interests">{member.Interests}</div>
                        </div>
						
					
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
        {nMtech ? (
          <div className="row">
            <div className="title">Master's Students</div>
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
						<div className="interests">{member.Designation}</div>	</div>
						<div className="SubTitle"> Research Interests:
						<div className="interests">{member.Interests}</div>
					
                        </div>
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
        {nBtech ? (
          <div className="row">
            <div className="title">B.Tech Students</div>
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
						<div className="interests">{member.Designation}</div>	</div>
						<div className="SubTitle"> Research Interests:
						<div className="interests">{member.Interests}</div>
					
                        </div>
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
						<div className="interests">{member.Designation}</div>	</div>
						<div className="SubTitle"> Research Interests:
						<div className="interests">{member.Interests}</div>
					
                        </div>
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
        
        {nAlumni ? (
          <div className="row">
            <div className="title">Alumni</div>
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
        {viewCollab ? (
          <div className="row">
            <div className="title">Collaborators</div>
            <div className="profiles">
              {allMembers
                ?.filter(({ id, member }) => member.Position === "Collaborator")
                .map(({ id, member }) => (
                  <div className="container">
                    <img src={member.ImageURL} alt={member.Name} />
                    <div className="middle">
                      <div className="wrapper">
                        <div className="Title">
                          {member.Name}
                          <div className="interests">{member.Designation}</div>
                        </div>

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
