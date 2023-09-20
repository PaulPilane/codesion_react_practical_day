import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';


export default function Word() {
const access_token = localStorage.getItem("token")
const { id } = useParams();
const navigate = useNavigate();
const [words, setWords] =  useState([]);

const goToCategories= () => {
    navigate('/categories')
}

const config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://edeaf-api-staging.azurewebsites.net/v1/admin/categories/'+id,
  headers: { 
      'Authorization':   `Bearer ${access_token}`
      }
};
 useEffect(() => {
       axios.request(config)
      .then((response) => {
        console.log(response.data.data.words);
        setWords(response.data.data.words)
      })
      .catch((error) => {
        console.log(error);
         if(error.response.status == 401){
          navigate("/login")
        }
      });
    }, [])



    
      return (
       <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Words of</h1>
        <div className="flex mt-4">
            {words.map((word) => (
            <div
                key={word.id}
                className="bg-white border border-gray-200 rounded-lg shadow p-2 mr-2"
            >
                {word.name}
            </div>
            ))}
        </div>

        <button
            onClick={goToCategories}
            type="button"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
        >
            Back
        </button>
        </div>



      );
}