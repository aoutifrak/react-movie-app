import Movies from "./Movies";
import TvShows from "./TvShows"

const Home = () => {
    return (
        <div>
            <div className="Movies">
            <Movies/>
            </div>
            <div className="TvShows">
            <TvShows/>
            </div>
        </div>
    )
}

export default Home;