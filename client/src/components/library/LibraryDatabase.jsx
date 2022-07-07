import { useState, useEffect } from "react";

function LibraryDatabase() {
    var [books, setBooks] = useState({array:[]});
    var [user, setUser] = useState({ id: 0, user_name: "Null", pass: "Null", email: "Null", admin: false, verified: false, fname: "Undefined", lname: "User", random1: "Null", random2: "Null", random3: "Null", mailinglist: false, teacher: false, student: false, alumn: false });
      
    useEffect(
      () => {
          const f = async () => {
              const data = await fetch(`/libraryFunctions/borrowedBooks`)
              console.log('a',data)
              const jsonData = await data.json()
              console.log('b', jsonData)
              console.log('c', books)
              setBooks(jsonData)
              .then(window.location.reload())
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
  
  
      books.array.forEach(book =>{
  
    
        book.link = `/library/${book.id}`
      })

  return (
    <div className="blog p-2">
      <br />
      <h1 className="text-center text-6xl">List of Books</h1>
      <br />
      <br />
      {user.admin ? 
      <>
      <br />
      <br />
      </>
      : <></> }
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Book ID</th>
            <th scope="col" className="px-6 py-3">Book Title</th>
            <th scope="col" className="px-6 py-3">Book Grade Level</th>
            <th scope="col" className="px-6 py-3">User Loaned To (If loaned)</th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
      {books.array.map(book => {
        return(
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope='row' className="px-6 py-4 font-medium text-xl text-gray-900 dark:text-white whitespace-nowrap">
          {book.id}
          </th>
          <td className="px-6 py-4">{book.title}</td>
          <td className="px-6 py-4">{book.gradelevel}</td>
          <td className="px-6 py-4">{book.userloanedto}</td>
          <td className="text-gray-500 px-6 py-4"><a href={book.link} key={book.id} >Read More</a></td>
        </tr>)
      })}
      </tbody>
      </table>
      </div>
    </div>
  );
}

export default LibraryDatabase;
