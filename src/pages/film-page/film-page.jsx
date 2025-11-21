import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./film-page.scss";
import { getFilmById } from "../../services/filmApi.js";
import { saveLastWatchedFilm } from "../../utils/lastWatchedStorage.js";

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
            return film.linkToTheUkrainianversion || film.LinkToTheUkrainianversion || "";
        } else {
            return film.linkToTheOriginal || film.LinkToTheOriginal || "";
        }
    };

    const convertToYouTubeEmbed = (url) => {
        if (!url) return "";
        
        if (url.includes('/embed/')) {
            return url;
        }
        let videoId = null;
        
        const watchMatch = url.match(/(?:youtube\.com\/watch\?v=)([^&\n?#]+)/i);
        if (watchMatch) {
            videoId = watchMatch[1];
        }
        

        if (!videoId) {
            const shortMatch = url.match(/(?:youtu\.be\/)([^&\n?#]+)/i);
            if (shortMatch) {
                videoId = shortMatch[1];
            }
        }

        if (videoId) {
          
            videoId = videoId.split('&')[0].split('?')[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }

        return url;
    };

    const formatDuration = (duration) => {
        if (!duration) return "";
        
    
        if (typeof duration === "string") {
            const parts = duration.split(":");
            if (parts.length >= 2) {
                const hours = parseInt(parts[0], 10) || 0;
                const minutes = parseInt(parts[1], 10) || 0;
                if (hours > 0) {
                    return `${hours} год. ${minutes} хв.`;
                }
                return `${minutes} хв.`;
            }
            return duration;
        }
        
       
        if (typeof duration === "object" && duration !== null) {
            const hours = duration.hour || duration.hours || 0;
            const minutes = duration.minute || duration.minutes || 0;
            if (hours > 0) {
                return `${hours} год. ${minutes} хв.`;
            }
            return `${minutes} хв.`;
        }
        
       
        if (typeof duration === "number") {
            const hours = Math.floor(duration / 60);
            const minutes = duration % 60;
            if (hours > 0) {
                return `${hours} год. ${minutes} хв.`;
            }
            return `${minutes} хв.`;
        }
        
        return String(duration);
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
                                    alt={`${film.title || film.Title || film.originalTitle || film.OriginalTitle || "Film"} poster`}
                                    className="film-page__poster"
                                    src={film.imageUrl || film.ImageUrl || ""}
                                />
                            </div>
                            <div className="film-page__details">
                                <h1 className="film-page__title">{film.title || film.Title || "Назва фільму"}</h1>
                                <p className="film-page__original-title">{film.originalTitle || film.OriginalTitle || ""}</p>
                                <div className="film-page__info-list">
                                    {(film.release || film.Release) && (
                                        <div className="film-page__info-item">
                                            <span className="film-page__info-label">Рік виходу:</span>
                                            <span className="film-page__info-value">{film.release || film.Release}</span>
                                        </div>
                                    )}
                                    {(film.duration || film.Duration) && (
                                        <div className="film-page__info-item">
                                            <span className="film-page__info-label">Час:</span>
                                            <span className="film-page__info-value">
                                                {formatDuration(film.duration || film.Duration)}
                                            </span>
                                        </div>
                                    )}
                                    {(film.rating !== undefined && film.rating !== null) || (film.Rating !== undefined && film.Rating !== null) ? (
                                        <div className="film-page__info-item">
                                            <span className="film-page__info-label">Рейтинг:</span>
                                            <span className="film-page__info-value">{film.rating !== undefined ? film.rating : film.Rating}</span>
                                        </div>
                                    ) : null}
                                    {(film.genres || film.Genres) && (
                                        <div className="film-page__info-item">
                                            <span className="film-page__info-label">Жанр:</span>
                                            <span className="film-page__info-value">
                                                {Array.isArray(film.genres || film.Genres) 
                                                    ? (film.genres || film.Genres).join(", ") 
                                                    : (film.genres || film.Genres)}
                                            </span>
                                        </div>
                                    )}
                                    {(film.producer || film.Producer) && (
                                        <div className="film-page__info-item">
                                            <span className="film-page__info-label">Режисер:</span>
                                            <span className="film-page__info-value">{film.producer || film.Producer}</span>
                                        </div>
                                    )}
                                    {(film.franchise || film.Franchise) && (
                                        <div className="film-page__info-item">
                                            <span className="film-page__info-label">Франшиза:</span>
                                            <span className="film-page__info-value">{film.franchise || film.Franchise}</span>
                                        </div>
                                    )}
                                    {(film.studio || film.Studio) && (
                                        <div className="film-page__info-item">
                                            <span className="film-page__info-label">Студія:</span>
                                            <span className="film-page__info-value">{film.studio || film.Studio}</span>
                                        </div>
                                    )}
                                    {(film.view !== undefined && film.view !== null) || (film.View !== undefined && film.View !== null) ? (
                                        <div className="film-page__info-item">
                                            <span className="film-page__info-label">Переглядів:</span>
                                            <span className="film-page__info-value">
                                                {typeof (film.view !== undefined ? film.view : film.View) === 'number' 
                                                    ? (film.view !== undefined ? film.view : film.View).toLocaleString('uk-UA') 
                                                    : (film.view !== undefined ? film.view : film.View)}
                                            </span>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {(film.filmDescription || film.FilmDescription) && (
                            <div className="film-page__description-section">
                                <h2 className="film-page__description-title">Опис фільму:</h2>
                                <p className="film-page__description-text">{film.filmDescription || film.FilmDescription}</p>
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

