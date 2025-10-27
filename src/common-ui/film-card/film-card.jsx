import React from "react";
import "./film-card.scss";

export const FilmCard = ({ movies }) => {
    return (
        <div className="film-grid">
            {movies.map((movie, i) => (
                <div className="film-card" key={i}>
                    <div className="film-card__poster">
                        <img
                            src={movie.image}
                            alt={`${movie.title} постер`}
                            className="film-card__image"
                        />
                        <div className="film-card__overlay" />
                        <div className="film-card__title">
                            <h4>{movie.title.toUpperCase()}</h4>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
