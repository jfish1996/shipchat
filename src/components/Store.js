import React from 'react';
import io from 'socket.io-client'
import axios from 'axios';

//provides a way to pass data through the componenet tree without using props. 
export const CTX = React.createContext();


// chat will come in like
//from: 'user'
//msg: 'hi'
//topic: 'general'

const initState = {
    //topic or catagory 
    Users:[],

    General: [
        //messages in those catagoires 
        {from: 'General Bot', msg:'Welcome to our Cruise!'},
       
    ],
    NightLife: [
        {from: 'Night Life Bot', msg:'Welcome to the Night Life Page!'},
       

    ],
    Families: [
        {from: 'Family Bot', msg:'Welcome Families!'}
    ],
    Outings: [
        {from: 'Outings Bot', msg:'Welcome to the Outings Page!'}
    ]


}

//action is an object that we pass in
//this state is whtever the current state is 
const reducer = (state, action) => {

    //destruct to make more clean 
    switch(action.type){
        case 'RECEIVE_MESSAGE':
            const {user, message, topic} = action.payload;
            return {
                //bring in our entire state
                ...state,
                //then overwrite the old state with the new object in front
                [topic]: 
                [
                    //then bring forward all old messages in the topic
                ...state[topic], {user, message}
                ]
            }
        case 'FETCH_MESSAGES' :
            return{
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

let socket;

//this is our funnction to emit something
function sendChatAction(value){

     socket.emit("chat message", value) 
}

//this is out function to handle what happens when we enter a chatroom
function enterChatRoomAction(value){
    
    socket.emit("chatroom enter", value)
}

export default function Store(props) {

    const [allChats, dispatch] = React.useReducer(reducer, initState)

    if(!socket) {
        socket = io(
            // 'http://localhost:3002'
            "https://frozen-scrubland-02613.herokuapp.com/"
            )
        socket.on('chat message', function(msg){
            console.log("Message test ", msg)
           dispatch({ type: 'RECEIVE_MESSAGE', payload: msg });
    })
        socket.on('chatroom enter', function(chatroom){
            console.log("chatroom enter", chatroom)
            axios.get(`https://frozen-scrubland-02613.herokuapp.com/chat/allchannels/${chatroom}`)
            .then(function(results){
                console.log(results)
                dispatch({ type: 'FETCH_MESSAGES', payload: { [chatroom] : results.data } })
            })

        })
}

//temporary
//---------------
//define user here
const user = 'John' + Math.random(100).toFixed(2);

///--------



    return (
        //values that are being passed to all childern nested with this component
        <CTX.Provider value={{allChats, sendChatAction, enterChatRoomAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}