export interface PassageResponseJSON {
    passages: PassageBlock[];
}

export interface PassageBlock {
    title: string;
    verses: {
        [verseNumber: string]: string;
    };
}

export interface AppState {
    query: string;
    passages: PassageBlock[];
    error: string | null;
}
