import React from 'react'
import { useLocation } from 'react-router-dom';
import img from "../image/mvbg.jpg";
import "../css/Specific.css";
export default function Specific() {
  const location = useLocation();
  const item=location.state||{};
  const genreMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
};
  return (
    <div>
      {
        Object.keys(item).length !=0 ? 
        <div style={{background:`url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",width:"100%",height:"100vh"}}>
          <div className='head' >
              <img src={item.poster_path ? "https://image.tmdb.org/t/p/original"+item.poster_path: img} />
              <div className='det'>
                <h1>{item.title}</h1>
                <h2>{new Date(item.release_date).getFullYear() ? new Date(item.release_date).getFullYear():""}</h2>
                <div className='genres'>
                  {item.genre_ids ? item.genre_ids.map(items => <p id="genreUnit">{genreMap[items] || "Unknown"}</p>):""}
              </div>
              </div>
          </div>
        </div>:""
      }
      
    </div>
  )
}
