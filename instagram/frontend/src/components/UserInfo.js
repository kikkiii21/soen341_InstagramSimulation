import React, {useContext} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { UserContext} from './AppContext';
import {UserStatusContext} from './UserStatusContext';

const UserInfoStyles = makeStyles((theme) => ({
    card: {
        borderRadius: '3px',
        border: '1px solid #e6e6e6',
        backgroundColor: '#fff',
        padding: '30px',
        boxShadow: '2px 2px 50px rgb(204, 204, 204)',
        width: "60%",
        marginRight: '5%',        
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
      },

      PostUser: {
        display: 'flex',
        padding: '16px',
        alignItems: 'center',
      },
      PostUserAvatar: {
        width: '100px',
        height: '100px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '50%',
      },
      image: {
        display: 'inline',
        margin: '0 auto',
        // marginLeft: '-70%',
        height: '100%',
        width: 'auto',
      },
     
      PosUserNickname: {
        marginLeft: '20px',
        fontFamily: 'PT Sans',
        fontWeight: 'bold',
      },
   
}));

const UserInfo = () => {

  const user = UserInfoStyles();
  const {LoggedInUserInfo, setLoggedInUserInfo} = useContext(UserContext);
  const {isLoggedIn, setIsLoggedIn} = useContext(UserStatusContext);
  const localInfo = localStorage.getItem("userInfo");
  const localStatus = localStorage.getItem("userStatus");

  return(
    <div className={user.card}>
      <div className={user.PostUser}>
        <div className={user.PostUserAvatar}>
            <img className={user.image} src={ JSON.parse(localInfo).avatar || LoggedInUserInfo.avatar} alt="Username" />
          </div>
          <div className={user.PosUserNickname}>
            <span>{JSON.parse(localInfo).name || LoggedInUserInfo.name}</span>
          </div>
      </div>
    </div>
    );
    
}

export default UserInfo;