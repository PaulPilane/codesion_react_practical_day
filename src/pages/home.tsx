import { Link } from "react-router-dom";


export default function Home() {

    return (
        <div className="flex items-center justify-center h-screen">
  <div className="flex space-x-4">
    <Link
      to={`/update-user`}
      className="px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
    >
      Update Profile
    </Link>
    <Link
      to={`/register`}
      className="px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
    >
      Register User
    </Link>
  </div>
</div>


    );
}