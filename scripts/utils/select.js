import {displayMedia} from '../pages/photographer.js';

//création du select personnalisé
export const customSelect = (media,photographerTplt) => {
	const button = document.getElementById("select-button");
	const options = document.getElementById("select-options");
	const optionItems = options.querySelectorAll("li");

	button.addEventListener("click", () => {
		options.classList.toggle("hidden");
        button.classList.toggle("active");
        button.setAttribute("aria-expanded", button.classList.contains("active"));

		//cache l'option déjà sélectionnées
		optionItems.forEach(item => {
			if (item.classList.contains("selected")) {
				item.classList.add("hidden");
			} else {
				item.classList.remove("hidden");
			}
		});
	});
	
	optionItems.forEach(item => {
		item.setAttribute("tabindex", "0");

		//select avec le clavier
		item.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
                button.innerHTML = `${item.textContent} <i class="fa-solid fa-chevron-down chevron-select"></i>`;
                button.setAttribute("aria-expanded", "false");
                button.classList.remove("active");

                options.classList.add("hidden");
                options.setAttribute("aria-activedescendant", item.id);

                optionItems.forEach((i) =>{
                    i.classList.remove("selected");
                    i.setAttribute("aria-selected", "false");
                });

                item.classList.add("selected");
                item.setAttribute("aria-selected", "true");

                fitlerMedia(media, item.id, photographerTplt);
                updateLastVisibleBorders();
            }		
        });

		//select avec la souris
		item.addEventListener("click", () => {
			button.innerHTML = `${item.textContent} <i class="fa-solid fa-chevron-down chevron-select"></i>`;
			button.setAttribute("aria-expanded", "false");
			button.classList.remove("active");

			options.classList.add("hidden");
			options.setAttribute("aria-activedescendant", item.id);

			optionItems.forEach((i) =>{
				i.classList.remove("selected");
				i.setAttribute("aria-selected", "false");
			});

			item.classList.add("selected");
			item.setAttribute("aria-selected", "true");

			fitlerMedia(media, item.id,photographerTplt);
			updateLastVisibleBorders();
		});
	});

	//ne pas afficher la dernier bordure
	const updateLastVisibleBorders = () => {
		optionItems.forEach(li => li.classList.remove("last-visible"));
		const visibleItems = [...optionItems].filter(li => !li.classList.contains("selected"));
		visibleItems[visibleItems.length - 1].classList.add("last-visible");
	};
	updateLastVisibleBorders();
}

const fitlerMedia = (media, filter,photographerTplt) => {
	if(filter === 'popular') {
		media.sort((a, b) => b.likes - a.likes);
	} else if(filter === 'date') {
		media.sort((a, b) => new Date(b.date) - new Date(a.date));
	}else if(filter === 'title') {
		media.sort((a, b) => a.title.localeCompare(b.title));
	}
	displayMedia(photographerTplt, media, true);
}