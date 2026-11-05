import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  return (

    <div className="w-full bg-white rounded-md p-2 text-black flex flex-col items-center justify-center gap-4">

    <form className="flex flex-col gap-2  w-full">
      <TextField
        fullWidth
        variant="filled"
        placeholder="Full Name"
        size="medium"
        required
      ></TextField>
      <TextField
        fullWidth
        variant="filled"
        placeholder="Email"
        size="medium"
        required
      ></TextField>
      <TextField
        fullWidth
        variant="filled"
        placeholder="Password"
        size="medium"
        required
      ></TextField>
      <TextField
        fullWidth
        variant="filled"
        placeholder="Confirm Password"
        size="medium"
        required
      ></TextField>

      <div className="bg-gray-600 flex flex-row gap-2 w-fit px-6 py-2 rounded-full ">
        <p className="bg-gray-100 text-gray-600 px-6 py-2 rounded-full cursor-pointer">
          User
        </p>
        <p className="px-6 py-2 rounded-full cursor-pointer ">Worker</p>
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
