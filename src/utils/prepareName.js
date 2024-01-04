export const prepareName = (name) => {
	return name?.replace(/ /g, "_").toLowerCase();
}