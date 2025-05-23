import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails , getMovies} from "../services/api";
import MovieCard from "../components/MovieCard";

const Watch = () => {
    const { id } = useParams(); 
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);      // Error state
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);  // Set loading state true
                const Movie = await getMovieDetails(id);
                const data = await getMovies();
                setMovies(data.results);
                if (Movie) {
                    setMovie(Movie);
                } else {
                    setError("Movie not found!");
                }
                setLoading(false);
            } catch (error) {
                console.warn("Could not find the movie");
                setError("Could not fetch movie details.");
            } finally {
                setLoading(false); // Set loading state false when request completes
            }
        };
        fetchMovie();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;      

    return (
        <>
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
        <div className="movies-container">
            <h1>Popular Movies</h1>
            <div className="movies-grid">
            {movies.map((movie) =>
                movie.id !== id ? (
                    <MovieCard key={movie.id} movie={movie} />
                ) : null
                )}
            </div>
        </div>
        </>
    );
};

export default Watch;
