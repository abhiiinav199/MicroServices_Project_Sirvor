import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="border-b-2 border-b-gray-700 flex flex-row gap-6">
      <Link to={"/login"}>Login</Link>
      <Link to={"/signup"}>Signup</Link>
    </div>
  )
}

export default Navbar