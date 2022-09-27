import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ChangeEmailForm from "./dashboardForms/ChangeEmailForm";
import ChangeFNameForm from "./dashboardForms/ChangeFNameForm";
import ChangeLNameForm from "./dashboardForms/ChangeLNameForm";
import ChangePasswordForm from "./dashboardForms/ChangePasswordForm";
import MailingListForm from "./dashboardForms/MailingListForm";

function Dashboard() {

  var [user, setUser] = useState({ id: 0, user_name: "Null", pass: "Null", email: "Null", admin: false, verified: false, fname: "Undefined", lname: "User", random1: "Null", random2: "Null", random3: "Null", mailinglist: false, teacher: false, student: false, alumn: false });
  var [changeEmail, setChangeEmail] = useState(false)  
  var [changePassword, setChangePassword] = useState(false)  
  
  
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

  const toggleEmail = () => {
    setChangeEmail(!changeEmail);
  }

  const togglePassword = () => {
    setChangePassword(!changePassword);
  }

  let {status} = useParams();
  let statusInfo = ""

  if(status){
    if(status == "success"){
      statusInfo = "User Successfully Created"
    }
  }

  return (
  //  user ? 
    <div className="p-2 sm:px-16">
      <div class="text-start w-full">
        <br />
        <h1 className="text-center text-6xl">Dashboard</h1>
        <br />
        <br />
        {user.user_name == "Null" ? <div><p className='text-red-500'>Not Logged In</p></div> : <div>
        {status ? <p className=" text-green-500">{statusInfo}</p> : <></>}
        {user.admin ? 
          <div class="text-center rounded bg-blue-300">
            <h2 className="text-3xl p-2 font-semibold">ADMIN CONTROLS</h2>
            <br />
            <p>
              <a class="rounded px-4 py-2 text-white bg-transparent hover:border-transparent hover:bg-black hover:text-white border border-solid border-black" href="/database">List Of Users</a> | <a class="rounded px-4 py-2 text-white hover:border-transparent hover:bg-black hover:text-white bg-transparent border border-solid border-black" href="/articles/new">Make a Blog Post</a><br /><br />
            </p>
          </div> : <></>}
          <br />
          <br />
          <br />      
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left  text-gray-400">
              <thead className="text-sm uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Username</th>
                  <th scope="col" className="px-6 py-3">First Name</th>
                  <th scope="col" className="px-6 py-3">Last Name</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-gray-800 border-gray-700">
                  <td scope="col" className="text-gray-500 px-6 py-4">{user.user_name}</td>
                  <td className="text-gray-500 px-6 py-4">{user.fname}</td>
                  <td className="text-gray-500 px-6 py-4">{user.lname}</td>
                  <td className="text-gray-500 px-6 py-4">{user.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {changeEmail? <button className="py-2 px-4 rounded bg-blue-500 my-1 mx-2 font-semibold text-white" onClick={toggleEmail}>Close</button> :
          <button className="py-2 px-4 rounded bg-blue-500 my-1 mx-2 font-semibold text-white" onClick={toggleEmail}>Change Email</button> 
          }
          {changePassword? <button className="py-2 px-4 rounded bg-blue-500 my-1 mx-2 font-semibold text-white" onClick={togglePassword}>Close</button> :
          <button className="py-2 px-4 rounded bg-blue-500 my-1 mx-2 font-semibold text-white" onClick={togglePassword}>Change Password</button> }
            <br />
    {/* <ChangeFNameForm /> */}
            {/* <br /> */}
    {/* <ChangeLNameForm /> */}
            {/* <br /> */}
        {changeEmail? <ChangeEmailForm /> : <></>}
            <br />
        {changePassword? <ChangePasswordForm /> : <></>}
            <br />
           {/* <MailingListForm /> */}
           </div>
        }
          </div>
          </div>
        );
}

        export default Dashboard;
