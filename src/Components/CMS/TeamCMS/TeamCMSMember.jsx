import React, { useEffect, useState } from "react";
import "./TeamCMSMember.scss";
import { DeleteForever } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";


function TeamCMSMember({ member, id }) {
  const deleteMember = () => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/team/${id}`);
  };

  const [category, setcategory] = useState("B.Tech");

  useEffect(() => {
    setcategory(member.Position);
  }, []);

  //DROP DOWN MENU STARTED
  const useStyles = makeStyles((theme) => ({
    button: {
      display: "block",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setcategory(event.target.value);
    // db.collection("TeamMembers")
    //   .doc(id)
    //   .update({ Position: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  //DROP DOWN MENU ENDS
  return (
    <div className="member">
      <div className="image">
        <img src={member.ImageURL} alt={member.Name}></img>
      </div>
      <div className="data">
        <div className="title">
          {member.Name},{" "}
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">
              category
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={category}
              onChange={handleChange}
            >
              <MenuItem value={"Faculty"}>Faculty</MenuItem>
              <MenuItem value={"PhD"}>Ph.D</MenuItem>
              <MenuItem value={"Masters"}>Masters</MenuItem>
              <MenuItem value={"BTech"}>B.Tech</MenuItem>
              <MenuItem value={"Alumni"}>Alumni</MenuItem>
              <MenuItem value={"RA"}>RA</MenuItem>
              <MenuItem value={"Intern"}>Intern</MenuItem>
              <MenuItem value={"Collaborator"}>Collaborator</MenuItem>
            </Select>
          </FormControl>{" "}
        </div>
        <div className="delete">
          <IconButton
            onClick={() => {
              if (window.confirm(`Delete ${member.Name}?`)) {
                deleteMember();
              }
            }}
          >
            <DeleteForever />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default TeamCMSMember;
