import { useEffect, useState } from "react";
function InsertPost() {

  var [user, setUser] = useState({ id: 0, user_name: "Null", pass: "Null", email: "Null", admin: false, verified: false, fname: "Undefined", lname: "User", random1: "Null", random2: "Null", random3: "Null", mailinglist: false, teacher: false, student: false, alumn: false });
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

  return (
    <div className='App'>
            <div className='p-2'>

<h1 className='text-6xl text-center'>New Post</h1>
            <br />
            <br />
            <a href='/articles' className='rounded px-4 py-2 bg-blue-500 hover:bg-blue-900 text-white'>Back</a>

      {user.admin ? 
        <form method='post' action='/articleFunctions/new'>
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
        </form> : <div className="text-red-500">Must be an admin to make a post</div> }
        </div>
    </div>
  );
}

export default InsertPost;
