import React, { useContext, useState } from "react";
import "../../../static/css/header.css";
import { makeStyles } from "@material-ui/core/styles";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import WebIcon from "@material-ui/icons/Web";
import TuneIcon from "@material-ui/icons/Tune";
import { UserStatusContext } from "../Context/UserStatusContext";
import { UserContext } from "../Context/AppContext";
import axios from "axios";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";

const useStyles = makeStyles(() => ({
  navIcons: {
    color: "#383838",
    fontSize: "30px",
    margin: "0px 10px",
  },

  navPages: {
    width: "8vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navLogoutIcons: {
    color: "#383838",
    fontSize: "30px",
    "&:hover": {
      color: "#fff",
    },
  },
  logoutBtn: {
    outline: "none",
    border: "none",
    padding: "2px 5px",
    backgroundColor: "#fff",
    transitionDuration: "0.4s",
    borderRadius: "3px",
    cursor: "pointer",
    width: "60px",
    height: "30px",
    "&:hover": {
      backgroundColor: "#e35b6d",
      transitionDuration: "0.4s",
      color: "#fff",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserStatusContext);
  const { LoggedInUserInfo, setLoggedInUserInfo } = useContext(UserContext);
  const localUserInfo = localStorage.getItem("userInfo");
  const localUserStatus = localStorage.getItem("userStatus");
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const redirectProfile = JSON.parse(localUserInfo);

  const profileLinkHandler = () => {
    localStorage.setItem(
      "profileRedirect",
      JSON.stringify(redirectProfile.author)
    );

    window.location = "/profile";
  };

  const Logout = () => {
    axios
      .post("/logoutEndpoint", "", {
        headers: {
          Authorization: `token ${
            LoggedInUserInfo.token || JSON.parse(localUserInfo).token
          }`,
        },
      })
      .then((res) => {
        setIsLoggedIn(false);
        setIsLoggedOut(true);
        localStorage.clear();
        localStorage.setItem("userStatus", "false");
        window.location = "./login";
      })
      .catch((err) =>
        err.response.status == 204
          ? localStorage.setItem("userStatus", "false")
          : ""
      );
  };

  return (
    <nav className="Nav">
      <div className="Nav-menus">
        <div className="Nav-brand">
          <a className="Nav-brand-logo" href="/">
            Instagram
          </a>
        </div>
        <div className="spacer"></div>
        <div className="nav-actions">
          <div className={classes.navPages}>
            <a href="settings">
              <TuneIcon className={classes.navIcons} />
            </a>
            <a href="homepage">
              <WebIcon className={classes.navIcons} />
            </a>
            <a
              href="profile"
              className="link-styling"
              onClick={profileLinkHandler}
            >
              <PersonOutlineIcon className={classes.navIcons} />
            </a>
            <a href="following" className="link-styling">
              <PeopleAltOutlinedIcon className={classes.navIcons} />
            </a>
            <a className={classes.logoutBtn} onClick={Logout}>
              <ExitToAppOutlinedIcon className={classes.navLogoutIcons} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;