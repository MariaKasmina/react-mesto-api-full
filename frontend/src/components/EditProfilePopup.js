import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, submitBtnName}) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(() => currentUser ? currentUser.name : '');
        setDescription(() => currentUser ? currentUser.about : '');
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="change_personal-info"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitBtnName={submitBtnName}>
            <input
                type="text"
                id="name"
                className="form__item"
                name="name-input"
                value={name}
                onChange={handleChangeName}
                minLength="2"
                maxLength="40"
                required/>
            <span className="form__input-error name-input-error" id='nameInputError'/>
            <input
                type="text"
                id="additionalInfo"
                className="form__item"
                name="additional-info-input"
                value={description}
                onChange={handleChangeDescription}
                minLength="2"
                maxLength="200"
                required/>
            <span className="form__input-error additional-info-input-error" id='additionalInfoInputError'/>
        </PopupWithForm>
    );
}

export default EditProfilePopup;