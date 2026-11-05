import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const [formData, setformData] = useState({
    fullName:"",
    email:"",
    password:"",
    confirmPassword:"",
    role:"User"

  })

  const setRoleHandler= (data: string)=>{
    setformData((prev)=>{return {...prev, role: data}})
  }

  const onChangeHandler = (e : React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value}= e.target
    console.log(`${name} feild mei ${value}`)
    setformData((prev) => {return{...prev , [name]:value}})
  }


    const submitHandler = async(e: React.FormEvent)=>{
      e.preventDefault()
      toast.success("Form Submitted")
      console.log(formData)
      try {
        if(formData.password.length < 3){
          toast.error("Password is too short, Please provide at least 3 characters.")
          return
        }

        if(formData.password !== formData.confirmPassword){
          toast.error("Password and confirm password does not match")
        }
      } catch (error) {
        toast.error(error)
      }
    }
  return (

    <div className="w-full bg-white rounded-md p-2 text-black flex flex-col items-center justify-center gap-4">

    <form onSubmit={submitHandler} className="flex flex-col gap-2  w-full">
      <TextField
        fullWidth
        variant="filled"
        placeholder="Full Name"
        size="medium"
        required
        name="fullName"
        value={formData.fullName}
        onChange={onChangeHandler}
      ></TextField>
      <TextField
        fullWidth
        variant="filled"
        placeholder="Email"
        size="medium"
        required
        name="email"
        value={formData.email}
        onChange={onChangeHandler}
      ></TextField>
      <TextField
        fullWidth
        variant="filled"
        placeholder="Password"
        size="medium"
        required
        name="password"
        value={formData.password}
        onChange={onChangeHandler}
      ></TextField>
      <TextField
        fullWidth
        variant="filled"
        placeholder="Confirm Password"
        size="medium"
        required
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={onChangeHandler}
      ></TextField>

      <div className="bg-gray-600 flex flex-row gap-2 w-fit px-6 py-2 rounded-full ">
       <p
  onClick={() => setRoleHandler("User")}
  className={`px-6 py-2 rounded-full cursor-pointer ${
    formData.role === "User"
      ? "bg-gray-100"
      : ""
  }`}
>
  User
</p>
        <p onClick={()=>setRoleHandler("Worker")} className={`px-6 py-2 rounded-full cursor-pointer ${
    formData.role === "Worker"
      ? "bg-gray-100"
      : ""
  }`}>Worker</p>
      </div>
      <Button type="submit" variant="contained"size="large">Sign Up</Button>

      <div className="flex flex-row items-center gap-2">
        <p>Already have an account? </p>
        <Link className="text-red-700 font-extrabold" to={"/login"}>Sign In</Link>
      </div>
    </form>

    </div>
  );
};

export default SignUpForm;
