export interface IDealer {
	id: string,
	name: string,
	address?: string,
	isChecked?: boolean,
	one?: boolean,
	all?: boolean,
	cue?: boolean,
	handlerChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void
}

export interface IDealers {
	items: IDealer[];
	allChecked: boolean,
	error?: boolean,
	cue?: boolean,
	handlerChange?: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
}