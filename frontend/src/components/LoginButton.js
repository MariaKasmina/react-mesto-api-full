function LoginButton({path, onClick}) {

    function handleLoginClick() {
        onClick(path)
    }

    return (
        <button onClick={handleLoginClick} className="header__button">
            Регистрация
        </button>
    );
}

export default LoginButton;