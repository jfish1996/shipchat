import React, {useState, useEffect} from "react";
//for general style of MaterialUI
import { makeStyles } from "@material-ui/core/styles";
//for paper items--
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
//
// import { createMuiTheme } from 'material-ui/styles';
import Icon from '@material-ui/core/Icon';

import { spacing } from '@material-ui/system';

//for card items//
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

//for list items--
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
//

//for user icon in chat window--
import Chip from '@material-ui/core/Chip';
//

//for buttons---
import Button from '@material-ui/core/Button';
//

//for textFeild--
import TextField from '@material-ui/core/TextField';
//

import {CTX} from './Store';
import App from '../App';
import axios from 'axios';

import { whileStatement } from "@babel/types";
import { fontWeight, fontSize } from "@material-ui/system";



//where we can assign css values
const useStyles = makeStyles(theme => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2),
    backgroundColor: "#00000060",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    marginTop: '1em',
  },
  topicsWindow: {
    width: "30%",
    height: "350px",
    borderRight: "3px solid white",
    overflow:"auto"
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px",
    overflow: "auto"
  },
  chatBox: {
    width: "60%",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderBottom: "none",
    borderRadius: "15px",
    autoComplete: "true",
    padding: "3px 0 6px", 
  },
  chatMessage: {
    marginTop: "auto",
		marginBottom: "auto",
		marginLeft: "10px",
		borderRadius: "25px",
		backgroundColor: "#82ccdd",
		padding: "8px",
		position: "relative",
  },
  button: {
    width: "5%",
    backgroundColor: "rgba(0,0,0,0.3)",
    "&:hover": {
      color: "black",
      background: "rgba(0,0,0,0.3)"
    },
    borderRadius: "15px",
    
  },
  card: {
    minWidth: 200,
  },
  colorPrimary: {
    color: "white",
    fontFamily: "Poiret One",
    fontWeight: "bold",
   
  },
  flexMessage: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "baseline",
  },
  underline: {
  '&:before': {
    borderBottom:"none",
  
  },
  '&:after': {
    borderBottom:"none",
  },
  '&:hover:before': {
    borderBottom: ["none", '!important'],
    
  },
},

  marginLeft: {
    marginLeft: "20%",
  }



}));

export default function Dashboard(props) {
  
  //front end
  const classes = useStyles();

  //importing all of the context to use within Dashbaord from store
  const {allChats, sendChatAction, enterChatRoomAction, user} = React.useContext(CTX);

  console.log({allChats});

  //pulls off all of the keys from the all chats Object -----------------important
  const topics = Object.keys(allChats);
//---------------------------------
  //setting the state value of active topic 
  const [activeTopic, changeActiveTopic] = React.useState(topics[0])
//setting the state value of textValue
  const [textValue, changeTextValue] = React.useState('')
//setting the state value of an all users array
  const [allUsers, changeallUsers] = useState([]);

  //essentially componenet did mount, any time the page load, and or the active topic changes, this will run
  useEffect(() =>{
    //grabbing all of the data via our enterChatRoomAction
    enterChatRoomAction(activeTopic)
  },[activeTopic])

  //this function is what handles the on click of a topic(and or channel)
  const handleSelecTopic = (topic)=>{

    changeActiveTopic(topic)
  }
  const findAllUsers = () =>{
    axios.get("https://frozen-scrubland-02613.herokuapp.com/chat/users").then(function(data){
      changeallUsers(data.data)
      console.log(allUsers)
    })
  }
  useEffect(() =>{
    findAllUsers();
  },[]);
  return (
   
    <div>
      {(activeTopic == "Users")? console.log("yay"): console.log("nope")}
        {/* Component to break 1 */}
      <Paper className={classes.root}>
      <Typography className={classes.colorPrimary}>Welcome {props.user}</Typography>
        <Typography variant="h4" component="h4" className={classes.colorPrimary}>
          Sea Cruiser
        </Typography>
        
        <Typography variant="h5" component="h5">
          {activeTopic}
        </Typography>
        {/* Componenet to break 2 */}
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            {/* List Items */}
            <List>
              <div>Channels</div>
              {topics.map(topic => (
                // on click of a list item ie a topic grab the inner text of this list item and set it as the active topic 
                <ListItem onClick={event => handleSelecTopic(event.target.innerText) } key={topic} button>
                  {/* change active topic to handleSelectTopic */}
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
            <List>
              <div>Direct Messages</div>
            </List>
            {/* End of List Items */}
          </div>
            
            {/* Component to break 3 */}
          <div className={classes.chatWindow}>

            {
              //grab our all chats object with the value of our active topic 
              (activeTopic == "Users")? 
              
              allUsers.map((user,i) => (
               
               <div onClick={console.log("clicked")} key={i}>
                 <br></br>
                <Card className={classes.card} >
                <CardContent>
                {user.name}
                </CardContent>
                </Card>
                </div>
              ))
              : 
                allChats[activeTopic].map((chat, i) => (
                  //map over each chat
               <div className={classes.flex} key={i}>
                 {/* display who its from */}
                   <Chip label={chat.user} variant="outlined" />
                   {/* Display the message */}
                    <Typography variant='body1' className={classes.chatMessage} gutterBottom>{chat.message}</Typography>
               </div>
            
            ))
            }
          </div>
        </div>
        {/* Componenet to break 4 */}
        <div className={classes.flexMessage} >
        
        <TextField
          // id="outlined-basic"
          className={ classes.chatBox }
          // autoFocus="false"
          // label="Send a message!"
          InputProps={{classes: {underline: classes.underline}}}
          placeholder="Send a message!"
          margin="normal"
          variant="standard"
          
          value={textValue}
          onChange={ event => changeTextValue(event.target.value)}
        />
       {/* <Icon classes={{root: classes.iconRoot}}>
        <img className={classes.imageIcon} href="https://material.io/resources/icons/?search=send?style=baseline"/>
        </Icon> */}

        <Button 
        variant="contained" 
        color="primary" 
        className={classes.button}
        onClick={() => {
          //this is where we are sending out data, this is how the object will look
            sendChatAction({user, message: textValue, topic: activeTopic})
            changeTextValue('');
        }
            }
        >
                Send
        </Button>

            </div>

      </Paper>
    </div>
  );
}
