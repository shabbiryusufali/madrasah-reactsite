import { useParams } from "react-router-dom";

function UnknownError() {

    
    let params = useParams();

    return (
        <div className="App">
            <div className="p-2 sm:px-16">
                <h1 className="text-center text-6xl">ERROR</h1>
                <p className="text-red-500">Error: an unknown error has occurred</p>
            </div>
        </div>
    );
}

export default UnknownError;
