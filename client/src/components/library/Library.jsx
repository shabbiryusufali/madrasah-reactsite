import { useEffect, useState } from "react";
function Library() {
  var [user, setUser] = useState({ id: 0, user_name: "Null", pass: "Null", email: "Null", admin: false, verified: false, fname: "Undefined", lname: "User", random1: "Null", random2: "Null", random3: "Null", mailinglist: false, teacher: false, student: false, alumn: false });
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

  return (
    <div className="App">
      <div className="p-2">
        <h1 className="text-center text-6xl">Library</h1>
        {
          user.admin || user.teacher || user.librarian ?
            <div>
              <a href="/addBook" className="rounded px-4 py-2 my-1 bg-blue-500 hover:bg-blue-900 text-white">Add a book to the system</a>
              <br />
              <br />
              <a href="/libraryDatabase" className="rounded px-4 py-2 my-1 bg-blue-500 hover:bg-blue-900 text-white">See a list of books</a>
              <br />
              <br />
              <a href="/libraryDatabase/checkedOut" className="rounded px-4 py-2 my-1 bg-blue-500 hover:bg-blue-900 text-white">See a list of borrowed books</a>
              <form method='post' action='/libraryFunctions/checkoutBook'>
                <br />
                <h1 className="text-2xl text-white">Check Out a Book:</h1>
                <label for='bookID' className='text-white'>Book to Check Out ID:</label>
                <br />
                <input type='number' name='bookID' id='bookID' min='0' className='rounded w-full px-2 py-1 ' />
                <br />
                <label for='studentID' className='text-white'>Student Checking Book Out ID:</label>
                <br />
                <input type='number' name='studentID' id='studentID' min='0' className='rounded w-full px-2 py-1 ' />
                <br />
                <br />
                <input type='submit' value='Check Out Book' className='rounded bg-blue-500 hover:bg-blue-900 text-white px-4 py-2' />
              </form>

              <form method='post' action='/libraryFunctions/returnBook'>
                <br />
                <h1 className="text-2xl text-white">Check In a Book:</h1>
                <label for='bookToReturnID' className='text-white'>Book to Check In ID:</label>
                <br />
                <input type='number' name='bookToReturnID' id='bookToReturnID' min='0' className='rounded w-full px-2 py-1 ' />
                <br />
                <br />
                <input type='submit' value='Check In Book' className='rounded bg-blue-500 hover:bg-blue-900 text-white px-4 py-2' />
              </form>
            </div>
            :
            <div>This page is to Checkout and Checkin books. Please <a href="/login">login</a> as a teacher, librarian or admin to access this page</div>
        }

      </div>
    </div>
  );
}

export default Library;
