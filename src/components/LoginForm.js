// import React from 'react'

// export default function LoginForm(props) {
//     return (
//         <div>
//             <h3>Login</h3>
//             <form>
//                 <input name="name" value={props.name} onChange={props.handleChange} />
//                 <input name="password" value={props.password} type="password" onChange={props.handleChange} />
//                 <input type="submit" onClick={props.handleLoginFormSubmit} />
//             </form>
//         </div>
//     )
// }

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { palette } from '@material-ui/system';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import pink from '@material-ui/core/colors/pink';
import teal from '@material-ui/core/colors/teal';
import cyan from  '@material-ui/core/colors/cyan';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";


const primary = pink[500]; // #F44336
const secondary = teal[700]; // #E040FB
const accent = cyan[200]; // #E040FB (alternative method)


function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        SeaCruiser
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const MyTypography = withStyles({
  root: {
    color: '#FF8E53', //#FF8E53
    fontFamily:'sans-serif',
  },
  label: {
    textTransform: 'capitalize',
    fontFamily:'sans-serif',

  },
})(Typography);



const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },

  palette:{
  primary:'#FE6B8B',
  secondary: '#FE6B8B',
  accent:'#FE6B8B',
  },



  image: {
    backgroundImage: 'url(https://i.ibb.co/yszc3zC/waveslogin.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    
  },
  paper: {
    // margin: theme.spacing(8, 4),
    height: '100vh',
    paddingTop: '15vh',
    backgroundColor: '#fffde0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    

  },


  avatar: {
    margin: theme.spacing(1),
    color: '#FF7EB4',
  },

  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),

    color: theme.palette.secondary.main,
  },


  submit: {
    margin: theme.spacing(3, 0, 2),
    background: ''
  },

  container:{
    backgroundColor: theme.palette.secondary.main,

  }
}));

export default function LoginForm(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <DirectionsBoatIcon className={classes.avatar}>
            {/* <DirectionsBoatIcon /> */}
          </DirectionsBoatIcon>
          <MyTypography component="h1" variant="h5">
            Login
          </MyTypography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="name"
              name="name"
              autoFocus
              value={props.name}
              onChange={props.handleChange}

            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              value={props.password}
              onChange={props.handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event) => {
                props.handleLoginFormSubmit(event);
                history.push("/dash")
               }}
            >
              Sign In
              
            </StyledButton>

            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
      
                history.push("/signup")
               }}
            >
              Sign Up
              
            </StyledButton>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
