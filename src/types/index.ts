export type filmType = {
    Title:string,
    Year: 2017,
    Rated:string,
    Released:string,
    Runtime:string,
    Genre:string,
    Director:string,
    Writer:string,
    Actors:string,
    Plot: string, 
    Language:string,
    Country:string,
    Awards:string,
    Poster:string,
    Ratings: Array< {Source:string,Value:string}>,
    Metascore:67,
    imdbRating:number,
    imdbVotes:string,
    imdbID:string,
    Type:string,
    DVD:string,
    BoxOffice:string,
    Production:string,
    Website:string,
    Response: boolean
}

export type kpFilmType = {
     kinopoiskId : number,
     nameRu : string,
     nameEn :  string,
     year : number,
     posterUrl:  string,
     posterUrlPreview : string,
     countries: Array<{country :  string}>,
     genres: Array<{genre:  string}>,
     duration : number,
     premiereRu :  string 
}

export type FilmStateType = {
  films:  filmType | {},
};

