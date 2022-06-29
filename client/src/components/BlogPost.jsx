import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogPost() {
  let { id } = useParams();
  var [post, setPost] = useState({ title: "", description: "", markdown: "", date: "", id: Number, author: "" });

  useEffect(
    () => {
      const f = async () => {
        console.log(id)
        const data = await fetch(`/articleFunctions/${id}`)
        console.log('a', data)
        const jsonData = await data.json()
        console.log('b', jsonData)
        if (jsonData) {
          console.log('c', post)
          setPost(jsonData)
          console.log('d', jsonData)
        }
        else{
          post = {title:"Post Does Not Exist", description: "", markdown: "", date: "XXXX-XX-XXTXXXXXX", id: null, author: "Undefined Author" }
          //setPost(jsonData)
          console.log('e', post)
        }
      }
      f();
    }, [id, post])

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





  return (
    <div className="App">
      <br />
      <h1 className="text-center text-6xl">Blog Post</h1>
      <div className="bg-white rounded p-3 m-5">
        <h2 className="text-start text-4xl">{post.title}</h2>
        <h3 className="text-start text-2xl">{post.description}</h3>
        <h4 className="text-start text-md">Posted By {post.author} on {postMonth} {postDate}, {postYear}</h4>
        <br />
        <p className="text-start text-lg ">{post.markdown}</p>
      </div>
    </div>
  );
}

export default BlogPost;
