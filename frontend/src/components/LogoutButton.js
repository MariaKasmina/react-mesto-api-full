function LogoutButton({path, onClick}) {

    return (
        <button onClick={() => onClick(path)} className="header__logout-button">
            Выйти
        </button>
    );
}

export default LogoutButton;