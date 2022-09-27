function Unauthorized() {
    return (
        <div className="App">
            <div className="p-2 sm:px-16">
                <h1 className="text-center text-6xl">Unauthorized</h1>
                <p className="text-red-500">Error: an unauthorized action was requested</p>
            </div>
        </div>
    );
}

export default Unauthorized;
