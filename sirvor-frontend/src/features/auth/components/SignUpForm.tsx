import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { signUpMailSendApiCall } from "../services/Signup";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";

const SignUpForm = () => {
  const [formData, setformData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setshowPassword] = useState(true);
  const [showConfirmPassword, setshowConfirmPassword] = useState(true)
  const navigate= useNavigate()

  const setRoleHandler = (data: string) => {
    setformData((prev) => {
      return { ...prev, role: data };
    });
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`${name} feild mei ${value}`);
    setformData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Sending mail...");

    if (formData.password.length < 3) {
      toast.error(
        "Password is too short, Please provide at least 3 characters.",
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and confirm password does not match");
      return;
    }
    try {
      const res = await signUpMailSendApiCall(formData);
      if (res.success) {
        toast.success("Signup mail sent");
      }
      navigate("/verify-otp",{
        state: formData
      })

      toast.dismiss(toastId);
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-md p-2 text-black flex flex-col items-center justify-center gap-4">
      <form onSubmit={submitHandler} className="flex flex-col gap-2  w-full">
        <TextField
          type="text"
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
        <TextField
          type={showConfirmPassword ? "password": "text"}
          fullWidth
          variant="filled"
          placeholder="Confirm Password"
          size="medium"
          required
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={onChangeHandler}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showConfirmPassword ? (
                  <FaRegEyeSlash onClick={() =>setshowConfirmPassword(false)} className="cursor-pointer" />
                ) : (
                  <FaEye onClick={() =>setshowConfirmPassword(true)} className="cursor-pointer" />
                )}
              </InputAdornment>
            ),
          }}
        ></TextField>

        <div className="bg-gray-600 flex flex-row gap-2 w-fit px-6 py-2 rounded-full ">
          <p
            onClick={() => setRoleHandler("User")}
            className={`px-6 py-2 rounded-full cursor-pointer ${
              formData.role === "User" ? "bg-gray-100" : ""
            }`}
          >
            User
          </p>
          <p
            onClick={() => setRoleHandler("Worker")}
            className={`px-6 py-2 rounded-full cursor-pointer ${
              formData.role === "Worker" ? "bg-gray-100" : ""
            }`}
          >
            Worker
          </p>
        </div>
        <Button
          disabled={loading}
          type="submit"
          variant="contained"
          size="large"
          sx={{ textTransform: "none" }}
        >
          Sign Up
        </Button>

        <div className="flex flex-row items-center gap-2">
          <p>Already have an account? </p>
          <Link className="text-red-700 font-extrabold" to={"/login"}>
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
