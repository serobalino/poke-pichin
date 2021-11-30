import * as React from "react";
import {Routes, Route, Link} from "react-router-dom";
import Home from "./screens/Home";

export default function App() {


    return (
        <Routes>
            <Route path="/poke-pichin">
                <Route index element={<Home/>}/>
                <Route path="*" element={<NoMatch/>}/>
            </Route>
        </Routes>
    );
}

function NoMatch() {
    return (
        <div>
            <h2>No hay nada aquí</h2>
            <p>
                <Link to="/">Volver al Inicio</Link>
            </p>
        </div>
    );
}
