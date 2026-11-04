import { Typography } from "@mui/material";
import SignUpForm from "../components/SignUpForm";

const Signup = () => {
  return (
    <div className="w-[80%] mx-auto mt-1">
      {/* signup form */}
      <div className="flex flex-col gap-4">
        <div>
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            Sign Up
          </Typography>
          <p className="mt-2 text-gray-200">
            Fill the form below to create your account.
          </p>
        </div>

        <div className="w-[50%]">
          <SignUpForm />
        </div>
      </div>
      {/* signup animation */}
      <div className="w-[50%]"></div>
    </div>
  );
};

export default Signup;
