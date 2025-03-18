//recuperation des données de photographes et de médias
export const getPhotographers = async () => {
	const response = await fetch('data/photographers.json');
	const data = await response.json();
	return data;
}

//recuperation des données d'un photographe et de ses médias
export const getPhotographerById = async (id) => {
	const data = await getPhotographers();
	let photographer = data.photographers.find(photographer => photographer.id == id);
	let media = data.media.filter(media => media.photographerId == id);
	return {photographer, media};
}