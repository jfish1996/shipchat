import React, {useState, useEffect} from "react";
//for general style of MaterialUI
import { makeStyles } from "@material-ui/core/styles";
//for paper items--
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
//


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
// import App from '../App';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";

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
    alignItems: "center"
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
    border: "none",
    borderRadius: "15px",
    autoComplete: "true",
  },
  button: {
    width: "5%"
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
    alignItems: "center",
  },

}));

export default function Dashboard(props) {
  
  //front end
  const classes = useStyles();

  //importing all of the context to use within Dashbaord from store
  const {allChats, sendChatAction, enterChatRoomAction, user, addDirectMessageChat} = React.useContext(CTX);

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


  const history = useHistory();

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
    axios.get(
      "https://frozen-scrubland-02613.herokuapp.com/chat/users"
      // "http://localhost:3002/chat/users/"
      ).then(function(data){
      changeallUsers(data.data)
      console.log(allUsers)
    
    })
  }

  const logOut = () =>{
    axios.get(
      "https://frozen-scrubland-02613.herokuapp.com/auth/logout"
      // "http://localhost:3002/auth/logout"
      ).then(function(data){
      console.log(data)
      history.push("/")
    })

  }

  useEffect(() =>{

    findAllUsers();

  },[]);

  // const refreshOnce = () => {
  //   window.location.reload(false); 
  // }



 

  // const createDirectMessage = (userId, friendId, userName, friendName) => {
  //     axios.post('http://localhost:3002/chat/PersonalChannels', { userId, friendId, userName , friendName })
  //     .then(function(personalChannel) {
  //       // console.log(personalChannel)
  //       addDirectMessageChat(personalChannel.data)
  //     })
  // }


  return (
   
    <div>
      

        {/* Component to break 1 */}
      <Paper className={classes.root}>
      <Button onClick={() => {
        logOut()
      }}>Logout
      </Button>
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
              {/* {allChats.DirectMessages.map(personalTopic => {
                var otherUser = props.userId === personalTopic.id1 ? personalTopic.name2 : personalTopic.name1
                
                return <ListItem>
                 <ListItemText> {otherUser}</ListItemText>
                  </ListItem> */}
              {/* })} */}
            </List>
            {/* End of List Items */}
          </div>
            
            {/* Component to break 3 */}
          <div className={classes.chatWindow}>

            {
              //grab our all chats object with the value of our active topic 
              (activeTopic === "Users")? 
              
              allUsers.map((user,i) => (
               
               <div>
                 {/* onClick={() => createDirectMessage(props.userId, user.id, props.userName, user.name)} key={i} */}
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
                    <Typography variant='body1' gutterBottom>{chat.message}</Typography>
               </div>
            
            ))
            }
          </div>
        </div>
        {/* Componenet to break 4 */}
        <div className={classes.flexMessage}>
        
        <TextField
          // id="outlined-basic"
          className={classes.chatBox}
          // autoFocus="false"
          label="Send a message!"
          margin="normal"
          // disableUnderline="true"
          // variant="outlined"
          value={textValue}
          onChange={ event => changeTextValue(event.target.value)}
        />
       

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
