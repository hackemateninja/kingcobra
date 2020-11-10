export interface IInput {
	id: string,
	value: string,
	type: string,
	name: string,
	label: string,
	cue: boolean,
	error: boolean,
	message: string,
	success?: boolean,
	length?: number,
	icon?: string,
	city?: string,
	handlerFocus?: ( event: React.FocusEvent<HTMLInputElement> ) => void,
	handlerBlur?: ( event: React.FocusEvent<HTMLInputElement> ) => void,
	handlerChange?: ( event: React.ChangeEvent<HTMLInputElement> ) => void
}