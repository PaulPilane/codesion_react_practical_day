import { useFormik } from "formik";
import axios from "axios"
import { useNavigate } from "react-router-dom";


export default function Login() {
  interface FormValues {
  username: string;
  password: string;
}

    const navigate = useNavigate()

 const formik = useFormik({
     initialValues: {
       username: '',
       password: ''
     },
     validate: (values) => {
    const errors: Partial<FormValues> = {};

    if (!values.username) {
      errors.username = "Username is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
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
        navigate("/home")
        })
        .catch((error) => {
        console.log(error);
        });
     },
   });
   return (
 <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <form
    onSubmit={formik.handleSubmit}
    className="w-full max-w-2xl mx-auto mt-4 p-8 border rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105"
  >
    <div className="mb-4">
  <label htmlFor="username" className="block text-gray-600">Username</label>
  <input
    id="username"
    name="username"
    type="text"
    onChange={formik.handleChange}
    value={formik.values.username}
    className="w-full px-3 py-2 border rounded-lg focus:outline-none hover:border-green-300 focus:border-green-700"
  />
  {formik.touched.username && formik.errors.username ? (
    <div className="text-red-600">{formik.errors.username}</div>
  ) : null}
</div>

  <div className="mb-6">
    <label htmlFor="password" className="block text-gray-600">Password</label>
    <input
      id="password"
      name="password"
      type="password"
      onChange={formik.handleChange}
      value={formik.values.password}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none hover:border-green-300 focus:border-green-700"
    />
    {formik.touched.password && formik.errors.password ? (
      <div className="text-red-600">{formik.errors.password}</div>
    ) : null}
  </div>


    <button
      type="submit"
      className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
    >
      Login
    </button>
     
  </form>
</div>



   );
}
