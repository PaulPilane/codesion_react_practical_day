import axios from "axios";
import { useEffect, useState } from "react";
import '../index.css'
import { Link, useNavigate } from "react-router-dom";


export default function Categories() {
const access_token = localStorage.getItem("token")

const navigate = useNavigate();

const goToRegister = () => {
  navigate("/register")
}

interface Category {
  id: number;
  name: string;
}

const [categories, setCategories] =  useState<Category[]>([]);

const config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `${import.meta.env.VITE_API_BASE_URL}/v1/admin/categories`,
  headers: { 
      'Authorization':   `Bearer ${access_token}`
      }
};
 useEffect(() => {
       axios.request(config)
      .then((response) => {
        console.log(response.data.data);
        setCategories(response.data.data)
      })
      .catch((error) => {
        console.log(error);
        if(error.response.status == 401){
          navigate("/login")
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
      return (
       <>
      <h1 className="text-3xl font-bold mt-4 flex justify-center">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 transition-transform transform hover:scale-105 p-4"
          >
            {category.name}
          </Link>
        ))}
      </div>


      <div>
        <button onClick={goToRegister} type="button"> </button>
      </div>
    </>

      );
}