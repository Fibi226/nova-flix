import React, { useState, useEffect } from "react";
import "./main-page.scss";
import { FilmCard } from "../../common-ui/film-card/film-card.jsx";
import { getFilms } from "../../services/filmApi.js";

const MainPage = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getFilms();
                setFilms(data || []);
            } catch (err) {
                console.error("Помилка завантаження фільмів:", err);
                setError("Не вдалося завантажити фільми. Перевірте, чи запущений бекенд на localhost:7108");
            } finally {
                setLoading(false);
            }
        };

        fetchFilms();
    }, []);

    if (loading) {
        return (
            <div className="novaflix-app dark">
                <main className="container main-content">
                    <h2 className="section-title">Серіали</h2>
                    <div className="loading-message">Завантаження...</div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="novaflix-app dark">
                <main className="container main-content">
                    <h2 className="section-title">Серіали</h2>
                    <div className="error-message">{error}</div>
                </main>
            </div>
        );
    }

    return (
        <div className="novaflix-app dark">
            <main className="container main-content">
                <h2 className="section-title">Серіали</h2>
                {films.length === 0 ? (
                    <div className="empty-message">Фільми не знайдені</div>
                ) : (
                    <div className="series-grid">
                        {films.map((film) => (
                            <FilmCard key={film.id || film.Id} film={film} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default MainPage;
