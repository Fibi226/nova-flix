import React from "react";
import "./film-card.scss";

export const FilmCard = ({ series }) => {
    return (
        <div className="film-card">
            <div className="film-card__poster">
                <img
                    src={series.posterUrl}
                    alt={`${series.title} постер`}
                    className="film-card__image"
                />
                <div className="film-card__overlay" />
                <div className="film-card__title">
                    <h4>{series.title.toUpperCase()}</h4>
                </div>
            </div>
        </div>
    );
};
