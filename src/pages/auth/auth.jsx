import React, { useState } from "react";
import "./auth.scss";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(false); // ← просто булеве значення

    return (
        <div className="login-page">
            <div className="logo">
                <h1>NovaFlix</h1>
            </div>

            <div className="login-container">
                {isLogin ? (
                    <div className="login-box">
                        <h2>Увійти</h2>
                        <form>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Електронна пошта або номер телефону"
                                />
                            </div>
                            <div className="form-group">
                                <input type="password" placeholder="Пароль" />
                            </div>

                            <button type="submit" className="btn btn-login">
                                Увійти
                            </button>

                            <div className="divider">АБО</div>

                            <button
                                type="button"
                                className="btn btn-alt"
                                onClick={() => setIsLogin(false)} // ← повертаємось до реєстрації
                            >
                                Зареєструватися
                            </button>

                            <div className="forgot">
                                <a href="#">Забули пароль?</a>
                            </div>

                            <div className="remember">
                                <input type="checkbox" id="remember-me" />
                                <label htmlFor="remember-me">
                                    Запам'ятати мене
                                </label>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="login-box">
                        <h2>Реєстрація</h2>
                        <form>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Нікнейм"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Електронна пошта"
                                />
                            </div>
                            <div className="form-group">
                                <input type="password" placeholder="Пароль" />
                            </div>

                            <button type="submit" className="btn btn-login">
                                Зареєструватися
                            </button>

                            <div className="divider">АБО</div>

                            <button
                                type="button"
                                className="btn btn-alt"
                                onClick={() => setIsLogin(true)} // ← переходимо до логіну
                            >
                                Увійти
                            </button>

                            <div className="forgot">
                                <a href="#">Забули пароль?</a>
                            </div>

                            <div className="remember">
                                <input type="checkbox" id="remember-me" />
                                <label htmlFor="remember-me">
                                    Запам'ятати мене
                                </label>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Auth;
