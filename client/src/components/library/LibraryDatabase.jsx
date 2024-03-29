import { useState, useEffect } from "react";

function LibraryDatabase() {
  var [books, setBooks] = useState([]);
  var [booksFiltered, setBooksFiltered] = useState([]);
  var [user, setUser] = useState({ id: 0, user_name: "Null", pass: "Null", email: "Null", admin: false, verified: false, fname: "Undefined", lname: "User", random1: "Null", random2: "Null", random3: "Null", mailinglist: false, teacher: false, student: false, alumn: false });

  useEffect(
    () => {
      const f = async () => {
        const data = await fetch(`/libraryFunctions/books`)
        const jsonData = await data.json()
        setBooks(jsonData.array)
        setBooksFiltered(jsonData.array)
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


  booksFiltered.forEach(book => {
    book.link = `/library/${book.id}`
  })
  

  const filterBooks = e => {
    var value = e.target.value
    setBooksFiltered(
      books.filter(item => {
      if(item.title.toLowerCase().includes(value.toLowerCase()) || item.userloanedto.toLowerCase().includes(value.toLowerCase()) || item.id === parseInt(value)
       || item.gradelevel === parseInt(value)){
        return true
      } else { return false }
    }))
  }
  


  return (
    <div className="blog p-2 sm:px-16">
      <br />
      <h1 className="text-center text-6xl">List of Books</h1>
      <br />
      <br />
        <h2 className="text-white">Filter Books</h2>
        <input type='text' name='filterBooks' id='filterBooks' onChange={filterBooks} className='rounded w-full' />
      <br />
      <br />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 sm:rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="row" className="px-6 py-3">Book Title</th>
              <th scope="col" className="px-6 py-3">Book Grade Level</th>
              <th scope="col" className="px-6 py-3">{user.admin | user.librarian | user.teacher ? "User Loaned To (If loaned)" : "Loaned?" }</th>
              {user.admin | user.librarian | user.teacher ? <th scope="col" className="px-6 py-3"></th> : <></>}
            </tr>
          </thead>
          <tbody>
            {booksFiltered.map(book => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope='row' className="px-6 py-4 font-medium text-xl  text-white whitespace-nowrap">
                    {book.title}
                  </th>
                  <td className="px-6 py-4">{book.gradelevel}</td>
                  <td className="px-6 py-4">{user.admin | user.librarian | user.teacher ? (book.userloanedto ? book.userloanedto : <></>) : (book.userloanedto ? "Yes" : "") }</td>
                  {user.admin | user.librarian | user.teacher ? <td className="text-gray-500 px-6 py-4"><a href={book.link} key={book.id} >More Information</a></td> : <></>}
                </tr>)
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LibraryDatabase;
