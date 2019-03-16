import { PassageBlock } from "../lib/types";

export interface AppState {
    query: string;
    passages: PassageBlock[];
    error: string | null;
}
