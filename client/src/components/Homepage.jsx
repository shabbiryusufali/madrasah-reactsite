import { useState, useEffect } from "react";

function Homepage() {

  var [posts, setPosts] = useState({ array: [] });

  useEffect(
    () => {
      const f = async () => {
        const data = await fetch(`/articleFunctions`)
        console.log('a', data)
        const jsonData = await data.json()
        console.log('b', jsonData)
        console.log('c', posts)
        setPosts(jsonData)
        console.log('d', jsonData)
      }
      f();
    }, { array: [] })


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
    <div className="App">
      <br />
      <h1 className="text-center text-6xl">Homepage</h1>
      <br />
      <div className="md:flex">
        <div className="m-5 md:w-1/2">
          <iframe src="https://calendar.google.com/calendar/embed?src=3r7s64pmr43cskec7m475vp7lo%40group.calendar.google.com&ctz=America%2FVancouver" width='100%' height="600" frameborder="0" scrolling="no"></iframe>
          <br />
          <br />
        </div>
        <div className="m-5 md:w-1/2 ">
          {posts.array.slice(0,4).map(article => {
            return(
              <div className="bg-slate-700 p-3 m-2 rounded">
                <h1 className="text-2xl">{article.title}</h1>
                <h3 className="text-sm">By {article.author} On {article.dateComplete}</h3>
                <h2 className="text-xl pb-2">{article.description}</h2>
                <a href={article.link} className='bg-transparent mx-1 hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded'>Read More</a>
              </div>
            
            )})}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
