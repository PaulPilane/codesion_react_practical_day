import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';


export default function Word() {
const access_token = localStorage.getItem("token")
const { id } = useParams();
const navigate = useNavigate();

const deleteWord = (wordId: number) => {
  const data = { 
    "wordId": wordId
  }
  const config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_API_BASE_URL}/v1/admin/categories/${id}/words`,
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization':   `Bearer ${access_token}`
        },
    data : data
  };

  axios.request(config)
  .then(() => {
     const updatedWords = words.filter((word) => word.id !== wordId);
    setWords(updatedWords);
  })
  .catch((error) => {
    console.log(error);
  });

}

interface Words {
  id: number;
  name: string;
  published: boolean;
  description: string | null;
  categories: {
    id: number;
    name: string;
  }[];
}


const [words, setWords] =  useState<Words[]>([]);

const goToCategories= () => {
    navigate('/categories')
}

const config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `${import.meta.env.VITE_API_BASE_URL}/v1/admin/categories/${id}`,
  headers: { 
      'Authorization':   `Bearer ${access_token}`
      }
};
 useEffect(() => {
       axios.request(config)
      .then((response) => {
        setWords(response.data.data.words)
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
      <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Words of</h1>
      <div className="flex mt-4">
      {words.map((word) => (
        <div  onClick={() => deleteWord(word.id)}
          key={word.id}
          className="relative bg-white border border-gray-200 rounded-lg shadow p-2 mr-2 transition-transform hover:scale-110 transform-origin-center"
        >
          {word.name}
        </div>
      ))}
    </div>
        
        <div className="flex mt-4">
      <button
        onClick={goToCategories}
        type="button"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 ease-in-out"
      >
        Back
      </button>
      <Link
        to={`/category/${id}/words`}
        className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 ease-in-out"
      >
        Add Word
      </Link>
    </div>

    </div>

      );
}