import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onAddPlace, submitBtnName}) {

    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeUrl(e) {
        setUrl(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
            name,
            url
        });
        setName('');
        setUrl('');
    }

    return (
        <PopupWithForm
            title="Новое место"
            name="add_new-place"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitBtnName={submitBtnName}>
            <input
                type="text"
                id="place"
                className="form__item"
                name="place-input"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                value={name}
                onChange={handleChangeName}
                required/>
            <span className="form__input-error place-input-error" id='placeInputError'/>
            <input
                type="url"
                id="imageUrl"
                className="form__item"
                name="image-url-input"
                placeholder="Ссылка на картинку"
                value={url}
                onChange={handleChangeUrl}
                required/>
            <span className="form__input-error image-url-input-error" id='imageUrlInputError'/>
        </PopupWithForm>
    );
}

export default EditProfilePopup;