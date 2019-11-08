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
        { from: 'General Bot', msg:'Welcome to our Cruise!' },
       
    ],
    NightLife: [
        { from: 'Night Life Bot', msg:'Welcome to the Night Life Page!' },
       

    ],
    Families: [
        { from: 'Family Bot', msg:'Welcome Families!' }
    ],
    Outings: [
        { from: 'Outings Bot', msg:'Welcome to the Outings Page!' }
    ],
    PoolSide: [
        { from: 'Pool Side Bot', msg: 'Welcome to Pool Planning! Ask for reservations here!' }
    ],
    Singles: [
        { from:'Singles Bot', msg: 'Welcome Singles!' }
    ]

    // DirectMessages: []

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
        case 'CREATE_ROOM' :
            // state.DirectMessages.push(action.payload)
            console.log("action", action)
            return{
                ...state


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

function addDirectMessageChat(chatroom){
    console.log("This is chatroom data", chatroom)
    socket.emit("direct message room", chatroom)

}

export default function Store(props) {

    const [allChats, dispatch] = React.useReducer(reducer, initState)

    if(!socket) {
        socket = io(
            'http://localhost:3002'
            // "https://frozen-scrubland-02613.herokuapp.com/"
            )
        socket.on('chat message', function(msg){
            console.log("Message test ", msg)
           dispatch({ type: 'RECEIVE_MESSAGE', payload: msg });
    })
        socket.on('chatroom enter', function(chatroom){
            console.log("chatroom enter", chatroom)
            axios.get(
                // https://frozen-scrubland-02613.herokuapp.com/chat/allchannels/
                `http://localhost:3002/chat/allchannels/${chatroom}`
            )
            .then(function(results){
                console.log(results)
                dispatch({ type: 'FETCH_MESSAGES', payload: { [chatroom] : results.data } })
            })

        })
        socket.on('direct message room', function(chatroom){
            // console.log("dispath properly", chatroom)
            dispatch({ type: "CREATE_ROOM", payload: chatroom })
        })
}

//temporary
//---------------
//define user here
const user = props.user
///--------



    return (
        //values that are being passed to all childern nested with this component
        <CTX.Provider value={{allChats, sendChatAction, enterChatRoomAction, user, addDirectMessageChat}}>
            {props.children}
        </CTX.Provider>
    )
}