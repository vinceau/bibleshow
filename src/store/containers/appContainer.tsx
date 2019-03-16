import { Container } from "unstated";

import { loadPassage } from "../../lib/network";
import { PassageBlock } from "../../lib/types";
import { AppState } from "../storeTypes";


const initialState: AppState = {
    query: "",
    passages: [],
    error: null,
};

export class AppContainer extends Container<AppState> {
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
