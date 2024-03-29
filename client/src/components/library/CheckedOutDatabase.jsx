import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CheckedOutDatabase() {
  
  var [books, setBooks] = useState({array: []});
  var [booksFiltered, setBooksFiltered] = useState([]);
  var [user, setUser] = useState({ id: 0, user_name: "Null", pass: "Null", email: "Null", admin: false, verified: false, fname: "Undefined", lname: "User", random1: "Null", random2: "Null", random3: "Null", mailinglist: false, teacher: false, student: false, alumn: false });


  useEffect(
    () => {
        const f = async () => {
            const data = await fetch(`/libraryFunctions/borrowedBooks`)
            const jsonData = await data.json()
            setBooks(jsonData)
            setBooksFiltered(jsonData.array)
        }
        f();
    }, [])


    useEffect(
      () => {
          const f = async () => {
              const data = await fetch(`/getActiveUser`)
              const jsonData = await data.json()
              if(jsonData){   
                  setUser(jsonData)
              } else{
    
              }
          }
          f();
      }, [])


    books.array.forEach(book =>{
      book.link = `/library/${book.id}`
    })

    const filterBooks = e => {
      var value = e.target.value
      setBooksFiltered(
        books.array.filter(item => {
        if(item.title.toLowerCase().includes(value.toLowerCase()) || item.userloanedto.toLowerCase().includes(value.toLowerCase()) || item.id === parseInt(value) ||
        item.gradelevel === parseInt(value)){
          return true
        } else { return false }
      }))
    }
    
  return (
    <div className="blog p-2 sm:px-16">
      <br />
      <h1 className="text-center text-6xl">List of Borrowed Books</h1>
      <br />
      <br />
      {user.admin ? 
      <>
      <br />
      <br />
      </>
      : <></> }
      <h2 className="text-white">Filter Books</h2>
      <input type='text' name='filterBooks' id='filterBooks' onChange={filterBooks} className='rounded w-full' />
    <br />
    <br />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            {/* <th scope="col" className="px-6 py-3">Book ID</th> */}
            <th scope="row" className="px-6 py-3">Book Title</th>
            <th scope="col" className="px-6 py-3">Book Grade Level</th>
            <th scope="col" className="px-6 py-3">User Loaned To (If loaned)</th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
        {booksFiltered.map(book => {
        return(
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope='row' className="px-6 py-4 font-medium text-xl   text-white whitespace-nowrap">
          {book.title}
          </th>
          {/* <td className="px-6 py-4">{book.title}</td> */}
          <td className="px-6 py-4">{book.gradelevel}</td>
          <td className="px-6 py-4">{book.userloanedto}</td>
          <td className="text-gray-500 px-6 py-4"><Link to={book.link} key={book.id} >Read More</Link></td>
        </tr>)
      })}
      </tbody>
      </table>
      </div>
    </div>
  );
}

export default CheckedOutDatabase;
