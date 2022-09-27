import { useParams } from "react-router-dom";

function SignUp() {

  let {error} = useParams();

  let errorInfo = ""

  if(error){
    if(error === "none"){
      errorInfo = "There is no error"
    }
    if(error === "unmatchpassword"){
      errorInfo = "Those passwords do not match"
    }
    if(error === "userexists"){
      errorInfo = "That email or username is taken"
    }
  }


    return (
      <div className='p-2 sm:px-16'>
        
        <br />
            <h1 className='text-6xl text-center'>Sign Up</h1>
            <br />
            <br />
        <form method='post' action='/signup_action'  className="mx-auto rounded w-1/4 pt-4 bg-slate-400 p-5">
            <div>
            {error ? <p className="text-red-600">{errorInfo}</p> : <></>}
            <label for='fname' className='font-bold text-white my-1'>ITS ID:</label>
            <input type='number' name='id' id='id' className='rounded w-full px-2 py-1 ' />
            <br />
            <label for='fname' className='font-bold text-white my-1'>First Name:</label>
            <input type='text' name='fname' id='fname' className='rounded w-full px-2 py-1 ' />
            <br />
            <label for='lname' className='font-bold text-white my-1'>Last Name:</label>
            <input type='text' name='lname' id='lname' className='rounded w-full px-2 py-1 ' />
            <br />
            <label for='email' className='font-bold text-white my-1'>Email Address:</label>
            <input type='text' name='email' id='email' className='rounded w-full px-2 py-1 ' />
            <br />
            <label for='uname' className='font-bold text-white my-1'>Username:</label>
            <input type='text' name='uname' id='uname' className='rounded w-full px-2 py-1 ' />
            <br />
            <label for='pass' className='font-bold text-white my-1'>Password:</label>
            <input type='password' name='pass' id='pass' className='rounded w-full px-2 py-1 ' />
            <br />
            <label for='passv2' className='font-bold text-white my-1'>Confirm Password</label>
            <input type='password' name='passv2' id='passv2' className='rounded w-full px-2 py-1 ' />
            <br />
            <h1 className="font-bold text-white my-1">Mailing List?</h1>
            <br />
            <label for='mailinglisttrue' className='font-bold text-white my-1'>Yes</label>
            <input type='radio' name='mailinglist' value='true' id='mailinglisttrue' className='rounded mx-2' />
            <br />
            <label for='mailinglistfalse' className='font-bold text-white my-1'>No</label>
            <input type='radio' name='mailinglist' value='false' id='mailinglistfalse' className='rounded mx-2' />
            <br />
            <br />
            <input type='submit' value='Submit' className='rounded bg-blue-500 hover:bg-blue-900 text-white px-4 py-2' />
            </div>
        </form>    
        <br />
        <br />
        <br />
      </div>
    );
  }
  
  export default SignUp;
  