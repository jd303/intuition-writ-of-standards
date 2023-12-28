export const prepareCharacterName = (name) => {
	return name.replace(/ /g, "_").toLowerCase();
}