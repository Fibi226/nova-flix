import React from "react";
import { useNavigate } from "react-router-dom";
import "./film-card.scss";

export const FilmCard = ({ film }) => {
    const navigate = useNavigate();
    
    
    const filmData = film || {};
    const title = filmData.title || filmData.Title || '';
    const originalTitle = filmData.originalTitle || filmData.OriginalTitle || '';
    const imageUrl = filmData.imageUrl || filmData.ImageUrl || filmData.posterUrl || '';
    const filmId = filmData.id || filmData.Id || filmData.ID;

    const handleClick = () => {
        if (filmId) {
            navigate(`/film/${filmId}`);
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
