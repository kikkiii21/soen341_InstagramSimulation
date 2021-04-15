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
    width:30,
    height:30,
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
    width:30,
    height:30,
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
        <div className="logo">
          <img
            src="../../../static/images/logocat.png"
            className="Nav-brand-logo"
          />
        </div>
        <div className="Nav-brand">
          <img
            src="../../../static/images/catstagram.png"
            className="Nav-brand-logo"
          />
        </div>
        <div className="spacer"></div>
        <div className="nav-actions">
          <div className={classes.navPages}>
            <a href="settings">
              <img src="../../static/images/gear.png" className={classes.navIcons} />
            </a>
            <a href="homepage">
              <img src="../../static/images/home.png" className={classes.navIcons} />
            </a>
            <a
              href="profile"
              className="link-styling"
              onClick={profileLinkHandler}
            >
              <img src="../../static/images/catprofile.png" className={classes.navIcons} />
            </a>
            <a href="following" className="link-styling">
              <img src="../../static/images/cats.png" className={classes.navIcons} />
            </a>
            <a className={classes.logoutBtn} onClick={Logout}>
              <img src="../../static/images/logout.png"className={classes.navLogoutIcons} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
