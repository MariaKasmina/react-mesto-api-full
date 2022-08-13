import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Register = ({onHandleSubmit}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        onHandleSubmit(password, email);
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <section className="sign-up-form__container">
            <form className="form form_type_signup sign-up-form" name="sign-up-form" onSubmit={handleSubmit}>
                <h3 className="form__title sign-up-form__title">Регистрация</h3>
                <input
                    type="email"
                    id="email"
                    className="form__item sign-up-form__item"
                    name="email-input"
                    placeholder="Email"
                    onChange={handleChangeEmail}
                    required/>
                <input
                    type="password"
                    id="password"
                    className="form__item sign-up-form__item"
                    name="password-input"
                    placeholder="Пароль"
                    onChange={handleChangePassword}
                    required/>
                <button type="submit" className="form__submit-button sign-up-form__submit-btn">Зарегистрироваться</button>
                <p className="sign-up-form__note">Уже зарегистрированы? <Link to="/sign-in" className="sign-up-form__note-link">Войти</Link></p>
            </form>
        </section>
    );
}

export default Register;