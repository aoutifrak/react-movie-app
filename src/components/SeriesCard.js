// import { getTrailler } from "../services/api";
import { useEffect,useState } from "react";
import { getSeriesDetails } from "../services/api";
import SeasonCard from "./SeasionCard";

const TvShowsCard = ({tvShow}) =>{

    // const [serieTrailler,setSeriesTrailler] = useState(null);
    // const [isHovered, setIsHovered] = useState(false);
    const [seasons,setSeasons] = useState([]);
    // useEffect(()=>{
    //     const fetchtrailler = async () =>{
    //         try {
    //             const trailer = await getTrailler(tvShow.id,false);
    //             setSeriesTrailler(trailer);
    //         } catch (error) {
    //             console.error("Error fetching trailer:", error);
    //         }
    //     };
    //     fetchtrailler();
    // }, [tvShow.id]);
    // if (!tvShow) return null;
    useEffect(()=>{
        const fetchSeasons = async () =>{
            try {
                const Series = await getSeriesDetails(tvShow.id);
                setSeasons(Series.seasons);
            } catch (error) {
                console.error("Error fetching seasons:", error);
            }
        };
        fetchSeasons();
    },[tvShow]);    
    return (
        <div className="tv-show-card"
        // className="bg-gray-800 p-4 rounded-lg shadow-lg transition-all duration-300"
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
        >
                <img
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                alt={tvShow.title}
                className="w-full h-64 object-cover rounded-lg"
                />            <div className="tv-show-card-info">
                <h3>{tvShow.name}</h3>
                <p>{tvShow.overview}</p>
            </div>
            {/* {serieTrailler && isHovered ? (
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
            )} */}
            <p className="text-gray-400 text-sm">⭐ {tvShow.vote_average} / 10</p>
            <ul className="flex flex-wrap gap-2">
            {seasons.map((season, index) => (
                <li key={season.id} className="text-gray-400 text-sm">
                    <SeasonCard tvId={tvShow.id} seasonNumber={index + 1} />
                </li>
            ))}
            </ul>
        </div>
    );
};

export default TvShowsCard;