import { Typography } from "@mui/material";
import LogoAnimation from "../components/LogoAnimation";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="w-[80%] mx-auto mt-1 flex flex-row">
      {/* signup form */}
      <div className="flex flex-col gap-4 w-[50%]">
        <div>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
            <span>Welcome</span> <span className="text-yellow-400">!</span>
          </Typography>
          <p className=" text-gray-200">
            Login to Servor to continue to servor.
          </p>
        </div>

        <div className="mt-28">
          <LoginForm />
        </div>
      </div>
      {/* signup animation */}
      <div className="w-[50%] flex items-center justify-center mt-42">
        <LogoAnimation/>
      </div>
    </div>
  );
};

export default Login;
