import { useState, useEffect } from 'react';
import '../index.css';

function Header() {
  var [user, setUser] = useState({ id: 0, user_name: "Null", pass: "Null", email: "Null", admin: false, verified: false, fname: "Undefined", lname: "User", random1: "Null", random2: "Null", random3: "Null", mailinglist: false, teacher: false, student: false, alumn: false });
    
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


  return (
    <header className="h-fit rounded-b sticky z-50 top-0 w-full px-1 py-4 flex items-center bg-slate-900">
    <h1 className='px-4 text-white text-xl font-bold'>Madrasah</h1>
      <div className='flex-auto'>
        <a href="/" className='bg-transparent  mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Homepage</a>
        <a href="/library" className='bg-transparent mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Library</a>
        <a href="/articles" className='bg-transparent   mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Blog</a>
        <a href="/information" className='bg-transparent   mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Information</a>
      </div>
      <div className='w-fit'>
    {user.user_name === "Null" ? 
    <>
      <a href="/signup" className='bg-transparent  mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Sign Up</a>
      <a href="/login" className='bg-transparent  mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Login</a>
    </> 
    : 
    <>
<button onClick={async () => {await fetch('/logoutAction', {method:'GET'}).then(window.location.reload(false))}} className='bg-transparent  mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Logout</button>
<a href="/dashboard" className='bg-transparent  mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Dashboard</a>
    </>
      }
        
        </div>
    </header>
  );
}

export default Header;
