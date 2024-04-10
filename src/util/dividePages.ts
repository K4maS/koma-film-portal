import { kpFilmType } from "../types";

export function DividePages(data: Array<kpFilmType>, pages: number = 20):Array<Array<kpFilmType>> {
		
    const dataPages: number = Math.ceil(data.length / Number(pages));
    const pagedData = [];
    let startIndex = 0;
    let endIndex = startIndex + Number(pages);
    for (let i = 0; i < dataPages; i++) {

        if (endIndex > Number(data.length)) {
            endIndex = Number(data.length);
        }
        pagedData[i] = data.slice(startIndex, endIndex);
        startIndex = endIndex;
        endIndex = startIndex + Number(pages);
    }
    return pagedData;
}