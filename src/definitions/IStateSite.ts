import { IQuote } from "@/def/IQuotes";

export interface IStateSite {
	month: string,
	year: number,
	quotes: IQuote[]
}