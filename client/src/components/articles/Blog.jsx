import { useState, useEffect } from "react";

function Blog() {
  var [posts, setPosts] = useState({ array: [] });
  var [user, setUser] = useState({ id: 0, user_name: "Null", pass: "Null", email: "Null", admin: false, verified: false, fname: "Undefined", lname: "User", random1: "Null", random2: "Null", random3: "Null", mailinglist: false, teacher: false, student: false, alumn: false });

  useEffect(
    () => {
      const f = async () => {
        const data = await fetch(`/articleFunctions`)
        const jsonData = await data.json()
        setPosts(jsonData)
          .then(window.location.reload())
      }
      f();
    }, [])


  useEffect(
    () => {
      const f = async () => {
        const data = await fetch(`/getActiveUser`)
        const jsonData = await data.json()
        if (jsonData) {
          setUser(jsonData)
        } else {

        }
      }
      f();
    }, [])


  posts.array.forEach(article => {


    let postDateRaw = article.date.split('T');
    let postDateParsed = postDateRaw[0].split('-');
    let postYear = postDateParsed[0]
    let postMonth = postDateParsed[1]
    let postDate = postDateParsed[2]


    article.dateComplete = `${postMonth}/${postDate}/${postYear} `

    article.link = `/articles/${article.id}`
  })

  return (
    <div className="blog p-2">
      <br />
      <h1 className="text-center text-6xl">List of Blog Posts</h1>
      <br />
      <br />
      {user.admin ?
        <>
          <a href="/articles/new" className="rounded bg-blue-500 text-start hover:bg-blue-900 px-4 py-2 text-white">New Post</a>
          <br />
          <br />
        </>
        : <></>}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Post Name</th>
              <th scope="col" className="px-6 py-3">Post Description</th>
              <th scope="col" className="px-6 py-3">Post Author</th>
              <th scope="col" className="px-6 py-3">Post Date</th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {posts.array.map(article => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope='row' className="px-6 py-4 font-medium text-xl text-gray-900 dark:text-white whitespace-nowrap">
                    {article.title}
                  </th>
                  <td className="px-6 py-4">{article.description}</td>
                  <td className="px-6 py-4">{article.author}</td>
                  <td className="px-6 py-4">{article.dateComplete}</td>
                  <td className="text-gray-500 px-6 py-4"><a href={article.link} key={article.id} >Read More</a></td>
                </tr>)
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Blog;
