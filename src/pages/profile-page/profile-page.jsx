import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile-page.scss";
import { getUserAsync, updateProfileAsync, uploadAvatarAsync } from "../../services/profileApi.js";
import { hasToken, removeToken } from "../../utils/tokenStorage.js";
import { getLastWatchedFilm } from "../../utils/lastWatchedStorage.js";
import { isValidEmail, validateImageFile } from "../../utils/validation.js";
import { getFilmRoute, ROUTES } from "../../constants/routes.js";

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [lastWatchedFilm, setLastWatchedFilm] = useState(null);
    const [watchedFilmsCount, setWatchedFilmsCount] = useState(0);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        imageUrl: "",
    });
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);

    useEffect(() => {
        if (!hasToken()) {
            navigate(ROUTES.AUTH);
            return;
        }

        const fetchProfile = async () => {
            try {
                setLoading(true);
                const profile = await getUserAsync();
                console.log(profile);
                setUserProfile(profile);
                setFormData({
                    email: profile.email || "",
                    name: profile.name || "",
                    password: "",
                    imageUrl: profile.imageUrl || "",
                });
                setAvatarPreview(null);
                setAvatarFile(null);
                const lastWatched = getLastWatchedFilm();
                if (lastWatched) {
                    setLastWatchedFilm(lastWatched);
                }
            
            } catch (err) {
                console.error("Помилка завантаження профілю:", err);
                setError("Не вдалося завантажити профіль");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAvatarSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validation = validateImageFile(file, 5);
        if (!validation.valid) {
            setError(validation.error);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);

        setAvatarFile(file);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.name.trim()) {
            setError("Ім'я не може бути порожнім");
            return;
        }

        if (!formData.email.trim()) {
            setError("Email не може бути порожнім");
            return;
        }

        if (!isValidEmail(formData.email)) {
            setError("Введіть правильний email");
            return;
        }

        try {
            setLoading(true);
            let imageUrl = formData.imageUrl;

            if (avatarFile) {
                try {
                    const result = await uploadAvatarAsync(avatarFile);
                    imageUrl = result.imageUrl || "";
                } catch (err) {
                    console.error("Помилка завантаження аватара:", err);
                    setError("Не вдалося завантажити аватар");
                    setLoading(false);
                    return;
                }
            }

            const passwordToUpdate = formData.password.trim() || "";
            await updateProfileAsync(formData.email, formData.name, passwordToUpdate, imageUrl);
            
            setIsEditing(false);
            setAvatarPreview(null);
            setAvatarFile(null);
            
            const updatedProfile = await getUserAsync();
            setUserProfile(updatedProfile);
            setFormData({
                email: updatedProfile.email || "",
                name: updatedProfile.name || "",
                password: "",
                imageUrl: updatedProfile.imageUrl || "",
            });
        } catch (err) {
            console.error("Помилка оновлення профілю:", err);
            setError("Не вдалося оновити профіль");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            email: userProfile?.email || "",
            name: userProfile?.name || "",
            password: "",
            imageUrl: userProfile?.imageUrl || "",
        });
        setAvatarPreview(null);
        setAvatarFile(null);
        setError("");
    };

    const handleLogout = () => {
        removeToken();
        navigate(ROUTES.AUTH);
    };

    const handleContinueWatching = () => {
        if (lastWatchedFilm?.id) {
            navigate(getFilmRoute(lastWatchedFilm.id));
        }
    };

    if (loading && !userProfile) {
        return (
            <div className="profile-page dark">
                <div className="profile-page__container">
                    <div className="profile-page__loading">Завантаження...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page dark">
            <main className="profile-page__main">
                <div className="profile-page__container">
                    <div className="profile-page__content">
                        <section className="profile-page__profile-section">
                            <div className="profile-page__avatar-wrapper">
                                {isEditing && (
                                    <label className="profile-page__avatar-upload">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarSelect}
                                            style={{ display: "none" }}
                                        />
                                        {avatarPreview ? (
                                            <img
                                                src={avatarPreview}
                                                alt="Попередній перегляд аватара"
                                                className="profile-page__avatar-image"
                                            />
                                        ) : formData.imageUrl ? (
                                            <img
                                                src={formData.imageUrl}
                                                alt="Аватар"
                                                className="profile-page__avatar-image"
                                            />
                                        ) : (
                                            <div className="profile-page__avatar-placeholder">
                                                <span className="material-icons">person</span>
                                            </div>
                                        )}
                                        <div className="profile-page__avatar-overlay">
                                            <span className="material-icons">camera_alt</span>
                                            <span className="profile-page__avatar-text">Змінити фото</span>
                                        </div>
                                    </label>
                                )}
                                {!isEditing && (
                                    <div className="profile-page__avatar-container">
                                        {userProfile?.imageUrl ? (
                                            <img
                                                src={userProfile.imageUrl}
                                                alt="Аватар"
                                                className="profile-page__avatar-image"
                                            />
                                        ) : (
                                            <div className="profile-page__avatar-placeholder">
                                                <span className="material-icons">person</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="profile-page__profile-info">
                                {isEditing ? (
                                    <form className="profile-page__edit-form" onSubmit={handleSubmit}>
                                        {error && <div className="profile-page__error">{error}</div>}
                                        <div className="profile-page__form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="profile-page__form-group">
                                            <label htmlFor="name">Ім'я</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="profile-page__form-group">
                                            <label htmlFor="password">Пароль (необов'язково)</label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                disabled={loading}
                                                placeholder="Залиште порожнім, щоб не змінювати пароль"
                                            />
                                        </div>
                                        {avatarPreview && (
                                            <div className="profile-page__avatar-notice">
                                                <span className="material-icons">info</span>
                                                <span>Нове фото буде збережено при збереженні профілю</span>
                                            </div>
                                        )}
                                        <div className="profile-page__form-actions">
                                            <button
                                                type="submit"
                                                className="profile-page__btn profile-page__btn--primary"
                                                disabled={loading}
                                            >
                                                {loading ? "Збереження..." : "Зберегти"}
                                            </button>
                                            <button
                                                type="button"
                                                className="profile-page__btn profile-page__btn--secondary"
                                                onClick={handleCancel}
                                                disabled={loading}
                                            >
                                                Скасувати
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <h1 className="profile-page__name">
                                            {userProfile?.name || "Нік Користувача"}
                                        </h1>
                                        <p className="profile-page__stats">
                                            Переглянуто фільмів: <span>{watchedFilmsCount || 0}</span>
                                        </p>
                                    </>
                                )}
                            </div>
                        </section>

                        {lastWatchedFilm && !isEditing && (
                            <section className="profile-page__last-watched">
                                <h2 className="profile-page__section-title">Останнє відтворення</h2>
                                <div className="profile-page__last-watched-card">
                                    <div className="profile-page__film-poster-wrapper">
                                        <img
                                            alt={lastWatchedFilm.name || "Постер фільму"}
                                            className="profile-page__film-poster"
                                            src={lastWatchedFilm.posterUrl || lastWatchedFilm.imageUrl || ""}
                                        />
                                    </div>
                                    <div className="profile-page__film-info">
                                        <h3 className="profile-page__film-title">
                                            {lastWatchedFilm.name || lastWatchedFilm.title || "Без назви"}
                                        </h3>
                                        <p className="profile-page__film-description">
                                            {lastWatchedFilm.description || lastWatchedFilm.filmDescription || ""}
                                        </p>
                                        <button
                                            className="profile-page__continue-btn"
                                            onClick={handleContinueWatching}
                                        >
                                            <span className="material-icons">play_arrow</span>
                                            Продовжити перегляд
                                        </button>
                                    </div>
                                </div>
                            </section>
                        )}

                        {!isEditing && (
                            <section className="profile-page__actions">
                                <button
                                    className="profile-page__btn profile-page__btn--primary"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Змінити дані користувача
                                </button>
                                <button
                                    className="profile-page__btn profile-page__btn--secondary"
                                    onClick={handleLogout}
                                >
                                    Вихід
                                </button>
                            </section>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
