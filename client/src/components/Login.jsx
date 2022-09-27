import { useParams } from "react-router-dom";

function Login() {

  let {error} = useParams();
  
  let errorInfo = ""

  if(error){
    if(error == "incorrect"){
      errorInfo = "That password is incorrect"
    } else if (error == "erroroccured") {
      errorInfo = "An error occured, please try again"
    }
  }


    return (
      <div className="App">
      <br />
      <div className="p-2 sm:px-16">
      <h1 className="text-center text-6xl">Login</h1>
      <br />
      <br />
      <form method='post' action='/login_action' className="mx-auto rounded w-1/4 pt-4 bg-slate-400 p-5">
        <div className="my-3">
        <label for='uname' className="font-bold text-white my-1">Username:</label><br />
        <input type='text' id='uname' className='rounded w-full px-2 py-1 ' name="uname"/><br />
        </div>
        <div className="my-3">
        <label for='pass' className="font-bold text-white my-1">Password:</label><br />
        <input type='password' id='pass' className='rounded w-full px-2 py-1 ' name="pass"/><br />
        </div>
        <br />
        
        <input type='submit' value='Login' className="rounded bg-blue-500 hover:bg-blue-900 text-white px-4 py-2" />
      </form>
      <br />
      <br />
      <br />
      {error ? <p className="text-red-500">{errorInfo}</p> : <></>}
      </div>
      </div>
    );
  }
  
  export default Login;
  