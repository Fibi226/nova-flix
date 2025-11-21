import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./auth.scss";
import { login, register } from "../../services/authApi.js";
import { saveToken } from "../../utils/tokenStorage.js";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    
    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
    
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!loginEmail || !loginPassword) {
            setError("Будь ласка, заповніть всі поля");
            setLoading(false);
            return;
        }

        try {
            const result = await login(loginEmail, loginPassword);
            const token = result.AcesToken || result.acesToken;
            if (token) {
                saveToken(token);
                navigate("/main");
            } else {
                setError("Не вдалося отримати токен доступу");
            }
        } catch (err) {
            setError(err.message || "Помилка входу. Перевірте дані та спробуйте ще раз.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
            setError("Будь ласка, заповніть всі поля");
            setLoading(false);
            return;
        }

        if (registerPassword !== registerConfirmPassword) {
            setError("Паролі не співпадають");
            setLoading(false);
            return;
        }

        try {
            const result = await register(registerEmail, registerName, registerPassword, registerConfirmPassword);
            const token = result.AcesToken || result.acesToken;
            if (token) {
                saveToken(token);
                navigate("/main");
            } else {
                setError("Не вдалося отримати токен доступу");
            }
        } catch (err) {
            setError(err.message || "Помилка реєстрації. Перевірте дані та спробуйте ще раз.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="logo">
                <h1>NovaFlix</h1>
            </div>

            <div className="login-container">
                {isLogin ? (
                    <div className="login-box">
                        <h2>Увійти</h2>
                        {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    placeholder="Електронна пошта"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    disabled={loading}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    placeholder="Пароль"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    disabled={loading}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-login" disabled={loading}>
                                {loading ? "Завантаження..." : "Увійти"}
                            </button>

                            <div className="divider">АБО</div>

                            <button
                                type="button"
                                className="btn btn-alt"
                                onClick={() => {
                                    setIsLogin(false);
                                    setError("");
                                }}
                                disabled={loading}
                            >
                                Зареєструватися
                            </button>

                            <div className="forgot">
                                <a href="#">Забули пароль?</a>
                            </div>

                            <div className="remember">
                                <input type="checkbox" id="remember-me"/>
                                <label htmlFor="remember-me">
                                    Запам'ятати мене
                                </label>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="login-box">
                        <h2>Реєстрація</h2>
                        {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
                        <form onSubmit={handleRegister}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Нікнейм"
                                    value={registerName}
                                    onChange={(e) => setRegisterName(e.target.value)}
                                    disabled={loading}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    placeholder="Електронна пошта"
                                    value={registerEmail}
                                    onChange={(e) => setRegisterEmail(e.target.value)}
                                    disabled={loading}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    placeholder="Пароль"
                                    value={registerPassword}
                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                    disabled={loading}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    placeholder="Підтвердження пароля"
                                    value={registerConfirmPassword}
                                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                                    disabled={loading}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-login" disabled={loading}>
                                {loading ? "Завантаження..." : "Зареєструватися"}
                            </button>

                            <div className="divider">АБО</div>

                            <button
                                type="button"
                                className="btn btn-alt"
                                onClick={() => {
                                    setIsLogin(true);
                                    setError("");
                                }}
                                disabled={loading}
                            >
                                Увійти
                            </button>

                            <div className="forgot">
                                <a href="#">Забули пароль?</a>
                            </div>

                            <div className="remember">
                                <input type="checkbox" id="remember-me"/>
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
