import { useEffect, useState } from "react";
function AddBook() {

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
        <div className='App'>
            <div className='p-2'>

                <h1 className='text-6xl text-center'>New Book</h1>
                <br />
                <br />
                <a href='/library' className='rounded px-4 py-2 bg-blue-500 hover:bg-blue-900 text-white'>Back</a>

                {user.admin ?
                    <form method='post' action='/libraryFunctions/addBook'>
                        <br />
                        <label for='newBookID' className='text-white'>Book ID:</label>
                        <br />
                        <input type='number' name='newBookID' id='newBookID' min='0' className='rounded w-full px-2 py-1 ' />
                        <br />
                        <label for='newBookTitle' className='text-white'>Book Title:</label>
                        <br />
                        <input type='text' name='newBookTitle' id='newBookTitle' className='rounded w-full px-2 py-1 ' />
                        <br />
                        <label for='newBookGrade' className='text-white'>Book Grade:</label>
                        <br />
                        <input type='number' name='newBookGrade' id='newBookGrade' min='0' max='10' className='rounded w-full px-2 py-1 ' />
                        <br />
                        <br />
                        <input type='submit' value='Submit' className='rounded bg-blue-500 hover:bg-blue-900 text-white px-4 py-2' />
                    </form> : <div className="text-red-500">Must be an admin to add books</div>}
            </div>
        </div>
    );
}

export default AddBook;
