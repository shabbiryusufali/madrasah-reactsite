import { useParams } from "react-router-dom";

function SignUp() {

  let {error} = useParams();

  let errorInfo = ""

  if(error){
    if(error == "none"){
      errorInfo = "There is no error"
    }
    if(error == "unmatchpassword"){
      errorInfo = "Those passwords do not match"
    }
    if(error == "userexists"){
      errorInfo = "That email or username is taken"
    }
  }


    return (
      <div className="App">
        <form method='post' action='/signup_action'>
            <div className='p-2'>
            <br />
            <h1 className='text-6xl text-center'>Sign Up</h1>
            <br />
            <br />
            {error ? <p className="text-red-600">{errorInfo}</p> : <></>}
            <label for='fname' className='text-white'>First Name:</label>
            <br />
            <input type='text' name='fname' id='fname' className='rounded w-full px-2 py-1 ' />
            <br />
            <label for='lname' className='text-white'>Last Name:</label>
            <br />
            <input type='text' name='lname' id='lname' className='rounded w-full px-2 py-1 ' />
            <br />
            <label for='email' className='text-white'>Email Address:</label>
            <input type='text' name='email' id='email' className='rounded w-full px-2 py-1 ' />
            <br />
            <label for='uname' className='text-white'>Username:</label>
            <br />
            <input type='text' name='uname' id='uname' className='rounded w-full px-2 py-1 ' />
            <br />
            <label for='pass' className='text-white'>Password:</label>
            <br />
            <input type='password' name='pass' id='pass' className='rounded w-full px-2 py-1 ' />
            <br />
            <label for='passv2' className='text-white'>Confirm Password</label>
            <br />
            <input type='password' name='passv2' id='passv2' className='rounded w-full px-2 py-1 ' />
            <br />
            <h1>Mailing List?</h1>
            <br />
            <label for='mailinglisttrue' className='text-white'>Yes</label>
            <br />
            <input type='radio' name='mailinglist' value='true' id='mailinglisttrue' className='rounded w-full px-2 py-1 ' />
            <br />
            <label for='mailinglistfalse' className='text-white'>No</label>
            <br />
            <input type='radio' name='mailinglist' value='false' id='mailinglistfalse' className='rounded w-full px-2 py-1 ' />
            <br />
            <br />
            <input type='submit' value='Submit' className='rounded bg-blue-500 hover:bg-blue-900 text-white px-4 py-2' />
            </div>
        </form>    
      </div>
    );
  }
  
  export default SignUp;
  