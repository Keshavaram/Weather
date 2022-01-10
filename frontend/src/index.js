import {Weather} from "./App";
import React from "react";
import ReactDOM from 'react-dom'
import {Route, BrowserRouter} from "react-router-dom";

function App()
{
    return(
        <BrowserRouter>
            <Route path={"/Monday"} render={(props) => <Weather day={"Monday"}{...props}/>}/>
            <Route path={"/Tuesday"} render={(props) => <Weather day={"Tuesday"}{...props}/>}/>
            <Route path={"/Wednesday"} render={(props) => <Weather day={"Wednesday"}{...props}/>}/>
            <Route path={"/Thursday"} render={(props) => <Weather day={"Thursday"}{...props}/>}/>
            <Route path={"/Friday"} render={(props) => <Weather day={"Friday"}{...props}/>}/>
            <Route path={"/Saturday"} render={(props) => <Weather day={"Saturday"}{...props}/>}/>
            <Route path={"/Sunday"} render={(props) => <Weather day={"Sunday"}{...props}/>}/>
        </BrowserRouter>
    )
}

ReactDOM.render(<App/>,document.getElementById('root'));
