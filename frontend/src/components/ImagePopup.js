import React from 'react';

function ImagePopup({onClose, card}) {
    return (
        <div className={`popup popup_with_image ${card ? "popup_opened" : ""}`}>
            <section className="popup__container">
                <button className="popup__close-button" type="button" onClick={onClose}/>
                <img className="popup__image" src={card ? card.link : "#"} alt="Фото места"/>
                <p className="popup__image-description">{!card ? "" : card.name}</p>
            </section>
        </div>
    );
}

export default ImagePopup;