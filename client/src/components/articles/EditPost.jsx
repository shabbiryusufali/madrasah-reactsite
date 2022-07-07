import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function EditPost() {

    let { id } = useParams();
    var [post, setPost] = useState({ title: "", description: "", markdown: "", date: "", id: Number, author: "" });
    var [user, setUser] = useState({ id: 0, user_name: "Null", pass: "Null", email: "Null", admin: false, verified: false, fname: "Undefined", lname: "User", random1: "Null", random2: "Null", random3: "Null", mailinglist: false, teacher: false, student: false, alumn: false });

    let deleteButton = `/articleFunctions/${id}`
    let action = `/articleFunctions/${id}`
    let backButton = `/articles/${id}`
    let navigate = useNavigate();
    useEffect(
      () => {
        const f = async () => {
          console.log(id)
          const data = await fetch(`/articleFunctions/${id}`)
          console.log('a', data)
          const jsonData = await data.json()
          console.log('b', jsonData)
            console.log('c', post)
            setPost(jsonData)
            console.log('d', jsonData)
        
        }
        f();
      }, [])
      
      useEffect(
        () => {
            const f = async () => {
                const data = await fetch(`/getActiveUser`)
                console.log('a', data)
                const jsonData = await data.json()
                console.log('b', jsonData)
                if(jsonData){   
                console.log('c', user)
                    setUser(jsonData)
                    console.log('d', user)
                } else{
      
                }
            }
            f();
        }, [])
  
      
  var content = post.markdown.split(/\n/g)

  return (
    <div className='App'>

<div className='p-2'>


<br />

<h1 className='text-6xl text-center'>Edit Post</h1>
<br /> <br />

      {user.admin ?
        <form method='put' action={action}>
      <button onClick={async () => {await fetch(deleteButton, {method:'DELETE'}).then(navigate('/'))}} className=' mx-1 hover:bg-red-900 text-white font-semibold py-2 px-4 bg-red-500 hover:border-transparent rounded'>DELETE</button>
            <a href={backButton} className='mx-1 hover:bg-blue-900 text-white font-semibold hover:text-white py-2 px-4 bg-blue-500 hover:border-transparent rounded'>BACK</a>
            <br />
            <br />
            <label for='title' className='text-white'>Title:</label>
            <br />
            <input type='text' name='title' id='title' className='rounded w-full px-2 py-1' value={post.title} />
            <br />
            <label for='description' className='text-white'>Description:</label>
            <br />
            <input type='text' name='description' id='description' className='rounded w-full px-2 py-1 ' value={post.description} />
            <br />
            <label for='markdown' className='text-white'>Content:</label>
            <br />
            <textarea name="markdown" id="markdown" rows='20' className='w-full px-2 py-1 rounded' value={content.map(line => {
              return line
            })}></textarea>
            <input type='submit' value='Submit' className='rounded bg-blue-500 hover:bg-blue-900 text-white px-4 py-2' />
        </form> : <div className="test-red-500">
<a href='/articles' className='mx-1 hover:bg-blue-900 text-white font-semibold hover:text-white py-2 px-4 bg-blue-500 hover:border-transparent rounded'>BACK</a>
          Must be an admin to edit a post</div>}
        </div>
    </div>
  );
}

export default EditPost;
