import { MediaFactory } from "../factory/media.js";

export const closeModalLightbox = () => {
	const modal = document.getElementById("lightbox-modal");
	modal.style.display = "none";
}

export const displayModalLightbox = () => {
	const modal = document.getElementById("lightbox-modal");
	modal.style.display = "block";
}

const updateMediaContent = (media, i) =>  {
    const middleLightbox = document.querySelector('.middle-lightbox');
    middleLightbox.innerHTML = '';
    const mediaElement = MediaFactory.createMedia(media[i], true);
    const mediaRendered = mediaElement.render();
    mediaRendered.setAttribute("tabindex", "-1");
    middleLightbox.appendChild(mediaRendered);
    const title = document.createElement('p');
    title.textContent = media[i].title;
    title.setAttribute('role', 'text');
    middleLightbox.appendChild(title);
    setTimeout(() => {
        mediaRendered.focus();
    }
    , 50);
};


//navigation clavier et click pour la lightbox
export const navigationChevron = (media, i) => {
    const chevronLeft = document.querySelector('.chevron-left');
    const chevronRight = document.querySelector('.chevron-right');

    const handlePrevious = () => {
        if(i === 0){
            i = media.length - 1;
        }
        else{
            i--;
        }
        updateMediaContent(media, i);
    };

    const handleNext = () => {
        if(i === media.length - 1){
            i = 0;
        }
        else{
            i++;
        }
        updateMediaContent(media, i);
    };

    chevronLeft.addEventListener('click', handlePrevious);
    chevronRight.addEventListener('click', handleNext);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft'){
            handlePrevious();
        }
        else if (e.key === 'ArrowRight'){
            handleNext();
        }
        else if (e.key === 'Escape'){
            closeModalLightbox();
        }
    });
};