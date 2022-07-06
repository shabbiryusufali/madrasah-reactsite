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
      <div className="p-2">
      <h1 className="text-center text-6xl">Login</h1>
      <br />
      <br />
      <form method='post' action='/login_action'>
        <label for='uname' className="text-white">Username:</label><br />
        <input type='text' id='uname' className='w-full rounded' name="uname"/><br />
        <label for='pass' className="text-white">Password:</label><br />
        <input type='password' id='pass' className='w-full rounded' name="pass"/><br />
        <br />
        <input type='submit' value='Login' className="rounded bg-blue-500 hover:bg-blue-900 text-white px-4 py-2" />
      </form>
      {error ? <p className="text-red-500">{errorInfo}</p> : <></>}
      </div>
      </div>
    );
  }
  
  export default Login;
  