import { useState, useEffect } from "react";

function Homepage() {

  var [posts, setPosts] = useState({ array: [] });
  var [user, setUser] = useState({ id: 0, user_name: "Null", pass: "Null", email: "Null", admin: false, verified: false, fname: "Undefined", lname: "User", random1: "Null", random2: "Null", random3: "Null", mailinglist: false, teacher: false, student: false, alumn: false });
  
  useEffect(
    () => {
        const f = async () => {
            const data = await fetch(`/getActiveUser`)
            const jsonData = await data.json()
            if(jsonData){   
                setUser(jsonData)
            } 
        }
        f();
    }, [])

  useEffect(
    () => {
        const f = async () => {
        const data = await fetch(`/articleFunctions`)
        const jsonData = await data.json()
        setPosts(jsonData)
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
    article.editLink = `/articles/edit/${article.id}`
  })


  return (
    <div className="">
      <br />
      <h1 className="text-center text-6xl">Homepage</h1>
      <br />
      <div className="md:flex">
        <div className="m-5 md:w-1/2">
          <iframe title="Madrasah Calendar" src="https://calendar.google.com/calendar/embed?src=3r7s64pmr43cskec7m475vp7lo%40group.calendar.google.com&ctz=America%2FVancouver" width='100%' className="rounded" height="600" frameBorder="0" scrolling="no"></iframe>
          <br />
          <br />
        </div>
        <div className="m-5 md:w-1/2 ">
          {posts.array.slice(0,4).map(article => {
            return(
              <div className="bg-slate-700 pb-5 text-white p-3 m-2 rounded" key={article.id}>
                <div className="pb-2"> 
                <h1 className="text-2xl">{article.title}</h1>
                <h3 className="text-sm">By {article.author} On {article.dateComplete}</h3>
                <h2 className="text-xl pb-2">{article.description}</h2>
                </div>
                <a href={article.link} className='bg-blue-500 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded'>Read More</a>
                { user.admin ?
                <a href={article.editLink} className='bg-blue-500 mx-1 hover:bg-blue-900 text-white font-semibold  py-2 px-4 rounded'>Edit</a>
              : <></>  
              }
                </div>
            
            )})}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
