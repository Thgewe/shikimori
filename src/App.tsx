import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AppRouter from "./components/AppRouter";

// TODO: error page

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Layout>
                    <AppRouter />
                </Layout>
            </div>
        </BrowserRouter>
    );
}

export default App;
