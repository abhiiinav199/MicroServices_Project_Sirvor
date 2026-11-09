import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { loginUserApiCall } from "../services/Login";

const LoginForm = () => {
  const [formData, setformData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setshowPassword] = useState(true);
  const navigate= useNavigate()

 

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (formData.password.length < 3) {
      toast.error(
        "Password is too short, Please provide at least 3 characters.",
      );
      return setLoading(false) ;
    }
    
    
    const toastId = toast.loading("Login...");
    try {
      const res = await loginUserApiCall(formData);
      if (res?.success) {
        toast.success(res?.message);
      }
      navigate("/")

      toast.dismiss(toastId);
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      if(axios.isAxiosError(error)){
        toast.error(error?.response?.data?.message)
        toast.dismiss(toastId)
      }else{
        toast.error("Something went wrong")
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-md p-2 text-black flex flex-col items-center justify-center gap-4">
      <form onSubmit={submitHandler} className="flex flex-col gap-2  w-full">
      
        <TextField
          type="email"
          fullWidth
          variant="filled"
          placeholder="Email"
          size="medium"
          required
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
        ></TextField>

       <div className="flex flex-col mb-6">
 <TextField
          type={showPassword ? "password" : "text"}
          fullWidth
          variant="filled"
          placeholder="Password"
          size="medium"
          required
          name="password"
          value={formData.password}
          onChange={onChangeHandler}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showPassword ? (
                  <FaRegEyeSlash onClick={()=> setshowPassword(false)} className="cursor-pointer" />
                ) : (
                  <FaEye onClick={() => setshowPassword(true)} className="cursor-pointer" />
                )}
              </InputAdornment>
            ),
          }}
        ></TextField>

        <Link to={"/forgot-password"} className="self-end text-blue-700">Forgot password</Link>
       </div>
       
        <Button
          disabled={loading}
          type="submit"
          variant="contained"
          size="large"
          sx={{ textTransform: "none" }}
        >
          Log In
        </Button>

        <div className="flex flex-row items-center gap-2">
          <p>Don't have an account? </p>
          <Link className="text-red-700 font-extrabold" to={"/signup"}>
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm ;
