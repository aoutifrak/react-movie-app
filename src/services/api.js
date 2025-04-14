import axios from 'axios';

const BaseUrl = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const api = axios.create({
    baseURL: BaseUrl,
});

export const getMovies = async () => {
    try {
        const response = await api.get(`/movie/popular?api_key=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

export const getMovieDetails = async (movieId) => {
    try {
        const response = await api.get(`/movie/${movieId}?api_key=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};


export const getTrailler = async (movieId,isMovie) => {
    try {
        let response = null;
        if (isMovie)
        {
            response = await api.get(`/movie/${movieId}/videos?language=en-US&api_key=${API_KEY}`);
        }
        else
        {
            response = await api.get(`/tv/${movieId}/videos?language=en-US&api_key=${API_KEY}`);
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

export const getSeasonDetails = async (seriesId ,seasonNumber) => {
    try {
        const response = await api.get(`/tv/${seriesId}/season/${seasonNumber}?language=en-US?\
            api_key=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching series details:', error);
        throw error;
    }
};


export const getSeriesDetails = async (seriesId) => {
    try {
        const response = await api.get(`/tv/${seriesId}?api_key=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching series details:', error);
        throw error;
    }
};

export const getSearchResults = async (query) => {
    try {
        const response = await api.get('/search/multi', {
            params: {
                query,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
};

export const getSeries = async () => {
    try {
        const response = await api.get(`/tv/popular?api_key=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching series:', error);
        throw error;
    }
};
