import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import DashBoard from './components/Dashboard';
import Store from './components/Store';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


//------JOE ADDS-------
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
//-----------------------------------


export default class App extends Component {
//JOE ADDS START-------------------------------
  state = {
    name:"",
    password:"",
    loggedInUser:"",
    // url:"http://localhost:3002",
    url:"https://frozen-scrubland-02613.herokuapp.com/"
  }

  handleChange= event=>{
    const {name,value}=event.target;
    this.setState({
      [name]:value
    })
  };

  componentDidMount(){
    this.readSessions();
  }
  readSessions = ()=>{
    axios.get(`${this.state.url}/auth/readsessions`,{withCredentials:true}).then(res=>{
      console.log("Cookie", res.data)
      this.setState({loggedInUser:res.data.user})
    })
  }

  handleLoginFormSubmit = event=>{
    if(event){

      event.preventDefault();
    }
    axios.post(`${this.state.url}/auth/login`,{name:this.state.name,password:this.state.password},{withCredentials:true}).then(res=>{
      console.log(res.data,res.status)
      this.setState({
        name:"",
        password:"",
        loggedInUser:res.data.user
      });

    }).catch(err=>{
      console.log(err.response);
      this.setState({
        name:"",
        password:"",
        loggedInUser:""
      })
    })
  }

  handleSignupFormSubmit = event=>{
    event.preventDefault();
    axios.post(`${this.state.url}/auth/signup`,{name:this.state.name,password:this.state.password},{withCredentials:true}).then(res=>{
      console.log(res.data,res.status)
      this.handleLoginFormSubmit();
    }).catch(err=>{
      console.log(err.response);
    })
  }
  //JOE ADDS END---------------------------


  render(){
  return (
    <Router>
    <div className="App">
      
       <Route exact path="/" render={()=> <LoginForm name={this.state.name} password={this.state.password}handleChange={this.handleChange} handleLoginFormSubmit={this.handleLoginFormSubmit}/>}/>
       <Route exact path="/signup" render={()=><SignUpForm name={this.state.name} password={this.state.password}handleChange={this.handleChange} handleSignupFormSubmit={this.handleSignupFormSubmit}/>}/>
       <Route exact path="/dash" render={ ()=> 

      //  this.state.loggedInUser?(
          
      <Store>
      <DashBoard user={this.state.loggedInUser.name} />
      </Store>
        
     
       }/>
  
    </div>
    </Router>
  );
}
}
