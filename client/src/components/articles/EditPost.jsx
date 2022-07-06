import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../index.css';

function EditPost() {

    let { id } = useParams();
    var [post, setPost] = useState({ title: "", description: "", markdown: "", date: "", id: Number, author: "" });
    let deleteButton = `/articleFunctions/${id}`
    let action = `/articleFunctions/${id}`
    let backButton = `/articles/${id}`
    let navigate = useNavigate();


  return (
    <div className='App'>
        <form method='put' action={action}>
            <div className='p-2'>
                <br />

            <h1 className='text-6xl text-center'>New Post</h1>
            <button onClick={async () => {await fetch(deleteButton, {method:'DELETE'}).then(navigate('/'))}} className='bg-transparent  mx-1 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'>DELETE</button>
      <a href={backButton} className='bg-transparent  mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>BACK</a>
            <br />
            <br />
            <label for='title' className='text-white'>Title:</label>
            <br />
            <input type='text' name='title' id='title' className='rounded w-full px-2 py-1 ' />
            <br />
            <label for='description' className='text-white'>Description:</label>
            <br />
            <input type='text' name='description' id='description' className='rounded w-full px-2 py-1 ' />
            <br />
            <label for='markdown' className='text-white'>Content:</label>
            <br />
            <textarea name="markdown" id="markdown" rows='20' className='w-full px-2 py-1 rounded'></textarea>
            <input type='submit' value='Submit' className='rounded bg-blue-500 hover:bg-blue-900 text-white px-4 py-2' />
            </div>
        </form>
    </div>
  );
}

export default EditPost;
