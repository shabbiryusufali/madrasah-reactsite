import { useParams } from "react-router-dom";

function LoggedOut() {

  let {error} = useParams();

  let errorInfo = ""

  if(error){
    if(error == "loggedout"){
      errorInfo = "Already logged out"
    }
  }

    return (
      <div className="App">
        
      <br />
      <h1 className="text-center text-6xl">Logout</h1>
      {error ? <div className="text-red-600">Already Logged Out</div> : <div className="text-green-600">Successfully Logged Out</div> }
      </div>
    );
  }
  
  export default LoggedOut;
  