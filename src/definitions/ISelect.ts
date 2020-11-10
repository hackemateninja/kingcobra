export interface IOption {
	id: string,
	value: string,
	name: string,
	image: string
}

export interface ISelect {
	id: string,
	value: string,
	name: string,
	label: string,
	cue: boolean,
	error: boolean,
	message: string,
	options?: IOption[],
	handlerChange?: ( event: React.ChangeEvent<HTMLSelectElement> ) => void
}