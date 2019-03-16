import axios from "axios";

import { PassageBlock, PassageResponseJSON } from "./types";

const API = "https://niv84api.appspot.com/api/v2/?passage=";

const ErrorUnableToRetrievePassage = "Unable to retrieve passage.";

export async function loadPassage(query: string): Promise<PassageBlock[]> {
    try {
        let response: PassageResponseJSON;
        response = (await axios.get(`${API}${encodeURIComponent(query)}`)).data;
        return response.passages;
    } catch (error) {
        console.error(error);
        throw new Error(ErrorUnableToRetrievePassage);
    }
}
