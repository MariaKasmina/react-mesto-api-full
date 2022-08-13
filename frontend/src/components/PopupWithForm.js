import React from 'react';

function PopupWithForm({name, onClose, onSubmit, title, submitBtnName, isOpen, children}) {
    return (
        <div className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}>
            <section className="popup__container">
                <button className="popup__close-button" type="button" onClick={onClose}/>
                <form className="form form_type_edit" name={`form-on-popup-${name}`} onSubmit={onSubmit}>
                    <h3 className="form__title">{title}</h3>
                    {children}
                    <button type="submit" className="form__submit-button">{submitBtnName}</button>
                </form>
            </section>
        </div>
    );
}

export default PopupWithForm;