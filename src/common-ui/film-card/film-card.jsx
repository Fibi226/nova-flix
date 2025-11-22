import React from "react";
import { useNavigate } from "react-router-dom";
import "./film-card.scss";
import { getFilmRoute } from "../../constants/routes.js";

export const FilmCard = ({ film }) => {
    const navigate = useNavigate();
    
    if (!film) {
        return null;
    }
    
    const { title = '', originalTitle = '', imageUrl = '', id: filmId = null } = film;

    const handleClick = () => {
        if (filmId) {
            navigate(getFilmRoute(filmId));
        }
    };

    return (
        <div className="film-card" onClick={handleClick} style={{ cursor: filmId ? 'pointer' : 'default' }}>
            <div className="film-card__poster">
                <img
                    src={imageUrl}
                    alt={`${originalTitle || title} постер`}
                    className="film-card__image"
                    onError={(e) => {
                        e.target.src = 'https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg';
                    }}
                />
                <div className="film-card__overlay" />
                <div className="film-card__title">
                    <h4>{title ? title.toUpperCase() : 'Без назви'}</h4>
                </div>
            </div>
        </div>
    );
};
