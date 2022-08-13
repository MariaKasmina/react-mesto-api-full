import React from "react";
import {Redirect, Route} from "react-router-dom";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = ({loggedIn, children, path}) => {
    return (
        <Route path={path}>
            {
                loggedIn ? children : <Redirect to="./sign-in"/>
            }
        </Route>
    );
};

export default ProtectedRoute;