import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
const blink = "http://localhost:3144"
export default function Login() {
  const nav = useNavigate();
  const [data,setdata]=useState({
    email: "",
    password: ""
  })
  const handleChange=(e)=>{
    setdata({...data,[e.target.name]:e.target.value});// on typing on input field it will update based on name of input field
  }
  const sendData=async()=>{
    try{
      const data1 = await fetch(blink+"/api/login",{
        method: "POST",
        headers:{
          "Content-Type":"application/json"// a post request to backend via /api/login link
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password 
        })
      })
      const resp = await data1.json();
      if(resp.success){
        nav("/home");// if we get success as true from backend, we can move on to home page
      }else{
        alert("try again");
      }
    }catch(e){
      console.log(e);
    }
  }
  return (
    <div>
      <Nav />
      <div className="Login">
        <div className="Form">
          <h1>Log In to Your MovieFlow Account</h1>
          <input type="email" name="email" placeholder="Email" autoComplete="off" value={data.email} onChange={handleChange}/>
          <input type="password" name="password" placeholder="Password" value={data.password} onChange={handleChange}/>
          <button onClick={sendData}>Login</button>
          <p>New to MovieFlow?<span>Sign up</span></p>
        </div>
      </div>

      <div className="footer">
        <p>&copy; 2024 MovieFlow. All rights reserved. | Powered by TMDb.</p>
      </div>
    </div>
  );
}
