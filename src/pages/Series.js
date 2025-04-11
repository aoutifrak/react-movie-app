import { useEffect, useState } from "react";
import { getSeries } from "../services/api";  // Assuming getSeries returns a promise with movie data
import MovieCard from "../components/MovieCard";

const Series = () => {
  const [Series, setSeries] = useState([]);   // State to store the movie data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null);    // State to track any errors

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const data = await getSeries();  // Await the data from getSeries
        setSeries(data.results);         // Assuming the data returned has a 'results' property
        setLoading(false);               // Set loading to false when data is fetched
      } catch (error) {
        setError("Failed to fetch Series.");
        setLoading(false);               // Set loading to false even if there is an error
        console.error(error);
      }
    };

    fetchSeries();  // Call the function to fetch Series
  }, []);  // Empty dependency array ensures this runs only once on mount

  if (loading) return <div>Loading...</div>;  // Display loading indicator
  if (error) return <div>{error}</div>;      // Display error message

  return (
    <div>
      <h1>Popular Series</h1>
      <ul>
        {Series.map((movie) => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <MovieCard key={movie.id} movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Series;
