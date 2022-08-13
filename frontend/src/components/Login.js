import React, {useState} from 'react';

const Login = ({onHandleSubmit}) => {

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
                <h3 className="form__title sign-up-form__title">Вход</h3>
                <input
                    type="email"
                    id="email"
                    className="form__item sign-up-form__item"
                    name="email-input"
                    placeholder="Email"
                    onChange={handleChangeEmail}
                    required/>
                {/* <span className="form__input-error email-input-error" id='emailInputError'/>*/}
                <input
                    type="password"
                    id="password"
                    className="form__item sign-up-form__item"
                    name="password-input"
                    placeholder="Пароль"
                    onChange={handleChangePassword}
                    required/>
                {/*<span className="form__input-error email-input-error" id='emailInputError'/>*/}
                <button type="submit" className="form__submit-button sign-up-form__submit-btn">Войти</button>
            </form>
        </section>
    );
}

export default Login;