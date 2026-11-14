import { useLocation } from "react-router-dom";
import LogoAnimation from "../components/LogoAnimation";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { signUpApiCall, signUpMailSendApiCall } from "../services/Signup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../authSlice";

const ForgotPasswordOtpVerify = () => {
  const location = useLocation();
  const data = location.state;
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const dipatch = useDispatch()

  


  const signUpHandler = async () => {
    if (!otp) {
      toast.error("Please fill the otp.");
    }

    if (otp.length < 4) {
      toast.error("Please fill the 4 digits valid otp.");
    }
    const signUpData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: data.role,
      confirmPassword: data.confirmPassword,
      otp: otp,
    };
    const toastId = toast.loading("Verifying otp...");

    try {
      setLoading(true);
      const res = await signUpApiCall(signUpData);
      if (res.success) {
        dipatch(setToken(res.data.accessToken))
        toast.success(res.message);
        setLoading(false)
        toast.dismiss(toastId);
      }
      console.log("data", res);
      
     
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      if(axios.isAxiosError(error)){
        toast.error(error?.response?.data?.message)
      }else{
        toast.error("Something went wrong")
      }
    } finally {
      setLoading(false);
    }
  };

  const resendOtpHandler= async ()=>{
    const toastId = toast.loading("Sending otp...")
       try {
      const res = await signUpMailSendApiCall(data);
      if (res?.success) {
        toast.success(res?.message);
        toast.dismiss(toastId);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      if(axios.isAxiosError(error)){
        toast.error(error?.response?.data?.message)
      }else{
        toast.error("Something went wrong")
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-[80%] mx-auto mt-1 flex flex-row h-[calc(100vh-60px)] items-center justify-center">
      {/* signup form */}
      <div className="w-[50%] flex flex-col gap-4">
        <div className="flex flex-col justify-center items-center">
          <p className="font-semibold text-2xl mb-2">We sent you a code.</p>
          <p className="font-semibold">
            Please enter it below to verify your email
          </p>
          <p className="tex-blue-700">{data?.email}</p>
        </div>

        <div className="flex flex-col gap-1 justify-center items-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => (
              <input
                {...props}
                className="w-20 h-12 text-4xl text-center border bg-gray-600 border-gray-400 rounded-md"
              />
            )}
          />
          <Button
          disabled={loading}
            onClick={signUpHandler}
            variant="contained"
            sx={{ marginTop: "32px", width: "400px", textTransform: "none" }}
            size="large"
          >
            Verify Otp
          </Button>
        </div>

        <div className="flex flex-col gap-1 justify-center items-center">
          <p>Don't get the code ?</p>
          <p className=" underline cursor-pointer" onClick={resendOtpHandler}>Resend Code</p>
        </div>
      </div>
      {/* signup animation */}
      <div className="w-[50%] flex items-center justify-center">
        <LogoAnimation />
      </div>
    </div>
  );
};

export default ForgotPasswordOtpVerify;
