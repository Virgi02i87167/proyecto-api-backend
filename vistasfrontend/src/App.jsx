import { useState } from "react";
import { Pagination } from "./components/Pagination";
import { MoviesList } from "./components/MoviesList";


function App(){
    const [count, setCount] = useState(0);

    return(
        <div className="App">
            <h1 className="title">Peliculas</h1>

            <MoviesList />
        </div>
    );
};

export default App;