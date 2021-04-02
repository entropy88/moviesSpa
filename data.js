import * as api  from "./api.js"

const host="http://localhost:3030"
api.settings.host=host;

export const login=api.login;
export const register=api.register;
export const logout=api.logout;

export async function getAllMovies(){
  const movies = await api.get(host+"/data/movies");
  return movies;
}

export async function getMovieById(id){
    return await api.get(host+"/data/movies/"+id);
}

export async function createMovie(movie){
    return await api.post(host+"/data/movies", movie)
}

export async function updateMovie(movieId, movie){
    return await api.put(host+"/data/movies/"+ movieId, movie)
}

export async function deleteMovie(movieId){
    return await api.del(host+"/data/movies/"+movieId)
}

export async function likeMovie(movieId){
    await api.post(host+"/data/movies/likes/"+movieId, movieId)
}
