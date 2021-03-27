import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import TextField from "@material-ui/core/TextField";
import "../../static/css/settings.css";

const settingsStyles = makeStyles(() => ({
  card: {
    borderRadius: "10px",
    border: "1px solid #e6e6e6",
    backgroundColor: "#fff",
    padding: "15px 0px",

    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    boxShadow: "2px 2px 50px rgb(204, 204, 204)",
    width: "100%",
    marginBottom: "30px",
  },
  TextField: {
    margin: "10px",
    width: "50%",
  },
  imgBtn: {
    width: "30px",
    height: "25px",
    backgroundColor: "#0095F6",
    fontSize: "25px",
    padding: "5px 8px",
    margin: "5px 0px",
    transitionDuration: "0.4s",
    border: "none",
    borderRadius: "5px",
    outline: "none",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#000",
    },
  },
  hideImageInput: {
    display: "none",
  },
  submit: {
    backgroundColor: "#0095F6",
    fontSize: "15px",
    padding: "5px 10px",
    transitionDuration: "0.4s",
    border: "none",
    borderRadius: "5px",
    margin: "0px 10px",
    outline: "none",
    color: "#fff",
    height: "30px",
    width: "85px",

    "&:hover": {
      backgroundColor: "#000",
      transition: "background 0.5s ease",
    },
  },
  PostUserAvatar: {
    width: "100px",
    height: "100px",
    position: "relative",
    overflow: "hidden",
    borderRadius: "50%",
    marginRight: "50px",
  },
  image: {
    display: "inline",
    margin: "0 auto",
    // marginLeft: '-70%',
    height: "100%",
    width: "auto",
  },
  photoSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px",
    padding: "10px",
  },
  textInfoSection: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "10px",
  },
  contents: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  headerSpace: {
    marginBottom: "90px",
  },
  titleSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    minHeight: "10vh",
    padding: "15px",
    borderRadius: "10px",
    fontSize: "26px",
  },
  form: {
    width: "100%",
  },
  hrWrapper: {
    width: "70%",
    margin: "30px 0px",
  },
}));

const Settings = () => {
  //State
  const styles = settingsStyles();
  const { updateInfo, handleSubmit } = useForm();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [newImage, setNewImage] = useState(userInfo.avatar);
  console.log(userInfo);

  //Event Handlers
  const profileImageHandler = (e) => {
    setNewImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={12} className={styles.headerSpace}>
        <Header />
      </Grid>
      <Grid item xs={8}>
        <div className={styles.titleSection}>Account Settings</div>
      </Grid>
      <Grid item xs={8}>
        <div className={styles.card}>
          <form className={styles.form}>
            <div className={styles.contents}>
              <div className={styles.hrWrapper}>
                <div className="separator">Update Profile Picture</div>
              </div>
              <div className={styles.photoSection}>
                <div className={styles.PostUserAvatar}>
                  <img className={styles.image} src={newImage} alt="Username" />
                </div>
                <label for="profilePhoto">
                  <AddAPhotoIcon className={styles.imgBtn} fontSize="default" />
                </label>
                <input
                  required
                  value={null}
                  // onChange={imageSelectedHandler}
                  ref={updateInfo}
                  name="avatar"
                  id="profilePhoto"
                  className={styles.hideImageInput}
                  type="file"
                  onChange={profileImageHandler}
                />
              </div>
              <div className={styles.textInfoSection}>
                <div className={styles.hrWrapper}>
                  <div className="separator">Update Full Name</div>
                </div>
                <TextField
                  defaultValue={userInfo.author}
                  type="text"
                  required
                  inputRef={updateInfo}
                  name="firstName"
                  id="firstName"
                  className={styles.TextField}
                  label="First Name"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  type="text"
                  required
                  inputRef={updateInfo}
                  name="lastName"
                  id="lastName"
                  className={styles.TextField}
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                />
                <div className={styles.hrWrapper}>
                  <div className="separator">Update Email/Password</div>
                </div>
                <TextField
                  type="email"
                  required
                  inputRef={updateInfo}
                  name="email"
                  id="email"
                  className={styles.TextField}
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  type="password"
                  required
                  inputRef={updateInfo}
                  name="password"
                  id="password"
                  className={styles.TextField}
                  label="Current Password"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  type="password"
                  required
                  inputRef={updateInfo}
                  name="Npassword"
                  id="Npassword"
                  className={styles.TextField}
                  label="New Password"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <button className={styles.submit}>Submit</button>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Settings;
