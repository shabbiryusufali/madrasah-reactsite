import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function BlogPost() {
  let { id } = useParams();
  var [post, setPost] = useState({ title: "", description: "", markdown: "", date: "", id: null, author: "" });
  let deleteButton = `/articleFunctions/${id}`
  let editButton = `/articles/edit/${id}`
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

  let postDateRaw = post.date.split('T');
  let postDateParsed = postDateRaw[0].split('-');
  let postYear = postDateParsed[0]
  let postMonth = postDateParsed[1]
  let postDate = postDateParsed[2]

  if (postMonth == 1) {
    postMonth = "January"
  } else if (postMonth == 2) {
    postMonth = "February"
  } else if (postMonth == 3) {
    postMonth = "March"
  } else if (postMonth == 4) {
    postMonth = "April"
  } else if (postMonth == 5) {
    postMonth = "May"
  } else if (postMonth == 6) {
    postMonth = "June"
  } else if (postMonth == 7) {
    postMonth = "July"
  } else if (postMonth == 8) {
    postMonth = "August"
  } else if (postMonth == 9) {
    postMonth = "September"
  } else if (postMonth == 10) {
    postMonth = "October"
  } else if (postMonth == 11) {
    postMonth = "November"
  } else if (postMonth == 12) {
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
      <button onClick={async () => {await fetch(deleteButton, {method:'DELETE'}).then(navigate('/'))}} className='bg-transparent  mx-1 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'>DELETE</button>
      <a href={editButton} className='bg-transparent  mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>EDIT</a>
      <a href='/articles' className='bg-transparent  mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>BACK</a>
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
