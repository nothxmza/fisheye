import { MediaFactory } from "../factory/media.js";
import {closeModalLightbox, displayModalLightbox, navigationChevron } from "../utils/lightbox.js";
import { displayModal } from "../utils/contactForm.js";

// Template pour les photographes
export function photographerTemplate(data) {
    const { id, name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    // Création de la carte d'un photographe
    function getUserCardDOM() {
        const article = document.createElement('article');

        const headerCard = document.createElement('div');
        headerCard.classList.add('header_card');
        const link = document.createElement('a');
        link.setAttribute("href", `photographer.html?id=${id}`);
        link.setAttribute("aria-label", `Voir la page de ${name}`);
        link.setAttribute("role", "link");
        link.setAttribute("tabindex", "0");
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        headerCard.appendChild(img);
        headerCard.appendChild(h2);
        link.appendChild(headerCard);
        article.appendChild(link);

        const footerCard = document.createElement('div');
        footerCard.classList.add('footer_card');
        const position = document.createElement('p');
        position.classList.add('country');
        position.textContent = `${city}, ${country}`;
        const p = document.createElement('p');
        p.textContent = tagline;
        const span = document.createElement('span');
        span.textContent = `${price}€/jour`;
        footerCard.appendChild(position);
        footerCard.appendChild(p);
        footerCard.appendChild(span);
        article.appendChild(footerCard);

        return (article);
    }

    // Affichage des données d'un photographe
    function displayPhotographerData(){
        const leftHeader = document.querySelector('.photograph-header-left');
        const midleHeader = document.querySelector('.photograph-header-middle');
        const rightHeader = document.querySelector('.photograph-header-right');

        const title = document.createElement('h1');
        title.textContent = name;
        const location = document.createElement('p');
        location.classList.add('location');
        location.textContent = `${city}, ${country}`;
        const taglineP = document.createElement('p');
        taglineP.classList.add('tagline');
        taglineP.textContent = tagline;

        const contactButton = document.createElement('button');
        contactButton.classList.add('contact_button');
        contactButton.textContent = 'Contactez-moi';
        contactButton.setAttribute('aria-label', `Contactez ${name}`);
        contactButton.setAttribute('role', 'button');
        contactButton.setAttribute('tabindex', '0');
        contactButton.addEventListener('click', () => {
            displayModal();
        });

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);

        leftHeader.appendChild(title);
        leftHeader.appendChild(location);
        leftHeader.appendChild(taglineP);
        midleHeader.appendChild(contactButton);
        rightHeader.appendChild(img);

        document.querySelector('.photograph-header').appendChild(leftHeader);
        document.querySelector('.photograph-header').appendChild(midleHeader);
        document.querySelector('.photograph-header').appendChild(rightHeader);
    }

    // Affichage du titre du formulaire de contact et de l'accessibilité
    function formContactTitle () {
        const modal = document.getElementById('contact-modal');
        modal.setAttribute('aria-label', `Contacte me ${name}`);
        const headerTitle = document.querySelector('.modal-header-title');
        const namePhotograph = document.createElement('h1');
        namePhotograph.textContent = name;
        namePhotograph.setAttribute('role', 'heading');
        headerTitle.appendChild(namePhotograph);
    }

    // Affichage des informations du photographe (nombre de likes et prix)
    function displayInfoPhotographer(totalLike) {
	    const info = document.querySelector('.info');
        const infoPhotograph = document.createElement('div');
        infoPhotograph.classList.add('info-photographer');
        const leftInfo = document.createElement('div');
        leftInfo.classList.add('left-info');
        const likes = document.createElement('p');
        likes.classList.add('total-likes');
        likes.textContent = totalLike;
        const heart = document.createElement('i');
        heart.classList.add('fa-solid', 'fa-heart');
        heart.setAttribute('aria-label', 'likes');
        leftInfo.appendChild(likes);
        leftInfo.appendChild(heart);
        const priceInfo = document.createElement('p');
        priceInfo.textContent = `${price}€/jour`;
        infoPhotograph.appendChild(leftInfo);
        infoPhotograph.appendChild(priceInfo);

        info.appendChild(infoPhotograph);
    }

    // Création de la carte d'un média
    function mediaCard(media, mediaList, mediaIndex, updateTotalLikes, defaultLikes) {
        const card = document.createElement('article');
        const lightbox = document.querySelector('.lightbox');
        card.classList.add('card');
        card.setAttribute('role', 'article');
        card.setAttribute('aria-label', media.title);

        const cardMedia = document.createElement('div');
        cardMedia.classList.add('card-media');
        const mediaElement = MediaFactory.createMedia(media, false);
        cardMedia.setAttribute('role', 'link');
        cardMedia.setAttribute('tabindex', '0');
        cardMedia.setAttribute('aria-label', `Voir ${media.title}`);
        cardMedia.appendChild(mediaElement.render());
        cardMedia.addEventListener('click', () => {
            lightbox.innerHTML = '';
            displayModalLightbox();
            displayLightbox(mediaList, mediaIndex);
        });

        cardMedia.addEventListener('keydown', (e) => {
            if(e.key === 'Enter'){
                lightbox.innerHTML = '';
                displayModalLightbox();
                displayLightbox(mediaList, mediaIndex);
            }
        });

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        const title = document.createElement('h2');
        title.textContent = media.title;
        cardContent.appendChild(title);
        const cardLikes = document.createElement('div');
        cardLikes.classList.add('card-likes');
        const likes = document.createElement('p');
        likes.textContent = media.likes;
        cardLikes.appendChild(likes);
        const heart = document.createElement('i');
        heart.classList.add('fa-solid', 'fa-heart');
        heart.setAttribute('aria-label', 'likes');
        heart.addEventListener('click', () => {
            if(media.likes === defaultLikes){
                media.likes++;
                likes.textContent = media.likes;
                updateTotalLikes();
            }
        });
    
        cardLikes.appendChild(heart);
        cardContent.appendChild(cardLikes);
        card.appendChild(cardMedia);
        card.appendChild(cardContent);
    
        return card;
    }

    // Affichage de la lightbox
    function displayLightbox(media, i){
        const lightbox = document.querySelector('.lightbox');
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-label', 'image closeup view')
        const leftLightbox = document.createElement('div');
        leftLightbox.classList.add('left-lightbox');
        const chevronLeft = document.createElement('i');
        chevronLeft.classList.add('fa-solid', 'fa-chevron-left', 'chevron-left');
        chevronLeft.setAttribute('aria-label', 'previous image');
        chevronLeft.setAttribute('role', 'link');
        leftLightbox.appendChild(chevronLeft);
        const middleLightbox = document.createElement('div');
        middleLightbox.classList.add('middle-lightbox');

        const mediaElement = MediaFactory.createMedia(media[i], true);
        const mediaRendered = mediaElement.render();
        mediaRendered.setAttribute("tabindex", "-1");
        middleLightbox.appendChild(mediaRendered);

        const title = document.createElement('p');
        title.textContent = media[i].title;
        title.setAttribute('role', 'text');
        middleLightbox.appendChild(title);

        const rightLightbox = document.createElement('div');
        rightLightbox.classList.add('right-lightbox');
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('close-btn');
        closeBtn.setAttribute('aria-label', 'close dialog');
        closeBtn.setAttribute('role', 'button');
        closeBtn.addEventListener('click', () => {
            closeModalLightbox();
        });
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fa-solid', 'fa-x');
        closeBtn.appendChild(closeIcon);
        rightLightbox.appendChild(closeBtn);
        const chevronRight = document.createElement('i');
        chevronRight.classList.add('fa-solid', 'fa-chevron-right', 'chevron-right');
        chevronRight.setAttribute('aria-label', 'next image');
        chevronRight.setAttribute('role', 'link');
        rightLightbox.appendChild(chevronRight);

        lightbox.appendChild(leftLightbox);
        lightbox.appendChild(middleLightbox);
        lightbox.appendChild(rightLightbox);
        setTimeout(() => {
            mediaRendered.focus();
        }, 50);
        navigationChevron(media, i);
    }

    return { name, picture, getUserCardDOM, displayPhotographerData, formContactTitle, displayInfoPhotographer, mediaCard, displayLightbox };
}