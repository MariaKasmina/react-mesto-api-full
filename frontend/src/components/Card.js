import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    function checkIfItsOwnCard() {
        return card.owner._id === currentUser._id;
    }

    function checkIfItsLikedCard() {
        return card.likes.some(i => i._id === currentUser._id);
    }

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick(){
        onCardDelete(card);
    }

    return (
        <figure className="element">
            <img className="element__image" src={card.link} alt="место" onClick={handleClick}/>
            <figcaption className="element__caption">
                <h3 className="element__caption-text">{card.name}</h3>
                <div className="element__heart-column">
                    <button type="button" className={`element__heart ${checkIfItsLikedCard() && 'element__heart_active'}`} onClick={handleLikeClick}/>
                    <span className="element__heart-count">{card.likes.length}</span>
                </div>
            </figcaption>
            <button className={`${checkIfItsOwnCard() ? 'element__delete-btn' : 'element__delete-btn_hidden'}`} onClick={handleDeleteClick} type="button"/>
        </figure>
    );
}

export default Card;