import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";


export default function Register() {

  const goToCategories = () => {
    navigate('/categories')
  }

 const navigate = useNavigate()



 const formik = useFormik({
     initialValues: {
       name: '',
       surname: '',
       email: '',
       role: ''
     },
     onSubmit: values => {

        const access_token = localStorage.getItem("token")

        const data = JSON.stringify({
        "name": values.name,
        "surname": values.surname,
        "email": values.email,
        "role": values.role
        });

        const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_BASE_URL}/v1/admin/Users`,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization':   `Bearer ${access_token}`
        },
        data : data
        };

        axios.request(config)
        .then(() => {
        navigate('/categories')
        })
        .catch((error) => {
        console.log(error);
         if(error.response.status == 401){
          navigate("/login")
        }
        });

     },
   });
   return (
    <>
 <div className="flex flex-col px-5 items-center justify-center min-h-screen">
  <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto mt-4 p-4 border rounded-lg shadow-md">
    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-600">Name</label>
      <input
        type="text"
        id="name"
        placeholder="<NAME>"
        onChange={formik.handleChange}
        value={formik.values.name}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="surname" className="block text-gray-600">Surname</label>
      <input
        type="text"
        id="surname"
        placeholder="<SURNAME>"
        onChange={formik.handleChange}
        value={formik.values.surname}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-600">Email</label>
      <input
        type="text"
        id="email"
        placeholder="<EMAIL>"
        onChange={formik.handleChange}
        value={formik.values.email}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      />
    </div>

    <div className="mb-6">
      <label htmlFor="role" className="block text-gray-600">Role</label>
      <input
        type="text"
        id="role"
        placeholder="<ROLE>"
        onChange={formik.handleChange}
        value={formik.values.role}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      />
    </div>

    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
      Register
    </button>
  </form>

  <button
    onClick={goToCategories}
    type="button"
    className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300 ease-in-out"
  >
    Categories
  </button>
</div>

</>

     
   );
}