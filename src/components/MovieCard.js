import React, { useEffect, useState } from "react";
import { getTrailler } from "../services/api"; // Function to fetch trailer
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const [movieTrailer, setTrailer] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchMovieTrailer = async () => {
      try {
        const trailer = await getTrailler(movie.id, true);
        // Check if `trailer.results` exists and has at least one item
        if (trailer.results && trailer.results.length > 0) {
          setTrailer(trailer.results[0].key); // Use the correct key
        } else {
            console.warn("could not get Trailler ");
        }
    } catch (error) {
        console.error("Error fetching trailer:", error);
    }
};

    fetchMovieTrailer();
  }, [movie.id]);

  return (
    <div
      className="bg-gray-800 p-4 rounded-lg shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/movie/${movie.id}`}>
      {isHovered && movieTrailer ? (
        <iframe
          src={`https://www.youtube.com/embed/${movieTrailer}?autoplay=1&mute=1`}
          title="Movie Trailer"
          allow="autoplay; encrypted-media"
          className="w-full h-64 object-cover rounded-lg"
        />
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover rounded-lg"
        />
      )}

      <h2 className="text-white text-lg font-semibold mt-2">{movie.title}</h2>
      <p className="text-gray-400 text-sm">⭐ {movie.vote_average} / 10</p>
      </Link>
    </div>
  );
};

export default MovieCard;
