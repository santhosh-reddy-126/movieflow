import express from "express";
const router = express.Router();
import { createClient } from "@supabase/supabase-js";



const supabaseUrl = "https://ybnkyixugojfqjlssrvi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlibmt5aXh1Z29qZnFqbHNzcnZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2ODQ5NjMsImV4cCI6MjA0NzI2MDk2M30._mqawcOHTawwkQFiPn_l4YtU3CsykFvhB4JwdxV1dCk";
const supabase = createClient(supabaseUrl, supabaseKey);
const options = {
     method: 'GET',
     headers: {
       accept: 'application/json',
       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTcyYWVkNzU5YTA4Yzg3NzkzM2FlMzMxYmZjZTNkMiIsIm5iZiI6MTczMTEyMzMwNS43MDUsInN1YiI6IjY3MmVkODY5OWZkZGU4YzRiODhiY2E4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gWrxgrIbl2zG3D4Xd3Ea_VTPrmW4BW5RRe4tZtu2AKg'
     }
};

router.post("/modifyWL",async(req,res)=>{
     try{
          let data="",error="";
          if(req.body.status===true){
               ({data,error} = await supabase.from("watchlists").delete().eq("movie_id",req.body.id).eq("email",req.body.email));
               if(error){
                    throw error;
               }
               res.send({success: true});
          }else if(req.body.status===false){
               
               ({data,error} = await supabase.from("watchlists").insert([{"movie_id":req.body.id,"email":req.body.email,"status":"Planned","name":req.body.name,"year":req.body.year,"genre":req.body.genre,"path":req.body.path,"ott":req.body.ott,"theatre":req.body.theatre}]));
               if(error){
                    throw error;
               }
               res.send({success: true});
          }else{
               res.send({success: false});
          }
          
     }catch(e){
          console.log(e);
          res.send({success: false});
     }
})

router.post("/getWLdata",async(req,res)=>{
     try{
          const {data,error} = await supabase.from("watchlists").select("*").eq("email",req.body.email);
          if(error){
               throw error;
          }
          res.send({success: true,data: data});
     }catch(e){
          console.log(e);
          res.send({success: false});
     }
})


router.post("/updateStatus",async(req,res)=>{
     try{
          const {data,error} = await supabase.from("watchlists").update({"status":req.body.status==1 ? "Watching":req.body.status==0 ? "Planned":"Watched","Day":req.body.day,"Session":req.body.sess}).eq("email",req.body.email).eq("movie_id",req.body.id);
          if(error){
               throw error;
          }
          res.send({success: true});
     }catch(e){
          console.log(e);
          res.send({success: false,message:"Unable to process"});
     }
})

const fetchMovieData = async(mvid,k,email)=>{
     const url = `https://api.themoviedb.org/3/movie/${mvid}?append_to_response=watch%2Fproviders&language=en-US`;
     const response = await fetch(url, options);
     const datas = await response.json();
     if(k==1){
          if(new Date(datas.release_date)<=new Date()){
               const {data,error} = await supabase.from("watchlists").update({"theatre":true}).eq("email",email).eq("movie_id",mvid);
               if(error){
                    throw error;
               }
          }
          return new Date(datas.release_date)<=new Date();
     }else{
          if(datas["watch/providers"] ? Object.keys(datas["watch/providers"].results).length>0: false){
               const {data,error} = await supabase.from("watchlists").update({"ott":true}).eq("email",email).eq("movie_id",mvid);
               if(error){
                    throw error;
               }
          }
          return datas["watch/providers"] ? Object.keys(datas["watch/providers"].results).length>0: false;
     }
}

router.post("/getRLdata",async(req,res)=>{
     try{
          const requests = req.body.arr.map(id => fetchMovieData(id,req.body.k,req.body.email));
          const moviesData = await Promise.all(requests);
          let ans=[];
          moviesData.forEach(movie => {
               ans.push(movie);
          });
          res.send({success: true,arr: ans})
     }catch(e){
          console.log(e);
     }
});


router.post("/addMemory",async(req,res)=>{
     try{
          const {data,error}= await supabase.from("watchlists").select("memories").eq("email",req.body.email).eq("movie_id",req.body.id);
          if(error){
               throw error;
          }
          if(data[0].memories==""){
               const {data2,error2} = await supabase.from("watchlists").update({"memories":req.body.mem}).eq("email",req.body.email).eq("movie_id",req.body.id);
               if(error2){
                    throw error2;
               }
               res.send({success: true});
               return;
          }
          const arr = data[0].memories.split(",");
          arr.push(req.body.mem);
          const {data2,error2} = await supabase.from("watchlists").update({"memories":arr.join(",")}).eq("email",req.body.email).eq("movie_id",req.body.id);
          if(error2){
               throw error2;
          }
          res.send({success: true});
     }catch(e){
          console.log(e);
          res.send({success: false});
     }
})


router.post("/delMemory",async(req,res)=>{
     try{
          const {data,error}= await supabase.from("watchlists").select("memories").eq("email",req.body.email).eq("movie_id",req.body.id);
          if(error){
               throw error;
          }
          const arr = data[0].memories.split(",");
          arr.splice(req.body.memid,1);
          const {data2,error2} = await supabase.from("watchlists").update({"memories":arr.join(",")}).eq("email",req.body.email).eq("movie_id",req.body.id);
          if(error2){
               throw error2;
          }
          res.send({success: true});
     }catch(e){
          console.log(e);
          res.send({success: false});
     }
})
export default router;
