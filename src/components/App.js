import React from 'react';
import Header from "./layout/Header";
import Home from "./Home";
import {GlobalStyle} from "./styles/GlobalStyle";

const App = () => (
    <>
        <Header/>
        <Home/>
        <GlobalStyle/>
    </>
)

export default App;
