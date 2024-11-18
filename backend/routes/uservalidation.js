import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ybnkyixugojfqjlssrvi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlibmt5aXh1Z29qZnFqbHNzcnZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2ODQ5NjMsImV4cCI6MjA0NzI2MDk2M30._mqawcOHTawwkQFiPn_l4YtU3CsykFvhB4JwdxV1dCk";
const supabase = createClient(supabaseUrl, supabaseKey);

router.post("/login",async(req,res)=>{
    try{
        const {data,error} = await supabase.from("user").select("password").eq("email",req.body.email);//get user password where email matches
        if(error){
            throw(error);
        }
        //const pwdcompare = await bcrypt.compare(req.body.pass, data[0].password);
        if(data[0].password===req.body.password){// if both password matches , send success as true
            res.send({success: true});
        }else{
            res.send({success: false});// sending success as false , as password is wrong
        }
    }catch(e){
        console.log("Error logging in: ",e);
    }
})

export default router;
