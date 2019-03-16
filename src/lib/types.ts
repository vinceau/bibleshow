export interface PassageResponseJSON {
    passages: PassageBlock[];
}

export interface PassageBlock {
    title: string;
    verses: {
        [verseNumber: string]: string;
    };
}
