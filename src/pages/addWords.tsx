import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";




export default function AddWord() {
      const navigate = useNavigate()
       const access_token = localStorage.getItem("token");

    const { id } = useParams();

 const formik = useFormik({
     initialValues: {
       wordId: NaN
     },

     onSubmit: values => {
      if(Number.isNaN(values.wordId)) {
        formik.setErrors({ wordId: 'Word Id is required' });
      }
      if(values.wordId < 1) {
        formik.setErrors({ wordId: 'Word Id must be at least 1' });
      }
       const data = {
            wordId : values.wordId
        };

        const config = {
        method: 'patch',
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
            navigate(-1)
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
      <label htmlFor="wordId" className="block text-gray-600">Word Id</label>
      <input
        id="wordId"
        name="wordId"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.wordId}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none hover:border-green-300 focus:border-green-700"
      />
      {formik.touched.wordId && formik.errors.wordId ? (
        <div className="text-red-600">{formik.errors.wordId}</div>
      ) : null}
    </div>

    <button
      type="submit"
      className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
    >
      Add Word
    </button>
  </form>
</div>

   );
}