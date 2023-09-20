import { useFormik } from "formik";
import axios from "axios"
import { useNavigate } from "react-router-dom";


export default function Login() {

    const navigate = useNavigate()

 const formik = useFormik({
     initialValues: {
       username: '',
       password: ''
     },
     onSubmit: values => {
       const data = {
        'grant_type': import.meta.env.VITE_GRANT_TYPE,
        'client_id': import.meta.env.VITE_CLIENT_ID,
        'client_secret': import.meta.env.VITE_CLIENT_SECRET,
        'scope': import.meta.env.VITE_SCOPE,
        'username': values.username,
        'password': values.password 
        };

        const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_BASE_URL}/connect/token`,
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
        };

        axios.request(config)
        .then((response) => {
        localStorage.setItem('token', response.data.access_token)
        navigate("/Register")
        })
        .catch((error) => {
        console.log(error);
        });
     },
   });
   return (
    <div className="flex flex-col items-center justify-center min-h-screen">
  <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-4 p-4 border rounded-lg shadow-md">
    <div className="mb-4">
      <label htmlFor="username" className="block text-gray-600">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.username}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      />
    </div>

    <div className="mb-6">
      <label htmlFor="password" className="block text-gray-600">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      />
    </div>

    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
      Submit
    </button>
  </form>
</div>

   );
}
