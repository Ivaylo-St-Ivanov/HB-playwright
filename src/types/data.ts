export type LocalizedValue = string | { [key: string]: string };

export interface ReviewRawItem {
    title: LocalizedValue;
    text: string;
}

export interface ReviewCityData {
    name: LocalizedValue;
    reviews: ReviewRawItem[];
}

export interface ReviewCountryData {
    country: LocalizedValue;
    cities: ReviewCityData[];
}

export interface StagingRawItem {
    play: LocalizedValue;
    theater: LocalizedValue;
    premiere: LocalizedValue;
    director: LocalizedValue;
    actors: LocalizedValue;
    images: string[];
}

export interface StagingCityData {
    name: LocalizedValue;
    stagings: StagingRawItem[];
}

export interface StagingCountryData {
    country: LocalizedValue;
    cities: StagingCityData[];
}
