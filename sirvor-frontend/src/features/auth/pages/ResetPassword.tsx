import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import LogoAnimation from "../components/LogoAnimation";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const location = useLocation();
  const { token } = location.state;
  const [showPassword, setshowPassword] = useState(true);
  const [showConfirmPassword, setshowConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-[80%] mx-auto mt-1 flex flex-row">
      {/* signup form */}
      <div className="flex flex-col gap-4 w-[50%]">
        <div>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
            <span>Change Your</span>{" "}
            <span className="text-yellow-400">Password</span>
          </Typography>
          <p className=" text-gray-200">
            Enter a password below to change your password.
          </p>
        </div>

        <div className="mt-28">
          <div className="w-full bg-white rounded-md p-2 text-black flex flex-col items-center justify-center gap-4">
            <form onSubmit={() => {}} className="flex flex-col gap-2  w-full">
              <TextField
                type={showConfirmPassword ? "password" : "text"}
                fullWidth
                variant="filled"
                placeholder="New Password"
                size="medium"
                required
                name="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {showConfirmPassword ? (
                        <FaRegEyeSlash
                          onClick={() => setshowConfirmPassword(false)}
                          className="cursor-pointer"
                        />
                      ) : (
                        <FaEye
                          onClick={() => setshowConfirmPassword(true)}
                          className="cursor-pointer"
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              ></TextField>

              <TextField
                type={showPassword ? "password" : "text"}
                fullWidth
                variant="filled"
                placeholder="Re-enter new password"
                size="medium"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? (
                        <FaRegEyeSlash
                          onClick={() => setshowPassword(false)}
                          className="cursor-pointer"
                        />
                      ) : (
                        <FaEye  
                          onClick={() => setshowPassword(true)}
                          className="cursor-pointer"
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              ></TextField>

              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                size="large"
                sx={{ textTransform: "none" }}
              >
               Reset password
              </Button>
            </form>
          </div>
        </div>
      </div>
      {/* signup animation */}
      <div className="w-[50%] flex items-center justify-center mt-42">
        <LogoAnimation />
      </div>
    </div>
  );
};

export default ResetPassword;
