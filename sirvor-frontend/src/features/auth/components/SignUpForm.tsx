import { TextField } from "@mui/material"

const SignUpForm = () => {
  return (
    <form className="w-full  bg-white rounded-md p-2 flex flex-col gap-2">
      <TextField fullWidth variant="filled" placeholder="Full Name" size="medium" required></TextField>
       <TextField fullWidth variant="filled" placeholder="Email" size="medium" required></TextField>
       <TextField fullWidth variant="filled" placeholder="Password" size="medium" required></TextField>
       <TextField fullWidth variant="filled" placeholder="Confirm Password" size="medium" required></TextField>
    </form>
  )
}

export default SignUpForm