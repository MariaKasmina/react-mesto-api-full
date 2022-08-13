function RegisterButton({path, onClick}) {

    return (
        <button onClick={() => onClick(path)} className="header__button">
            Войти
        </button>
    );
}

export default RegisterButton;