import React, { useState } from 'react'
import { useEffect } from 'react';
import "../css/Watchlist.css"
import Movie from "../components/Movie";
const blink = "http://localhost:3144"
export default function WatchList() {
     const [data, setdata] = useState([]);
     const [nots,setnots] = useState([]);
     const check = async (k, arr,data) => {
          try {
               const datas = await fetch(blink + "/api/getRLdata", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                         k: k,
                         arr: arr,
                         email: localStorage.getItem("email")
                    })
               });
               const resp = await datas.json();
               if (resp.success) {
                    if (k == 2) {
                         for(let l=0;l<resp.arr.length;l++){
                              if(resp.arr[l]){
                                   const movie=data.find((item)=>item.movie_id==arr[l]);
                                   
                                   if(Object.keys(movie).length!=0){
                                        console.log(movie.name)
                                        setnots(prev => [...prev,movie.name+" is now streaming in OTT"]);
                                   }
                              }
                         }
                    } else {
                         for(let l=0;l<resp.arr.length;l++){
                              if(resp.arr[l]){
                                   const movie=data.find((item)=> item.movie_id==arr[l]);
                                   if(Object.keys(movie).length!=0){
                                        console.log(movie.name)
                                        setnots(prev => [...prev,movie.name+" is now released to theatres"]);
                                   }
                              }
                         }
                    }
               } else {
                    alert("Sorry,Unable to fetch data")
               }
          } catch (e) {
               console.log(e);
          }
     }
     const getdata = async () => {
          try {
               const data = await fetch(blink + "/api/getWLdata", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                         email: localStorage.getItem("email")
                    })
               });
               const resp = await data.json();
               if (resp.success) {
                    setdata(resp.data);
                    const ottArray = [];
                    const theatreArray = [];
                    resp.data.forEach(item => {
                         if (!(item.ott)) ottArray.push(item.movie_id);
                         if (!(item.theatre)) theatreArray.push(item.movie_id);
                    });
                    check(2, ottArray,resp.data);
                    check(1, theatreArray,resp.data);
               } else {
                    alert("Sorry,Unable to process your request")
               }
          } catch (e) {
               console.log(e);
          }
     }
     useState(() => {
          getdata();
     }, [])
     useEffect(() => {
          if (nots.length > 0) {
            const intervalId = setInterval(() => {
              const newNots = [...nots];
              newNots.pop();
              setnots(newNots);
            }, 8000);
            return () => clearInterval(intervalId);
          }
        }, [nots]);// handles notfications
     
     return (
          <div>
               <h1>Watchlist</h1>
               <div className='wlmovies'>
                    {data.length > 0 ?
                         data.map((item) => {
                              return (
                                   <Movie
                                        link={item.path != null ? `https://image.tmdb.org/t/p/original${item.path}` : "none"}
                                        name={item.name}
                                        year={item.year}
                                        genre={JSON.parse(item.genre).map(obj => obj.id)}
                                        id={item.movie_id}
                                   />

                              );
                         })
                         : <h1>No Movies added to Watchlist</h1>
                    }
               </div>
               <div className='notify'>
                    {nots && nots.length>0 ? <h1 className='ott'>{nots[nots.length-1]}</h1>:""}
               </div>
               <div>

               </div>
          </div>
     )
}
