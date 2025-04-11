import { useEffect, useState } from "react";
import { getSeasonDetails } from "../services/api";

const SeasonCard = ({ tvId, seasonNumber}) => {
    const [season, setSeason] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchSeason = async () => {
            try {
                const data = await getSeasonDetails(tvId,seasonNumber);
                setSeason(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchSeason();
    }, [tvId, seasonNumber]); 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="season-card">
            <h2>{season.name}</h2>
            <p>{season.overview}</p>
            <p>Total Episodes: {season.episodes.length}</p>
            <p>Air Date: {season.air_date}</p>
            <p>Poster Path: {season.poster_path}</p>
            <p>Season Number: {season.season_number}</p>
            <p>Vote Average: {season.vote_average}</p>
            <p>Vote Count: {season.vote_count}</p>
        </div>
    );
};

export default SeasonCard;