import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";

const Watch = () => {
    const { id } = useParams(); 
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);      // Error state

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);  // Set loading state true
                const Movie = await getMovieDetails(id);
                if (Movie) {
                    setMovie(Movie);
                } else {
                    setError("Movie not found!");
                }
            } catch (error) {
                console.warn("Could not find the movie");
                setError("Could not fetch movie details.");
            } finally {
                setLoading(false); // Set loading state false when request completes
            }
        };
        fetchMovie();
    }, [id]);

    if (loading) return <p>Loading...</p>;  // Display loading state
    if (error) return <p>{error}</p>;      // Display error state

    return (
        <div className="watch-container">
            <h1 className="movie-title">{movie.title}</h1>
            <div className="video-wrapper">
                <iframe
                    src={`https://vidsrc.me/embed/movie?tmdb=${id}`}
                    title={movie.title}
                    frameBorder="0" 
                    referrerPolicy="origin" 
                    width="100%" // Ensures full width for responsiveness
                    height="500" // Set a specific height (can be adjusted)
                ></iframe>
            </div>
        </div>
    );
};

export default Watch;
