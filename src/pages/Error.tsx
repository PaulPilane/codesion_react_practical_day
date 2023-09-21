import { Link } from "react-router-dom";


export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="text-lg text-gray-700 mb-4">Oops! Page Not Found</p>
      <p className="text-lg text-gray-700">Let's go to a safe land, yeah?</p>

      <Link
      to={`/categories`}
      className="px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
    >
      Safe Land
    </Link>
    </div>
  );
}