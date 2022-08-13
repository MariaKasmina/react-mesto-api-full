import React from 'react';
import logo from "../images/logo.svg";
import LogoutButton from "./LogoutButton";

function AuthorizedHeader({path, onClick, email}) {
    return (
        <header className="header header_state_authorized">
            <img src={logo} alt="Логотип" className="header__logo"/>
            <div className="header__auth-data">
                <button className="header__email">
                    {email}
                </button>
                <LogoutButton path={path} onClick={onClick}/>
            </div>
        </header>
    );
}

export default AuthorizedHeader;