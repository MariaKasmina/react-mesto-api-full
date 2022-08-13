import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateAvatar, submitBtnName}) {

    const avatarRef = React.useRef(null);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateAvatar({
            url: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="change-profile-image"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitBtnName={submitBtnName}>
            <input
                type="url"
                id="profileImg"
                className="form__item"
                name="image-url-input"
                placeholder="Ссылка на картинку"
                ref={avatarRef}
                required/>
            <span className="form__input-error image-url-input-error" id='profileImgUrlInputError'/>
        </PopupWithForm>
    );
}

export default EditProfilePopup;