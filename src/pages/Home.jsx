import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="mt-10 text-center text-sm text-gray-500">
     <h1 className=" my-2 font-bold leading-6 text-black">Welcome to Appety Queue System</h1>
      <p>
        <Link
          to="/login"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default HomePage;
