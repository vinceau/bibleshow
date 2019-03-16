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

    constructor() {
        super();
        this.setPassages("Gen 1");
    }

    public setPassages = async (query: string) => {
        let passages: PassageBlock[] = [];
        let error: string | null = null;
        try {
            passages = await loadPassage(query);
            console.log(passages);
        } catch (err) {
            error = err;
        }
        await this.setState(oldState => ({
            ...oldState,
            query,
            passages,
            error,
        }));
    }
}
