import TvShowsCard from "../components/TvShowCard";
import { getSeries } from "../services/api";
import { useEffect, useState } from "react";

const TvShows = () => {
    const [tvShows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTvShows = async () => {
            try {
                const data = await getSeries();
                setTvShows(data.results);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchTvShows();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="tv-shows-container">
            <h1>Popular TV Shows</h1>
            <div className="tv-shows-grid">
                {tvShows.map((tvShow) => (
                    <TvShowsCard key={tvShow.id} tvShow={tvShow} />
                ))}
            </div>
        </div>
    );
};

export default TvShows;
