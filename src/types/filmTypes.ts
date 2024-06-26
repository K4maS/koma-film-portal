export type kpFullFilmType = {
	kinopoiskId: number;
	kinopoiskHDId: string;
	imdbId: null | undefined | string;
	nameRu: string;
	nameEn: null | undefined | string;
	nameOriginal: null | undefined | string;
	posterUrl: string;
	posterUrlPreview: string;
	coverUrl: string;
	logoUrl: null | undefined | string;
	reviewsCount: number;
	ratingGoodReview: number;
	ratingGoodReviewVoteCount: number;
	ratingKinopoisk: number;
	ratingKinopoiskVoteCount: number;
	ratingImdb: number;
	ratingImdbVoteCount: number;
	ratingFilmCritics: null | undefined | string;
	ratingFilmCriticsVoteCount: number;
	ratingAwait: number;
	ratingAwaitCount: number;
	ratingRfCritics: number;
	ratingRfCriticsVoteCount: number;
	webUrl: string;
	year: number;
	filmLength: number;
	slogan: null | undefined | string;
	description: string;
	shortDescription: string;
	editorAnnotation: null | undefined | string;
	isTicketsAvailable: boolean;
	productionStatus: null | undefined | string;
	type: string;
	ratingMpaa: null | undefined | string;
	ratingAgeLimits: string;
	countries: Array<{ country: string }>;
	genres: Array<{ genre: string }>;
	startYear: null | undefined | number;
	endYear: null | undefined | number;
	serial: boolean;
	shortFilm: boolean;
	completed: boolean;
	hasImax: boolean;
	has3D: boolean;
	lastSync: string;
};

export type kpFilterOrderType = 'RATING' | 'NUM_VOTE' | 'YEAR';

export type kpFilterTypeType =
	| 'ALL'
	| 'FILM'
	| 'TV_SHOW'
	| 'TV_SERIES'
	| 'MINI_SERIES';

export type kpFilterType = {
	keyword: string | undefined;
	order: kpFilterOrderType | undefined;
	type: kpFilterTypeType | undefined;
	ratingFrom: number | undefined;
	ratingTo: number | undefined;
	yearFrom: number | undefined;
	yearTo: number | undefined;
	page: number | undefined;
};
