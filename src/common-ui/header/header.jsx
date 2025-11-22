import React, { useState, useEffect } from "react";
import './header.scss';
import {useNavigate} from "react-router-dom";
import { getUserAsync } from "../../services/profileApi.js";
import { hasToken } from "../../utils/tokenStorage.js";
import { ROUTES } from "../../constants/routes.js";

const Header = () => {
    const [activeLink, setActiveLink] = useState("Серіали");
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!hasToken()) {
                return;
            }

            try {
                setLoading(true);
                const profile = await getUserAsync();
                setUserProfile(profile);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleClick = (name) => {
        setActiveLink(name);
    };

    const handleAvatarClick = () => {
        navigate(ROUTES.PROFILE);
    };

    const getAvatarDisplay = () => {
        if (loading) {
            return <span>...</span>;
        }
        
        if (userProfile?.imageUrl) {
            return (
                <img 
                    src={userProfile.imageUrl} 
                    alt="Аватар користувача" 
                    className="profile-avatar__image"
                />
            );
        }
        
        if (userProfile?.name) {
            return <span>{userProfile.name.charAt(0).toUpperCase()}</span>;
        }
        
        return <span>?</span>;
    };

    return (
        <header className="app-header">
            <div className="container header__container">
                <div className="header__left">
                    <h1 
                        className="logo" 
                        onClick={() => navigate(ROUTES.MAIN)}
                    >
                        NovaFlix
                    </h1>
                    <nav className="main-nav">
                        <a
                            className={`nav__link ${activeLink === "Головна" ? "nav__link--active" : ""}`}
                            onClick={() => {
                                handleClick("Головна");
                                navigate(ROUTES.MAIN);
                            }}
                        >
                            Головна
                        </a>
                        <a
                            className={`nav__link ${activeLink === "Серіали" ? "nav__link--active" : ""}`}
                            onClick={() => handleClick("Серіали")}
                        >
                            Серіали
                        </a>
                        <a
                            className={`nav__link ${activeLink === "Новинки" ? "nav__link--active" : ""}`}
                            onClick={() => handleClick("Новинки")}
                        >
                            Новинки
                        </a>
                    </nav>
                </div>

                <div className="header__right">
                    {hasToken() && (
                        <button 
                            className="profile-avatar" 
                            aria-label="Профіль"
                            onClick={handleAvatarClick}
                        >
                            {getAvatarDisplay()}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
