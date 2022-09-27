import { useParams } from "react-router-dom";

function NotFound() {

    
    let params = useParams();

    return (
        <div className="App">
            <div className="p-2 sm:px-16">
                <h1 className="text-center text-6xl">404</h1>
                <p className="text-red-500">Error 404: "/{params.getQuery}" not found!</p>
            </div>
        </div>
    );
}

export default NotFound;
