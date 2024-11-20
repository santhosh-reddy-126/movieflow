import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ybnkyixugojfqjlssrvi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlibmt5aXh1Z29qZnFqbHNzcnZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2ODQ5NjMsImV4cCI6MjA0NzI2MDk2M30._mqawcOHTawwkQFiPn_l4YtU3CsykFvhB4JwdxV1dCk";
const supabase = createClient(supabaseUrl, supabaseKey);

router.post("/login", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("password")
      .eq("email", req.body.email); //get user password where email matches
    if(data.length===0){
        return res.send({success:false,message:"User doesnt exist"});// if user email doesnt match we directly return and show user doesnt exist
    }
    if (error) {
      throw error;
    }
    const pwdcompare = await bcrypt.compare(req.body.password, data[0].password);// it compares our text pass with actual hashed password
    if (pwdcompare) {
      // if both password matches , send success as true
      res.send({ success: true });
    } else {
      res.send({ success: false, message: "Wrong Password!" }); // sending success as false , as password is wrong
    }
  } catch (e) {
    console.log("Error logging in: ", e);
    res.send({ success: false, message: "Something went wrong" });
  }
});
async function checkUser(a){// checks whether an email exists in
    try {
      const { data, error } = await supabase.from("users").select("*").eq("email",a);
      console.log(data.length);
      if(data.length>0){
        return true;
      }else{
        return false;
      }
    } catch (e) {
      console.log("Error logging in: ", e);
    }
  }
router.post("/signup", async (req, res) => {
  if (req.body.password === req.body.cpassword) {
    const salt = await bcrypt.genSalt(10);
    let secpass = await bcrypt.hash(req.body.password, salt); // getting hashed password
    try {
        if(checkUser(req.body.email)===true){// if already email is used, we return saying already email exists

           return res.send({success: false,message:"Already this email exists"});
        }

        
      const { data, error } = await supabase.from("users").insert([
        {
          email: req.body.email,
          password: secpass,
        },
      ]); //inserting email and password(hashed one) into database
      
      if (error) {
        throw error;
      }
      res.send({ success: true });
    } catch (e) {
      console.log("Error logging in: ", e);
      res.send({ success: false, message: "Something went wrong" });
    }
  } else {
    res.send({ success: false, message: "Passwords do not match" });// if pass do not match we send message passwords do not match
  }
});

export default router;
