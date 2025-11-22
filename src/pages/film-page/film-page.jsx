import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./film-page.scss";
import { getFilmById } from "../../services/filmApi.js";
import { saveLastWatchedFilm } from "../../utils/lastWatchedStorage.js";
import { convertToYouTubeEmbed } from "../../utils/youtubeUtils.js";
import { formatDuration } from "../../utils/durationFormatter.js";

const FilmPage = () => {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeLanguage, setActiveLanguage] = useState("ukrainian");

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getFilmById(id);
                setFilm(data);
                if (data) {
                    saveLastWatchedFilm(data);
                }
            } catch (err) {
                console.error("Помилка завантаження фільму:", err);
                setError("Не вдалося завантажити фільм. Перевірте, чи запущений бекенд на localhost:7108");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchFilm();
        }
    }, [id]);

    const getVideoUrl = () => {
        if (!film) return "";
        if (activeLanguage === "ukrainian") {
            return film.linkToTheUkrainianversion || "";
        } else {
            return film.linkToTheOriginal || "";
        }
    };

    if (loading) {
        return (
            <div className="novaflix-app dark">
                <div className="film-page">
                    <div className="film-page__container">
                        <div className="loading-message">Завантаження...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="novaflix-app dark">
                <div className="film-page">
                    <div className="film-page__container">
                        <div className="error-message">{error}</div>
                    </div>
                </div>
            </div>
        );
    }

    if (!film) {
        return (
            <div className="novaflix-app dark">
                <div className="film-page">
                    <div className="film-page__container">
                        <div className="empty-message">Фільм не знайдено</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="novaflix-app dark">
            <div className="film-page">
                <div className="film-page__container">
                    <div className="film-page__content">
                        <div className="film-page__grid">
                            <div className="film-page__poster-wrapper">
                                <img
                                    alt={`${film.title || film.originalTitle || "Film"} poster`}
                                    className="film-page__poster"
                                    src={film.imageUrl || ""}
                                />
                            </div>
                            <div className="film-page__details">
                                <h1 className="film-page__title">{film.title || "Назва фільму"}</h1>
                                <p className="film-page__original-title">{film.originalTitle || ""}</p>
                                <div className="film-page__info-list">
                                    {film.release && (
                                        <div className="film-page__info-item">
                                            <span className="film-page__info-label">Рік виходу:</span>
                                            <span className="film-page__info-value">{film.release}</span>
                                        </div>
                                    )}
                                    {film.duration && (
                                        <div className="film-page__info-item">
                                            <span className="film-page__info-label">Час:</span>
                                            <span className="film-page__info-value">
                                                {formatDuration(film.duration)}
                                            </span>
                                        </div>
                                    )}
                                    {film.rating !== undefined && film.rating !== null && (
                                        <div className="film-page__info-item">
                                            <span className="film-page__info-label">Рейтинг:</span>
                                            <span className="film-page__info-value">{film.rating}</span>
                                        </div>
                                    )}
                                    {film.genres && (
                                        <div className="film-page__info-item">
                                            <span className="film-page__info-label">Жанр:</span>
                                            <span className="film-page__info-value">
                                                {Array.isArray(film.genres) 
                                                    ? film.genres.join(", ") 
                                                    : film.genres}
                                            </span>
                                        </div>
                                    )}
                                    {film.producer && (
                                        <div className="film-page__info-item">
                                            <span className="film-page__info-label">Режисер:</span>
                                            <span className="film-page__info-value">{film.producer}</span>
                                        </div>
                                    )}
                                    {film.franchise && (
                                        <div className="film-page__info-item">
                                            <span className="film-page__info-label">Франшиза:</span>
                                            <span className="film-page__info-value">{film.franchise}</span>
                                        </div>
                                    )}
                                    {film.studio && (
                                        <div className="film-page__info-item">
                                            <span className="film-page__info-label">Студія:</span>
                                            <span className="film-page__info-value">{film.studio}</span>
                                        </div>
                                    )}
                                    {film.view !== undefined && film.view !== null && (
                                        <div className="film-page__info-item">
                                            <span className="film-page__info-label">Переглядів:</span>
                                            <span className="film-page__info-value">
                                                {typeof film.view === 'number' 
                                                    ? film.view.toLocaleString('uk-UA') 
                                                    : film.view}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {film.filmDescription && (
                            <div className="film-page__description-section">
                                <h2 className="film-page__description-title">Опис фільму:</h2>
                                <p className="film-page__description-text">{film.filmDescription}</p>
                            </div>
                        )}

                        <div className="film-page__player-section">
                            <div className="film-page__language-tabs">
                                <button
                                    className={`film-page__language-tab ${activeLanguage === "ukrainian" ? "film-page__language-tab--active" : ""}`}
                                    onClick={() => setActiveLanguage("ukrainian")}
                                >
                                    Українською
                                </button>
                                <button
                                    className={`film-page__language-tab ${activeLanguage === "original" ? "film-page__language-tab--active" : ""}`}
                                    onClick={() => setActiveLanguage("original")}
                                >
                                    В оригіналі
                                </button>
                            </div>
                            <div className="film-page__player-wrapper">
                                <div className="film-page__video-container">
                                    {(() => {
                                        const videoUrl = getVideoUrl();
                                        
                                        if (!videoUrl) {
                                            return (
                                                <div className="film-page__player-placeholder">
                                                    <p className="film-page__player-placeholder-text">Відео недоступне</p>
                                                </div>
                                            );
                                        }

                                        const embedUrl = convertToYouTubeEmbed(videoUrl);
                                        return (
                                            <iframe
                                                className="film-page__video film-page__video--youtube"
                                                src={embedUrl}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            />
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilmPage;

