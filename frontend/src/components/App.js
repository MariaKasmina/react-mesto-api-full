import {useEffect, useState} from 'react';
import {Redirect, Route, Switch, useHistory, withRouter} from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import RegisterButton from "./RegisterButton";
import LoginButton from "./LoginButton";
import {authorize, checkTokenValidity, register} from "../utils/authorization";
import AuthorizedHeader from "./AuthorizedHeader";
import InfoTooltip from "./InfoTooltip";
import stateOkImg from "../images/ok.svg"
import stateErrorImg from "../images/not_ok.svg"

function App() {
    const history = useHistory();

    const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
    const [isInfoPopupOpen, setInfoPopupState] = useState(false);

    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);

    const [currentUser, setCurrentUser] = useState(null);
    const [email, setEmail] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useState(false); // признак авторизованности пользователя

    const [isRequestOk, setIsRequestOk] = useState(null); // признак успешности/неуспешности запроса для показа поп-апа

    const [infoToolTipState, setInfoToolTipState] = useState({src: stateOkImg, text: ''});
    const infoTooltipPopup = <InfoTooltip
        isOpen={isInfoPopupOpen}
        {...infoToolTipState}
        name="info-popup"
        onClose={handleCloseInfoTooltipPopup}/>;

    useEffect(() => {
        if (isLoggedIn) {
            Promise.all([api.getInitialCards(), api.getUserInfo()]).then(([initialCards, userInfo]) => {
                setCurrentUser(userInfo);
                setCards(initialCards);
            }).catch((err) => {
                console.log(err);
            })
        }
    }, [isLoggedIn]);

    useEffect(() => {
        checkToken();
    }, [isLoggedIn]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (!isLiked) {
            // Отправляем запрос в API и получаем обновлённые данные карточки
            api.addLike(card._id).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            }).catch((err) => {
                console.log(err);
            });
        } else {
            api.removeLike(card._id).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    function handleCardDelete(card) {
        api.removeCard(card._id).then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupState(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupState(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupState(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setEditAvatarPopupState(false);
        setEditProfilePopupState(false);
        setAddPlacePopupState(false);
        setSelectedCard(null);
    }

    function handleUpdateUser({name, about}) {
        api.updateUserInfo(name, about).then((info) => {
            setCurrentUser(info);
            closeAllPopups();
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleUpdateAvatar({url}) {
        api.changeAvatar(url).then((info) => {
            setCurrentUser(info);
            closeAllPopups();
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleAddPlaceSubmit({name, url}) {
        api.addCard(name, url).then((item) => {
            setCards([item, ...cards]);
            closeAllPopups();
        }).catch((err) => {
            console.log(err);
        })
    }

    /**
     * Обработка регистрации пользователя
     * @param password
     * @param email
     */
    function handleRegister(password, email) {
        register(password, email).then(() => {
            setIsLoggedIn(true);
            setIsRequestOk(true); // устанавливаем значение стейта для последующего определения подходящего поп-апа
            setInfoToolTipState(() => {
                return {text: "Вы успешно зарегистрировались!"}
            })
            setInfoPopupState(true); // показываем подходящий поп-ап
            // ниже, в обработчике handleCloseInfoTooltipPopup перенаправялем на страницу входа после закрытия поп-апа успешной регистрации
        }).catch(() => {
            setIsRequestOk(false);
            setInfoToolTipState(() => {
                return {text: "Что-то пошло не так! Попробуйте ещё раз.", src: stateErrorImg}
            })
            setInfoPopupState(true);
        });
    }

    /**
     * Обработка авторизации пользователя
     * @param password
     * @param email
     */
    function handleAuthorization(password, email) {
        authorize(password, email).then((res) => {
            setIsLoggedIn(true);
            localStorage.setItem('token', res.token);
            history.push("/");
        }).catch(() => {
            setIsRequestOk(false);
            setInfoToolTipState(() => {
                return {text: "Что-то пошло не так! Попробуйте ещё раз.", src: stateErrorImg}
            })
            setInfoPopupState(true);
        })
    }

    /**
     * Проверяем наличие токена и забираем почту для показа в хедере
     */
    function checkToken() {
        const token = localStorage.getItem('token');
        if (token) {
            checkTokenValidity(token).then((res) => {
                setEmail(res.data.email);
                setIsLoggedIn(true);
                history.push("/");
            }).catch(() => {
                setIsLoggedIn(false);
                history.push("/sign-in");
            })
        }
    }

    /**
     * Обработка клика на кнопку Войти, Зарегистрироваться
     * @param path путь редиректа
     */
    function handleClick(path) {
        history.push(`${path}`);
    }

    /**
     * Обработка клика на кнопку Выйти
     * @param path путь редиректа
     */
    function handleLogout(path) {
        handleClick(path);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
    }

    /**
     * Обработка закрытия поп-апа с информацией
     */
    function handleCloseInfoTooltipPopup() {
        if (isRequestOk) { // если ОК, то после закрытия перейдет на страницу входа со страницы регистрации
            history.push("/sign-in");
        }
        setInfoPopupState(false);
        setIsRequestOk(null); // обнуляем стейт выбранного поп-апа
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">
                <div className="root__container">
                    <Switch>
                        <Route exact path="/sign-up">
                            <Header/>
                            <RegisterButton path="/sign-in" onClick={handleClick}/>
                            <Register onHandleSubmit={handleRegister}/>
                            {infoTooltipPopup}
                        </Route>
                        <Route exact path="/sign-in">
                            <Header/>
                            <LoginButton path="/sign-up" onClick={handleClick}/>
                            <Login onHandleSubmit={handleAuthorization}/>
                            {infoTooltipPopup}
                        </Route>
                        <ProtectedRoute
                            path="/"
                            loggedIn={isLoggedIn}>
                            <AuthorizedHeader email={email} path={"/sign-in"} onClick={handleLogout}/>
                            <Main
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                cards={cards}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                            />
                        </ProtectedRoute>
                        <Route exact path="/">
                            {isLoggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
                        </Route>
                    </Switch>
                    <Footer/>
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                      onUpdateUser={handleUpdateUser} submitBtnName="Сохранить"/>

                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                                   onAddPlace={handleAddPlaceSubmit} submitBtnName="Создать"/>

                    <PopupWithForm title="Вы уверены?" name="are_you-sure" onClose={closeAllPopups}
                                   submitBtnName="Сохранить"/>

                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                     onUpdateAvatar={handleUpdateAvatar} submitBtnName="Сохранить"/>

                    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default withRouter(App);
