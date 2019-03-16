import { PassageBlock } from "../lib/types";

export interface AppState {
    query: string;
    passages: PassageBlock[];
    currentPassage: number;
    error: string | null;
}
