import React, { useState } from "react";
import './header.scss';

const Header = () => {
    const [activeLink, setActiveLink] = useState("Серіали");

    const handleClick = (name) => {
        setActiveLink(name);
    };

    return (
        <header className="app-header">
            <div className="container header__container">
                <div className="header__left">
                    <h1 className="logo">NovaFlix</h1>
                    <nav className="main-nav">
                        <a
                            href="#"
                            className={`nav__link ${activeLink === "Головна" ? "nav__link--active" : ""}`}
                            onClick={() => handleClick("Головна")}
                        >
                            Головна
                        </a>
                        <a
                            href="#"
                            className={`nav__link ${activeLink === "Серіали" ? "nav__link--active" : ""}`}
                            onClick={() => handleClick("Серіали")}
                        >
                            Серіали
                        </a>
                        <a
                            href="#"
                            className={`nav__link ${activeLink === "Новинки" ? "nav__link--active" : ""}`}
                            onClick={() => handleClick("Новинки")}
                        >
                            Новинки
                        </a>
                    </nav>
                </div>

                <div className="header__right">
                    <button className="profile-avatar" aria-label="Профіль">
                        ?
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
