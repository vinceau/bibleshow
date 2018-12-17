import { Container } from "unstated";

import { initialState } from "./initialState";
import { loadPassage } from "./network";
import { AppState, PassageBlock } from "./types";


export class AppStateContainer extends Container<AppState> {
    public state = initialState;

    public setPassage = async (query: string) => {
        let passages: PassageBlock[] = [];
        let error: string | null = null;
        try {
            passages = await loadPassage(query);
        } catch (err) {
            error = err;
        }
        this.setState(oldState => ({
            ...oldState,
            query,
            passages,
            error,
        }));
    }
}
