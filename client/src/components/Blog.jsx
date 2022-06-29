import { useState, useEffect } from "react";

function Blog() {
  var [posts, setPosts] = useState({array:[]});
  
  useEffect(
    () => {
        const f = async () => {
            const data = await fetch(`/articleFunctions`)
            console.log('a',data)
            const jsonData = await data.json()
            console.log('b', jsonData)
            console.log('c', posts)
            setPosts(jsonData)
            console.log('d', jsonData)
        }
        f();
    }, {array:[]})

  
    let arrayOfLinks = []

    posts.array.forEach(article =>{
      article.link = `/articles/${article.id}`
      arrayOfLinks.push(`/articles/${article.id}`)
    })

  return (
    <div className="blog p-2 text-center">
      <br />
      <h1 className="text-center text-6xl">List of Blog Posts</h1>
      <br />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Post Name</th>
            <th scope="col" className="px-6 py-3">Post Description</th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
      {posts.array.map(article => {
        return(
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope='row' className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
          {article.title}
          </th>
          <td className="px-6 py-4">{article.description}</td>
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
