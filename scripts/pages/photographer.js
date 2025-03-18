//Mettre le code JavaScript lié à la page photographer.html
import { photographerTemplate } from "../templates/photographer.js";
import { getPhotographerById } from "../utils/api.js";
import { customSelect } from "../utils/select.js";


const totalLike = (media) => {
	let total = 0;
	media.forEach(media => {
		total += media.likes;
	});
	return total;
}

//afficher les médias
export const displayMedia = async (photographerTplt, photographerMedia, filter) => {
	const mediaSection = document.querySelector('.media');
	mediaSection.innerHTML = '';
	const photographerData = await initLike();

	const updateTotalLikes = () => {
		const totalLikes = document.querySelector('.total-likes');
		totalLikes.textContent = totalLike(photographerMedia);
	}

	if(filter){
		photographerMedia.forEach((media, i) => {
			const data = photographerData.media.filter((m) => m.id === media.id);
			const mediaCard = photographerTplt.mediaCard(media, photographerMedia, i, updateTotalLikes, data[0].likes);
			mediaSection.appendChild(mediaCard);
		});
	}else{
		let media = photographerMedia.sort((a, b) => b.likes - a.likes);
		media.forEach((media, i) => {
			const data = photographerData.media.filter((m) => m.id === media.id);
			const mediaCard = photographerTplt.mediaCard(media, photographerMedia, i, updateTotalLikes, data[0].likes);
			mediaSection.appendChild(mediaCard);
		});
	}
}

const initLike = async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
	const photographerData = await getPhotographerById(id);
	return photographerData;
}

const init = async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
	const photographerData = await getPhotographerById(id);
	const photographerTplt = photographerTemplate(photographerData.photographer);
	photographerTplt.displayPhotographerData();
	photographerTplt.formContactTitle();
	photographerTplt.displayInfoPhotographer(totalLike(photographerData.media));
	customSelect(photographerData.media,photographerTplt);
	await displayMedia(photographerTplt,photographerData.media, false);
}

init();