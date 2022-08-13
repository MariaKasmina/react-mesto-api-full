import React from 'react';

function InfoTooltip({name, onClose, text, isOpen, src}) {
    return (
        <div className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}>
            <section className="popup__container">
                <button className="popup__close-button" type="button" onClick={onClose}/>
                <div className="info-popup__content">
                    <img className="info-popup__image" src={src} alt="Статус"/>
                    <p className="info-popup__text">{text}</p>
                </div>
            </section>
        </div>
    );
}

export default InfoTooltip;