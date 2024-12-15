import React, { useState } from 'react'
import "../css/Dash.css"

import Movie from '../components/Movie';
const blink = "http://localhost:3144"

export default function Dash() {
    const [txt,settxt]=useState("");
    const [data,setdata]=useState({});
    const changeSearch=(e)=>{
        settxt(e.target.value);
    }
    const sendData=async()=>{
        try{
            const data1 = await fetch(blink+"/api/getMovie",{
              method: "POST",
              headers:{
                "Content-Type":"application/json"// a post request to backend via /api/getMovie link
              },
              body: JSON.stringify({
                search: txt
              })
            })
            const resp = await data1.json();
            
            if(resp.success){
            
              setdata(resp.data);
            }else{
              alert(resp.message);
            }
            
          }catch(e){
            console.log(e);
          }
    }
  return (
    <div>
        <div className='inps'>
            <input type='text' placeholder='Search any Movie...' value={txt} onChange={changeSearch}></input>
            <button id="btn" onClick={sendData}>🔍 Search</button>
        </div>
        <div className='movie'>

            {data.results ? 
            data.results.map(item => <Movie link={item.poster_path!=null ? `https://image.tmdb.org/t/p/original${item.poster_path}`:"none"} name={item.title} year={item.release_date} genre={item.genre_ids} id={item.id}/>)
            :""}
        </div>
        
    </div>
  )
}
