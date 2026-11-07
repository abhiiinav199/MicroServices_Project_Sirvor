import { useLocation } from "react-router-dom";
import LogoAnimation from "../components/LogoAnimation";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { Button } from "@mui/material";

const VerifyOtp = () => {
  const location = useLocation();
  const data = location.state;
  const [otp, setOtp] = useState("");
  console.log(data);
  return (
    <div className="w-[80%] mx-auto mt-1 flex flex-row h-[calc(100vh-60px)] items-center justify-center">
      {/* signup form */}
      <div className="w-[50%] flex flex-col gap-4">

        <div className="flex flex-col justify-center items-center">
          <p className="font-semibold text-2xl mb-2">We sent you a code.</p>
          <p className="font-semibold">Please enter it below to verify your email</p>
          <p className="tex-blue-700">{data?.email}</p>
        </div>

        <div className="flex flex-col gap-1 justify-center items-center">

            <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props}
          className="w-20 h-12 text-4xl text-center border bg-gray-600 border-gray-400 rounded-md" />}
        />
        <Button variant="contained" sx={{marginTop: "32px", width:"400px", textTransform:"none"}} size="large" >Verify Otp</Button>

        </div>
        

        <div className="flex flex-col gap-1 justify-center items-center">
            <p>Don't get the code ?</p>
            <p>Resend Code</p>
        </div>
      </div>
      {/* signup animation */}
      <div className="w-[50%] flex items-center justify-center">
        <LogoAnimation />
      </div>
    </div>
  );
};

export default VerifyOtp;
