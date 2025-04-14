// import { getTrailler } from "../services/api";
import { useEffect,useState } from "react";
import { getTrailler } from "../services/api";
import { Link } from "react-router-dom";

const TvShowsCard = ({tvShow}) =>{

    const [serieTrailler,setSeriesTrailler] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchtrailler = async () => {
            try {
                const trailer = await getTrailler(tvShow.id, false);
    
                // Check if `trailer.results` exists and has at least one item
                if (trailer.results && trailer.results.length > 0) {
                    setSeriesTrailler(trailer.results[0].key); // Use the correct key
                } else {
                    console.warn("Error fetching trailer:");
                }
            } catch (error) {
                console.error("Error fetching trailer:", error);
            }
        };
    
        fetchtrailler();
    }, [tvShow.id]);
    
    if (!tvShow) return null;
    return (
        <div className="tv-show-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
        <Link to={`/watchtv/${tvShow.id}/1/1`}>
            {serieTrailler && isHovered ? (
                <iframe
                    src={`https://www.youtube.com/embed/${serieTrailler}?autoplay=1&mute=1`}
                    title="Trailer"
                    allow="autoplay; encrypted-media"
                    className="w-full h-64 object-cover rounded-lg"
                />
            ):(
                <img
                    src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                    alt={tvShow.name}
                    className="w-full h-64 object-cover rounded-lg"
                />
            )}
            <h2 className="text-white text-lg font-semibold mt-2">{tvShow.name}</h2>
            <p className="text-gray-400 text-sm">⭐ {tvShow.vote_average} / 10</p>
            <br></br>
        </Link>
        </div>
    );
};

export default TvShowsCard;