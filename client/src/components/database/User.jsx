import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function User() {
  let { id } = useParams();
  var [user, setUser] = useState({
    id: null,
    user_name: "Null",
    email: "Null",
    admin: false,
    verified: false,
    fname: "Undefined",
    lname: "User",
    random1: "Null",
    random2: "Null",
    random3: "Null",
    mailinglist: false,
    teacher: false,
    student: false,
    alumn: false,
  });

  var [activeUser, setActiveUser] = useState({
    id: null,
    user_name: "Null",
    email: "Null",
    admin: false,
    verified: false,
    fname: "Undefined",
    lname: "User",
    random1: "Null",
    random2: "Null",
    random3: "Null",
    mailinglist: false,
    teacher: false,
    student: false,
    alumn: false,
  });

  let deleteButton = `/databaseFunctions/${id}`;
  let verifyButton = `/verifyUser/${id}`;
  let revokeVerifyButton = `/revokeVerify/${id}`;
  let adminButton = `/adminUser/${id}`;
  let teacherButton = `/teacherUser/${id}`;
  let unteacherButton = `/unteacherUser/${id}`;
  let studentButton = `/studentUser/${id}`;
  let unstudentButton = `/unstudentUser/${id}`;
  let alumnButton = `/alumnUser/${id}`;
  let unalumnButton = `/unalumnUser/${id}`;
  let librarianButton = `/librarianUser/${id}`;
  let delibrarianButton = `/delibrarianUser/${id}`;
  let resetPasswordButton = `/resetPassword/${id}`;
  let redirectLink = `/database/${id}`;

  useEffect(() => {
    const f = async () => {
      const data = await fetch(`/viewUser/${id}`);
      const jsonData = await data.json();
      setUser(jsonData);
    };
    f();
  }, [id]);



  useEffect(
    () => {
      const f = async () => {
        const data = await fetch(`/getActiveUser`)
        const jsonData = await data.json()
        if (jsonData) {
          setActiveUser(jsonData)
        } else {

        }
      }
      f();
    }, [])


  let navigate = useNavigate();

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="App">
      <div className="p-2 sm:px-16">
        <br />
        <h1 className="text-center text-6xl">User: <span className="text-green-500">{user.id}</span></h1>
        { activeUser.admin ? <>
        <button
          onClick={async () => {
            await fetch(deleteButton, { method: "DELETE" }).then(navigate("/"));
          }}
          className="mx-1 hover:bg-red-900 font-semibold text-white py-2 px-4  bg-red-500 rounded"
        >
          DELETE
        </button>
        <a
          href="/database"
          className=" mx-1 hover:bg-blue-900 font-semibold text-white py-2 px-4  bg-blue-500  rounded"
        >
          BACK
        </a>
        <div className="bg-white rounded p-3 my-5">
          <h3 className="text-start text-2xl">Admin: {user.user_name}</h3>
          <h3 className="text-start text-2xl">
            Full Name: {user.fname} {user.lname}
          </h3>
          <h3 className="text-start text-2xl">Email: {user.email}</h3>
          <h3 className="text-start text-2xl">
            Verified: {user.verified ? <span className="text-blue-500">True</span> : <span className="text-red-500">False</span>}
          </h3>
          <h3 className="text-start text-2xl">
            Admin: {user.admin ? <span className="text-blue-500">True</span> : <span className="text-red-500">False</span>}
          </h3>
          <h3 className="text-start text-2xl">
            Teacher: {user.teacher ? <span className="text-blue-500">True</span> : <span className="text-red-500">False</span>}
          </h3>
          <h3 className="text-start text-2xl">
            Student: {user.student ? <span className="text-blue-500">True</span> : <span className="text-red-500">False</span>}
          </h3>
          <h3 className="text-start text-2xl">
            Alumn: {user.alumn ? <span className="text-blue-500">True</span> : <span className="text-red-500">False</span>}
          </h3>
          <h3 className="text-start text-2xl">
            Librarian: {user.librarian ? <span className="text-blue-500">True</span> : <span className="text-red-500">False</span>}
          </h3>
          <h3 className="text-start text-2xl">
            Mailing List: {user.mailinglist ? <span className="text-blue-500">True</span> : <span className="text-red-500">False</span>}
          </h3>
          <br />
          {!user.verified ? (
            <>
              <button
                onClick={async () => {
                  await fetch(verifyButton, { method: "POST" }).then(
                    refreshPage
                  );
                }}
                className="bg-transparent  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                VERIFY
              </button>
              <br />
              <br />
            </>
          ) : (
            <>
              <button
                onClick={async () => {
                  await fetch(revokeVerifyButton, { method: "POST" }).then(
                    refreshPage
                  );
                }}
                className="bg-transparent  hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              >
                REVOKE VERIFICATION
              </button>
              <br />
              <br />
            </>
          )}

          {!user.admin ? (
            <>
              <button
                onClick={async () => {
                  await fetch(adminButton, { method: "POST" }).then(
                    refreshPage
                  );
                }}
                className="bg-transparent  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                GIVE ADMIN
              </button>
              <br />
              <br />
            </>
          ) : (
            <></>
          )}
          {!user.teacher ? (
            <>
              <button
                onClick={async () => {
                  await fetch(teacherButton, { method: "POST" }).then(
                    refreshPage
                  );
                }}
                className="bg-transparent  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                SET AS TEACHER
              </button>
              <br />
              <br />
            </>
          ) : (
            <>
              <button
                onClick={async () => {
                  await fetch(unteacherButton, { method: "POST" }).then(
                    refreshPage
                  );
                }}
                className="bg-transparent  hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              >
                REMOVE TEACHER STATUS
              </button>
              <br />
              <br />
            </>
          )}

          {!user.student ? (
            <>
              <button
                onClick={async () => {
                  await fetch(studentButton, { method: "POST" }).then(
                    refreshPage
                  );
                }}
                className="bg-transparent  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                SET AS STUDENT
              </button>
              <br />
              <br />
            </>
          ) : (
            <>
              <button
                onClick={async () => {
                  await fetch(unstudentButton, { method: "POST" }).then(
                    refreshPage
                  );
                }}
                className="bg-transparent  hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              >
                REMOVE STUDENT STATUS
              </button>
              <br />
              <br />
            </>
          )}

          {!user.alumn ? (
            <>
              <button
                onClick={async () => {
                  await fetch(alumnButton, { method: "POST" }).then(
                    refreshPage
                  );
                }}
                className="bg-transparent  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                SET AS ALUMN
              </button>
              <br />
              <br />
            </>
          ) : (
            <>
              <button
                onClick={async () => {
                  await fetch(unalumnButton, { method: "POST" }).then(
                    refreshPage
                  );
                }}
                className="bg-transparent  hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              >
                REMOVE ALUMN STATUS
              </button>
              <br />
              <br />
            </>
          )}

          {!user.librarian ? (
            <>
              <button
                onClick={async () => {
                  await fetch(librarianButton, { method: "POST" }).then(
                    refreshPage
                  );
                }}
                className="bg-transparent  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                SET AS LIBRARIAN
              </button>
              <br />
              <br />
            </>
          ) : (
            <>
              <button
                onClick={async () => {
                  await fetch(delibrarianButton, { method: "POST" }).then(
                    refreshPage
                  );
                }}
                className="bg-transparent  hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              >
                REMOVE LIBRARIAN STATUS
              </button>
              <br />
              <br />
            </>
          )}
          <button
            onClick={async () => {
              await fetch(resetPasswordButton, { method: "POST" }).then(
                refreshPage
              );
            }}
            className="bg-transparent  hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          >
            RESET PASSWORD
          </button>
          <br />
          <br />

          <br />
        </div>
        </> : <p>Please login as admin to view user details</p>}
      </div>
    </div>
  );
}

export default User;
