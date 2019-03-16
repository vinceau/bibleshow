import { Container } from "unstated";

import { loadPassage } from "../../lib/network";
import { PassageBlock } from "../../lib/types";
import { AppState } from "../storeTypes";

const initialState: AppState = {
    query: "",
    passages: [],
    currentPassage: 0,
    error: null,
};

export class AppContainer extends Container<AppState> {
    public state = initialState;

    constructor() {
        super();
        this.setPassages("Gen 1");
    }

    public nextPassage = async () => {
        const { currentPassage, passages } = this.state;
        await this.setState({ currentPassage: Math.max(currentPassage + 1, passages.length - 1) });
    }

    public prevPassage = async () => {
        const { currentPassage, passages } = this.state;
        await this.setState({ currentPassage: Math.min(currentPassage - 1, 0) });
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
