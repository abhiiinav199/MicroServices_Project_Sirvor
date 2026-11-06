import { Typography } from "@mui/material";
import SignUpForm from "../components/SignUpForm";
import LogoAnimation from "../components/LogoAnimation";

const Signup = () => {
  return (
    <div className="w-[80%] mx-auto mt-1 flex flex-row">
      {/* signup form */}
      <div className="flex flex-col gap-4 w-[50%]">
        <div>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
            Sign Up
          </Typography>
          <p className=" text-gray-200">
            Fill the form below to create your account.
          </p>
        </div>

        <div >
          <SignUpForm />
        </div>
      </div>
      {/* signup animation */}
      <div className="w-[50%]">
        <LogoAnimation/>
      </div>
    </div>
  );
};

export default Signup;
