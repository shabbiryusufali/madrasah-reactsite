import { useState, useEffect } from "react";

function UserList() {
  var [users, setUsers] = useState({results:[]});
  var [usersFiltered, setUsersFiltered] = useState([]);
  useEffect(
    () => {
        const f = async () => {
            const data = await fetch(`/databaseFunctions`)
            const jsonData = await data.json()
            setUsers(jsonData)
            setUsersFiltered(jsonData.results)
            
        }
        f();
    }, [])


    usersFiltered.forEach(user =>{    
      user.link = `/database/${user.id}`
    })

    const filterUsers = e => {
      var value = e.target.value
      setUsersFiltered(
        users.results.filter(item => {
        if(item.user_name.toLowerCase().includes(value.toLowerCase()) || item.id === parseInt(value) || item.fname.toLowerCase().includes(value.toLowerCase())
        || item.lname.toLowerCase().includes(value.toLowerCase()) || item.id === parseInt(value)){
          return true
        } else { return false }
      }))
    }



  return (
    <div className="blog p-2">
      <br />
      <h1 className="text-center text-6xl">List of Users</h1>
      <br />
      <br />
      <h2 className="text-white">Filter Users</h2>
      <input type='text' name='filterUsers' id='filterUsers' onChange={filterUsers} className='rounded w-full'/>
    <br />
    <br />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Username</th>
            <th scope="col" className="px-6 py-3">Fullname</th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
      {usersFiltered.map(user => {
        return(
        <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" className="px-6 py-4">{user.id}</th>
        <td className="px-6 py-4">{user.user_name}</td>
          <td  className="px-6 py-4">
          {user.fname} {user.lname}
          </td>
          <td className="text-gray-500 px-6 py-4"><a href={user.link} key={user.id} >Read More</a></td>
        </tr>)
      })}
      </tbody>
      </table>
      </div>
    </div>
  );
}

export default UserList;
