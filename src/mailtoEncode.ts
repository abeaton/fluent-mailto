export function mailtoEncodeURI(uri: string): string {
	return encodeURI(uri)
		.replace(/\&/g, '&amp;')
		.replace(/\?/g, '%3F');
}