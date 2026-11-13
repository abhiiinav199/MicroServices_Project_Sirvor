import { Button, TextField, Typography } from "@mui/material";
import LogoAnimation from "../components/LogoAnimation";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false)

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };
  return (
    <div className="w-[80%] mx-auto mt-1 flex flex-row">
      {/* signup form */}
      <div className="flex flex-col gap-4 w-[50%]">
        <div>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
            <span>Forgot</span>{" "}
            <span className="text-yellow-400">Password</span>
          </Typography>
          <p className=" text-gray-200">
            Enter your email and we'll send you a otp to reset your password
          </p>
        </div>

        {/* forgot password form */}
        <form className="w-full mt-28 bg-white rounded-md px-2  py-6 text-black flex flex-col items-center justify-center gap-4">
          <TextField
            type="email"
            fullWidth
            variant="filled"
            placeholder="Email"
            size="medium"
            required
            name="email"
            value={email}
            onChange={onChangeEmail}
          ></TextField>
          <Button
            disabled={loading}
            type="submit"
            variant="contained"
            size="large"
            sx={{ textTransform: "none" }}
          >
            Log In
          </Button>
        </form>
      </div>
      {/* signup animation */}
      <div className="w-[50%] flex items-center justify-center mt-42">
        <LogoAnimation />
      </div>
    </div>
  );
};

export default ForgotPassword;
