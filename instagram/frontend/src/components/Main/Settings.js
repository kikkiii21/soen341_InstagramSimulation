import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../SharedComponents/Header";
import { makeStyles } from "@material-ui/core/styles";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import TextField from "@material-ui/core/TextField";
import "../../../static/css/settings.css";
import axios from "axios";
import FormData from "form-data";
import { UserContext } from "../Context/AppContext";
import UserInfo from "../SharedComponents/UserInfo";

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
  textConfirmation: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    color: "#008000",
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
  const { LoggedInUserInfo, setLoggedInUserInfo } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [newImage, setNewImage] = useState({ url: userInfo.avatar, raw: null });
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const [newFirstName, setNewFirstName] = useState(userInfo.first_name);
  const [newLastName, setNewLastName] = useState(userInfo.last_name);
  const [newEmail, setNewEmail] = useState(userInfo.email);
  const [updateValidation, setUpdateValidation] = useState(false);
  const [updateValidationImage, setUpdateValidationImage] = useState(false);
  const [updateValidationPassword, setUpdateValidationPassword] = useState(false);

  //Event Handlers
  const profileImageHandler = (e) => {
    setNewImage({
      url: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });
  };

  const updateImageHandler = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("photo", newImage.raw);

    axios
      .put(`updatePhoto/`, form_data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `token ${userInfo.token}`,
        },
      })
      .then((res) => {
        const newInfoImage = { ...userInfo };

        newInfoImage.avatar = res.data.photo;
        console.log(">>>>>>>>>>>>>>>>>>>", newInfoImage);
        localStorage.setItem("userInfo", JSON.stringify(newInfoImage));
        setLoggedInUserInfo(newInfoImage);
      },
          ()=>{
           setUpdateValidationImage(true);})
      .catch((err) => console.log(err));
  };

  const currentPasswordHandler = (e) => {
    setCurrentPassword(e.target.value);
  };
  const newPasswordHandler = (e) => {
    setNewPassword(e.target.value);
  };
  const confirmNewPasswordHandler = (e) => {
    setConfirmNewPassword(e.target.value);
  };
  const newFirstNameHandler = (e) => {
    setNewFirstName(e.target.value);
  };
  const newLastNameHandler = (e) => {
    setNewLastName(e.target.value);
  };
  const newEmailHandler = (e) => {
    setNewEmail(e.target.value);
  };

  const updateProfileHandler = (e) => {
    e.preventDefault();
    const profileObject = {
      user: {
        first_name: newFirstName,
        last_name: newLastName,
        email: newEmail,
      },
    };
    const updateUserState = { ...userInfo };
    updateUserState.first_name = newFirstName;
    updateUserState.last_name = newLastName;
    updateUserState.email = newEmail;
    setUserInfo(updateUserState);
    localStorage.removeItem("userInfo");
    localStorage.setItem("userInfo", JSON.stringify(updateUserState));
    console.log("here here here", userInfo);
    axios
      .patch(`updateProfile/`, profileObject, {
        headers: {
          "content-type": "application/json",
          Authorization: `token ${userInfo.token}`,
        },
      })
        .then(
            ()=>{
          setUpdateValidation(true);
        },
        (res) =>{console.log(res)}
        )
        //.then((res) => console.log(res))
        .catch((err) => console.log(err));
  };

  const updatePasswordHandler = (e) => {
    e.preventDefault();
    const passwordObject = {
      old_password: currentPassword,
      password: newPassword,
      password2: confirmNewPassword,
    };
    axios
      .put(`changePassword/${userInfo.id}/`, passwordObject, {
        headers: {
          "content-type": "application/json",
          Authorization: `token ${userInfo.token}`,
        },
      })
      .then((res) => {console.log(res)},
          ()=>{
           setUpdateValidationPassword(true);}
          )
      .catch((err) => console.log(err));
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
          <div className={styles.contents}>
            <form className={styles.form}>
              <div className={styles.textInfoSection}>
                <div className={styles.hrWrapper}>
                  <div className="separator">Update Profile Picture</div>
                </div>
                <div className={styles.photoSection}>
                  <div className={styles.PostUserAvatar}>
                    <img
                      className={styles.image}
                      src={newImage.url}
                      alt="ProfilePic"
                    />
                  </div>
                  <label htmlFor="profilePhoto">
                    <AddAPhotoIcon
                      className={styles.imgBtn}
                      fontSize="default"
                    />
                  </label>
                </div>
                <input
                  name="avatar"
                  id="profilePhoto"
                  className={styles.hideImageInput}
                  type="file"
                  onChange={profileImageHandler}
                />
                <button className={styles.submit} onClick={updateImageHandler}>
                  Update
                </button>
                {updateValidationImage && (

                    <div className={styles.textConfirmation}>
                        You have updated your profile picture successfully!
                    </div>
                )}
              </div>
            </form>

            <form className={styles.form} onSubmit={updateProfileHandler}>

              <div className={styles.textInfoSection}>
                <div className={styles.hrWrapper}>
                  <div className="separator">Update Full Name</div>
                                                {updateValidation && (

                    <div className={styles.textConfirmation}>
                        You have updated your information successfully!
                    </div>
                )}
                </div>
                <TextField
                  defaultValue={userInfo.first_name}
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={styles.TextField}
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  onChange={newFirstNameHandler}
                />
                <TextField
                  type="text"
                  defaultValue={userInfo.last_name}
                  name="lastName"
                  id="lastName"
                  className={styles.TextField}
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  onChange={newLastNameHandler}
                />

                <TextField
                  type="email"
                  defaultValue={userInfo.email}
                  name="email"
                  id="email"
                  className={styles.TextField}
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  onChange={newEmailHandler}
                />

                <button className={styles.submit}>Update</button>
              </div>
            </form>
          </div>
          <form onSubmit={updatePasswordHandler}>
            <div className={styles.contents}>
              <div className={styles.textInfoSection}>
                <div className={styles.hrWrapper}>
                  <div className="separator">Update Email/Password</div>
                               {updateValidationPassword && (
                    <div className={styles.textConfirmation}>
                        You have updated your password successfully!
                    </div>
                )}
                </div>
                <TextField
                  type="password"
                  required
                  name="password"
                  id="password"
                  className={styles.TextField}
                  label="Current Password"
                  variant="outlined"
                  fullWidth
                  onChange={currentPasswordHandler}
                />
                <TextField
                  type="password"
                  required
                  name="Npassword"
                  id="Npassword"
                  className={styles.TextField}
                  label="New Password"
                  variant="outlined"
                  fullWidth
                  onChange={newPasswordHandler}
                />
                <TextField
                  type="password"
                  required
                  name="Cpassword"
                  id="Cpassword"
                  className={styles.TextField}
                  label="Confirm New Password"
                  variant="outlined"
                  fullWidth
                  onChange={confirmNewPasswordHandler}
                />
                <button className={styles.submit}>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Settings;
