import { useLocation } from "react-router-dom";
import LogoAnimation from "../components/LogoAnimation";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { forgotPasswordOtpApiCall } from "../services/Password";
import axios from "axios";

const ForgotPasswordOtpVerify = () => {
  const location = useLocation();
  const {email} = location.state;
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  // const dipatch = useDispatch()

  


  const forgotPasswordOtpHandler = async () => {
    if (!otp) {
      toast.error("Please fill the otp.");
    }

    if (otp.length < 4) {
      toast.error("Please fill the 4 digits valid otp.");
    }
    
    const toastId = toast.loading("Verifying otp...");

    try {
      setLoading(true)
      const res= await forgotPasswordOtpApiCall({
        email: email, otp: otp
      })
      if(res?.success){
        setLoading
        (false)
        toast.dismiss(toastId)
        toast.success(res?.message)
      }
      
    } catch (error) {
       if(axios.isAxiosError(error)){
        toast.error(error?.response?.data?.message)
        toast.dismiss(toastId )
      }else{
        toast.error("Something went wrong")
      }
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <div className="w-[80%] mx-auto mt-1 flex flex-row h-[calc(100vh-60px)] items-center justify-center">
      {/* signup form */}
      <div className="w-[50%] flex flex-col gap-4">
        <div className="flex flex-col justify-center items-center">
          <p className="font-semibold text-2xl mb-2">We sent you a code.</p>
          <p className="font-semibold">
            Please enter it below to verify your email
          </p>
          <p className="tex-blue-700">{email}</p>
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
          type="submit"
          disabled={loading}
          onClick={forgotPasswordOtpHandler}
            variant="contained"
            sx={{ marginTop: "32px", width: "400px", textTransform: "none" }}
            size="large"
          >
            Verify Otp
          </Button>
        </div>

        <div className="flex flex-col gap-1 justify-center items-center">
          <p>Don't get the code ?</p>
          <p className=" underline cursor-pointer" >Resend Code</p>
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
