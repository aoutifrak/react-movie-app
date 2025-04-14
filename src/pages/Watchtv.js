import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSeriesDetails , getSeries} from "../services/api";
import TvShowsCard from "../components/TvShowCard";
import VideoEmbed from "../components/Player";

const Watchtv = () => {
    const { id ,e,s} = useParams(); 
    const [Series, setSeries] = useState(null);
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);      // Error state
    const [series, setSeriess] = useState([]);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);  // Set loading state true
                const Series = await getSeriesDetails(id);
                const data = await getSeries();
                setSeriess(data.results);
                if (Series) {
                    setSeries(Series);
                } else {
                    setError("Series not found!");
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
        <div className="watchtv-container">
            <h1 className="movie-title">{Series.name}</h1>
            <div className="video-wrapper">
            <VideoEmbed imdbId={id} episode={e} season={s} />
            </div>
        </div>
        <div className="movies-container">
            <h1>Popular Movies</h1>
            <div className="movies-grid">
            {series.map((serie) =>
                serie.id !== id ? (
                    <TvShowsCard key={serie.id} tvShow={serie} />
                ) : null
                )}
            </div>
        </div>
        </>
    );
};

export default Watchtv;
