import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function BlogPost() {
  let { id } = useParams();
  var [post, setPost] = useState({ title: "", description: "", markdown: "", date: "", id: null, author: "" });
  var [user, setUser] = useState({ id: 0, user_name: "Null", pass: "Null", email: "Null", admin: false, verified: false, fname: "Undefined", lname: "User", random1: "Null", random2: "Null", random3: "Null", mailinglist: false, teacher: false, student: false, alumn: false });

  let deleteButton = `/articleFunctions/${id}`
  let editButton = `/articles/edit/${id}`
  useEffect(
    () => {
      const f = async () => {
        const data = await fetch(`/articleFunctions/${id}`)
        const jsonData = await data.json()
        setPost(jsonData)

      }
      f();
    }, [])



  let postDateRaw = post.date.split('T');
  let postDateParsed = postDateRaw[0].split('-');
  let postYear = postDateParsed[0]
  let postMonth = postDateParsed[1]
  postMonth = parseInt(postMonth)
  let postDate = postDateParsed[2]

  useEffect(
    () => {
      const f = async () => {
        const data = await fetch(`/getActiveUser`)
        console.log('a', data)
        const jsonData = await data.json()
        console.log('b', jsonData)
        if (jsonData) {
          console.log('c', user)
          setUser(jsonData)
          console.log('d', user)
        } else {

        }
      }
      f();
    }, [])

  if (postMonth === 1) {
    postMonth = "January"
  } else if (postMonth === 2) {
    postMonth = "February"
  } else if (postMonth === 3) {
    postMonth = "March"
  } else if (postMonth === 4) {
    postMonth = "April"
  } else if (postMonth === 5) {
    postMonth = "May"
  } else if (postMonth === 6) {
    postMonth = "June"
  } else if (postMonth === 7) {
    postMonth = "July"
  } else if (postMonth === 8) {
    postMonth = "August"
  } else if (postMonth === 9) {
    postMonth = "September"
  } else if (postMonth === 10) {
    postMonth = "October"
  } else if (postMonth === 11) {
    postMonth = "November"
  } else if (postMonth === 12) {
    postMonth = "December"
  } else {
    postMonth = "Undefined Date"
  }

  let navigate = useNavigate();

  var content = post.markdown.split(/\n/g)


  return (
    <div className="App">
      <div className="p-2">
        <br />
        <h1 className="text-center text-6xl">Blog Post</h1>
        {user.admin ?
          <>
            <button onClick={async () => { await fetch(deleteButton, { method: 'DELETE' }).then(navigate('/')) }} className=' mx-1 hover:bg-red-900 text-white font-semibold py-2 px-4 bg-red-500 hover:border-transparent rounded'>DELETE</button>
            <a href={editButton} className='mx-1 hover:bg-blue-900 text-white font-semibold hover:text-white py-2 px-4 bg-blue-500 hover:border-transparent rounded'>EDIT</a>
          </> : <></>}

        <a href='/articles' className='mx-1 hover:bg-blue-900 text-white font-semibold hover:text-white py-2 px-4 bg-blue-500 hover:border-transparent rounded'>BACK</a>
        <div className="bg-white rounded p-3 my-5">

          <h2 className="text-start text-4xl">{post.title}</h2>
          <h3 className="text-start text-2xl">{post.description}</h3>
          <h4 className="text-start text-md">Posted By {post.author} on {postMonth} {postDate}, {postYear}</h4>
          <br />
          <p className="text-start text-lg ">{content.map(line => {
            return (<p>{line}<br /></p>)
          })}</p>
        </div>
      </div>

    </div>

  );
}

export default BlogPost;
