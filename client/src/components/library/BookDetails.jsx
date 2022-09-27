import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function BookDetails() {
  let { id } = useParams();
  var [book, setBook] = useState({ id: null, title: "", gradelevel: null, userloanedto: "", userloanedtoid: null, date: "" });
  var [user, setUser] = useState({ id: 0, user_name: "Null", pass: "Null", email: "Null", admin: false, verified: false, fname: "Undefined", lname: "User", random1: "Null", random2: "Null", random3: "Null", mailinglist: false, teacher: false, student: false, alumn: false });

  let deleteButton = `/libraryFunctions/${id}`
  useEffect(
    () => {
      const f = async () => {
        const data = await fetch(`/libraryFunctions/book/${id}`)
        const jsonData = await data.json()
        setBook(jsonData)

      }
      f();
    }, [])



  let loanedDateRaw = book.date.split('T');
  let loanedDateParsed = loanedDateRaw[0].split('-');
  let loanedYear = loanedDateParsed[0]
  let loanedMonth = loanedDateParsed[1]
  loanedMonth = parseInt(loanedMonth)
  let loanedDate = loanedDateParsed[2]

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

  if (loanedMonth === 1) {
    loanedMonth = "January"
  } else if (loanedMonth === 2) {
    loanedMonth = "February"
  } else if (loanedMonth === 3) {
    loanedMonth = "March"
  } else if (loanedMonth === 4) {
    loanedMonth = "April"
  } else if (loanedMonth === 5) {
    loanedMonth = "May"
  } else if (loanedMonth === 6) {
    loanedMonth = "June"
  } else if (loanedMonth === 7) {
    loanedMonth = "July"
  } else if (loanedMonth === 8) {
    loanedMonth = "August"
  } else if (loanedMonth === 9) {
    loanedMonth = "September"
  } else if (loanedMonth === 10) {
    loanedMonth = "October"
  } else if (loanedMonth === 11) {
    loanedMonth = "November"
  } else if (loanedMonth === 12) {
    loanedMonth = "December"
  } else {
    loanedMonth = "Undefined Date"
  }

  let navigate = useNavigate();

  let dateLoanedComplete = `${loanedMonth} ${loanedDate}, ${loanedYear}`



  return (
    <div className="App">
      <div className="p-2 sm:px-16">
        <br />
        <h1 className="text-center text-6xl">Book Details</h1>
        {user.admin ?
          <>
            <button onClick={async () => { await fetch(deleteButton, { method: 'DELETE' }).then(navigate('/libraryDatabase')) }} className=' mx-1 hover:bg-red-900 text-white font-semibold py-2 px-4 bg-red-500 hover:border-transparent rounded'>DELETE</button>
            {/* <a href={editButton} className='mx-1 hover:bg-blue-900 text-white font-semibold hover:text-white py-2 px-4 bg-blue-500 hover:border-transparent rounded'>EDIT</a> */}
          </> : <></>}

        <a href='/libraryDatabase' className='mx-1 hover:bg-blue-900 text-white font-semibold hover:text-white py-2 px-4 bg-blue-500 hover:border-transparent rounded'>BACK</a>
        <div className="bg-white rounded p-3 my-5">

          <h3 className="text-start text-2xl">Book ID: {book.id}</h3>
          <h3 className="text-start text-2xl">Book Title: {book.title}</h3>
          <h3 className="text-start text-2xl">Grade Level: {book.gradelevel}</h3>
          <h3 className="text-start text-2xl">Loaned to: {book.userloanedto}</h3>
          <h3 className="text-start text-2xl">Date Loaned: {dateLoanedComplete}</h3>
          <br />
          <p className="text-start text-lg "></p>
        </div>
      </div>

    </div>

  );
}

export default BookDetails;
