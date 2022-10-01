import { useState, useEffect } from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
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
    <nav className="h-fit rounded-b sticky z-50 flex flex-wrap items-center justify-between px-2 py-3 bg-slate-900 mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            to="/"
          >
            Madrasah
              </Link>
          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-slate-500 rounded bg-slate-600 block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <img src='../menu.png' alt='Burger Menu Button' />
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex lg:items-center flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/"
              >
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/library"
              >
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Library</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/articles"
              >
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Blog</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/resources"
              >
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Resources</span>
              </Link>
            </li>
            {user.user_name === "Null" ?
              <>
                <li className="nav-item">
                  <form action="/signup">
                    <input type='submit'  value='Signup' className='cursor-pointer bg-transparent lg:mx-1 mx-3 my-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' />
                  </form>
                </li>
                <li className="nav-item">
                  <form action="/login">
                    <input type='submit'  value='Login' className='cursor-pointer bg-transparent  lg:mx-1 mx-3 my-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' />
                  </form>
                </li>
              </>
              :
              <>
                <li className="nav-item">
                  {/* <form action="/dashboard"> */}
                    <Link to='/dashboard'value='Dashboard' className='cursor-pointer bg-transparent my-1  lg:mx-1 mx-3 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' />
                  {/* </form> */}
                </li>
                <li className="nav-item">
                  <button onClick={async () => { await fetch('/logoutAction', { method: 'GET' }).then(window.location.reload(false)) }} className='bg-transparent my-1 lg:mx-1  mx-3 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Logout</button>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>


  );
}

export default Header;
