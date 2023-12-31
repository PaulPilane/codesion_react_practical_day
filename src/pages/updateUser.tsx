import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function UpdateUser() {
const navigate = useNavigate();
  const access_token = localStorage.getItem("token");

    const goToHome = () => {
    navigate('/home')
  }

  interface FormValues {
  name: string;
  surname: string;
  email: string;
}

  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
  });

   const formik = useFormik({
    initialValues: {
      name: userData.name || "",
      surname: userData.surname || "",
      email: userData.email || "",
    },
      validate: (values) => {
      const errors: Partial<FormValues> = {};
      if (!values?.name){
        errors.name = "Name is required";
      }
      if (!values?.surname){
        errors.surname = "Surname is required";
      }
      if (!values.email) {
      errors.email = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      return errors;
   }
    ,

     onSubmit: values => {

        const data = JSON.stringify({
        "name": values.name,    
        "lastName": values.surname,
        "email": values.email
        });

        const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_BASE_URL}/v1/admin/Users/current`,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization':   `Bearer ${access_token}`
        },
        data : data
        };

        axios.request(config)
        .then(() => {
            navigate('/home')
        })
        .catch((error) => {
        console.log(error);
         if(error.response.status == 401){
          navigate("/login")
        }
        });

     },
   });


  useEffect(() => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_BASE_URL}/v1/admin/Users/current`,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization':   `Bearer ${access_token}`
      }
    };

    axios.request(config)
      .then((response) => {
        const { name, lastName, email } = response.data.data;
        formik.setValues({
          name: name,
          surname: lastName,
          email: email
        });
        setUserData({ name, surname: lastName, email });
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      });
  }, []);

 
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
       <form
    onSubmit={formik.handleSubmit}
    className="w-full max-w-2xl mx-auto mt-4 p-8 border rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105"
    >
        <div className="mb-4">
  <label htmlFor="name" className="block text-gray-600">Name</label>
  <input
    type="text"
    id="name"
    name="name"
    placeholder="Name"
    onChange={formik.handleChange}
    value={formik.values.name}
    className="w-full px-3 py-2 border rounded-lg focus:outline-none hover:border-green-300 focus:border-green-700"
  />
  {formik.touched.name && formik.errors.name ? (
    <div className="text-red-600">{formik.errors.name}</div>
  ) : null}
</div>

  <div className="mb-4">
    <label htmlFor="surname" className="block text-gray-600">Surname</label>
    <input
      type="text"
      id="surname"
      name="surname"
      placeholder="Surname"
      onChange={formik.handleChange}
      value={formik.values.surname}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none hover:border-green-300 focus:border-green-700"
    />
    {formik.touched.surname && formik.errors.surname ? (
      <div className="text-red-600">{formik.errors.surname}</div>
    ) : null}
  </div>

  <div className="mb-4">
    <label htmlFor="email" className="block text-gray-600">Email</label>
    <input
      type="text"
      id="email"
      name="email"
      placeholder="Email"
      onChange={formik.handleChange}
      value={formik.values.email}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none hover:border-green-300 focus:border-green-700"
    />
    {formik.touched.email && formik.errors.email ? (
      <div className="text-red-600">{formik.errors.email}</div>
    ) : null}
  </div>


        <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
        >
        Update
        </button>
    </form>

      <button
    onClick={goToHome}
    type="button"
    className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300 ease-in-out"
  >
    Home
  </button>


    </div>
    )
}


