import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hasToken } from "../../utils/tokenStorage.js";
import "./welcome-page.scss";

const WelcomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (hasToken()) {
            navigate("/main", { replace: true });
        }
    }, [navigate]);

    const handleLoginClick = () => {
        navigate("/auth");
    };

    return (
        <div className="welcome-page">
            <div className="welcome-page__background"></div>
            
            <header className="welcome-page__header">
                <div className="welcome-page__logo">NovaFlix</div>
                <div className="welcome-page__header-button">
                    <div className="welcome-page__login-btn" onClick={handleLoginClick}>
                        Увійти
                    </div>
                </div>
            </header>

            <div className="welcome-page__hero">
                <div className="welcome-page__hero-images">
                    
                    <img className="welcome-page__hero-image" alt="" />
                    
                    <img className="welcome-page__hero-wave" alt="" />
                </div>
                
                <div className="welcome-page__hero-content">
                    <div className="welcome-page__hero-overlay"></div>
                    <h1 className="welcome-page__hero-title">
                        Фільми, серіали й інший контент без обмежень
                    </h1>
                    <div className="welcome-page__hero-subtitle">
                        Для жителів України безкоштовно
                    </div>
                    <p className="welcome-page__hero-description">
                        Готові до перегляду? Ввійдіть в акаунт або зареєструйтесь для того щоб почати дивитися улюблені фільми прямо зараз!
                    </p>
                    <div className="welcome-page__hero-button">
                        <div className="welcome-page__login-btn" onClick={handleLoginClick}>
                            Увійти
                        </div>
                    </div>
                </div>
            </div>

            <div className="welcome-page__recent-news">
                <h2 className="welcome-page__section-title">Нещодавні новинки</h2>
                <div className="welcome-page__films-grid">
                    <div className="welcome-page__film-card">
                        <img 
                            className="welcome-page__film-poster" 
                            src="https://image.tmdb.org/t/p/original/5zijH3ZlxwQj77unl1nFdWgeDr6.jpg"
                            alt="Вбивця демонів: Замок нескінченності"
                        />
                        <div className="welcome-page__film-title">Вбивця демонів: Замок нескінченності</div>
                    </div>
                    <div className="welcome-page__film-card">
                        <img 
                            className="welcome-page__film-poster" 
                            src="https://aninews.in.ua/wp-content/uploads/2025/03/chainsaw-man-visual2-696x984-1.jpg"
                            alt="Людина безнопила"
                        />
                        <div className="welcome-page__film-title">Людина безнопила</div>
                    </div>
                    <div className="welcome-page__film-card">
                        <img 
                            className="welcome-page__film-poster" 
                            src="https://image.tmdb.org/t/p/original/a3SWR8va3OmUVnVL05CJqXrR1GQ.jpg"
                            alt="Атака титанів: Остання атака"
                        />
                        <div className="welcome-page__film-title">Атака титанів: Остання атака</div>
                    </div>
                    <div className="welcome-page__film-card">
                        <img 
                            className="welcome-page__film-poster" 
                            src="https://tse1.mm.bing.net/th/id/OIP.NvZfQGlZef0efD7hroyXuQHaKI?rs=1&pid=ImgDetMain&o=7&rm=3"
                            alt="Брама штейна"
                        />
                        <div className="welcome-page__film-title">Брама штейна</div>
                    </div>
                </div>
            </div>

          
            <div className="welcome-page__faq">
                <div className="welcome-page__faq-column">
                    <div className="welcome-page__faq-item">Поширені запитання</div>
                    <div className="welcome-page__faq-item">Зв'язки з інвесторами</div>
                    <div className="welcome-page__faq-item">Конфіденційність</div>
                    <div className="welcome-page__faq-item">Перевірка швидкості</div>
                </div>
                <div className="welcome-page__faq-column">
                    <div className="welcome-page__faq-item">Довідковий центр</div>
                    <div className="welcome-page__faq-item">Вакансії</div>
                    <div className="welcome-page__faq-item">Файли cockie</div>
                    <div className="welcome-page__faq-item">Юридичні повідомлення</div>
                </div>
                <div className="welcome-page__faq-column">
                    <div className="welcome-page__faq-item">Обліковий запис</div>
                    <div className="welcome-page__faq-item">Спосіб перегляду</div>
                    <div className="welcome-page__faq-item">Корпоративна інформація</div>
                    <div className="welcome-page__faq-item">Зв'язатися з нами</div>
                </div>
                <div className="welcome-page__faq-contact">
                    Маєте запитання? Зателефонуйте за номером +380 95 621 51 17
                </div>
            </div>

            <div className="welcome-page__footer">
                NovaFlix зроблено в Україні для українців
            </div>
        </div>
    );
};

export default WelcomePage;
