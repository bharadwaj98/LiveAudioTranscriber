import TopNav from '../topNav/TopNav'

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>({
  button1:{
    borderRadius: "6px",
    width: "180px",
    height: "40px",
    color: '#091B7C'
  },
  navStyles:{
    textAlign: "left",
    font: "600 24px/38px Poppins",
    letterSpacing: "0px",
    color: "#091B7C",
    opacity: 1
  },
  navBg:{
    background: 'linear-gradient(180deg,  rgba(8,103,239,0.5) 0%, rgba(255,255,255,1) 100%)',
    border: "0px",
    boxShadow: "none",
    elevation: 1
  }
}));


export const Layout = ({children, auth,logout}) =>{

    const classes = useStyles()

    return(
        <>
            <TopNav classes={classes} auth={auth} logout={logout}/>
            {children}
        </>
    )
}

Layout.defaultProps ={
  auth: false,
  logout: null
}