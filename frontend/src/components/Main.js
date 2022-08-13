import React from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__info-row">
                    <div className="profile__image-container" onClick={onEditAvatar}>
                        <img className="profile__image" alt="Аватар"
                             src={currentUser ? currentUser.avatar : "#"}/>
                    </div>
                    <div className="profile__info-column">
                        <div className="profile__info-top-row">
                            <h1 className="profile__info-name">{currentUser ? currentUser.name : ""}</h1>
                            <button type="button" className="profile__edit-button" onClick={onEditProfile}>
                            </button>
                        </div>
                        <p className="profile__info-description">{currentUser ? currentUser.about : ""}</p>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}/>
            </section>
            <section className="elements">
                {(cards.length === 0) ? (<p className="elements__no-items">Добавьте своё первое место!</p>) : (
                    cards.map((card) => {
                        return (
                            <Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={card._id}/>
                        );
                    })
                )}
            </section>
        </main>
    );
}

export default Main;