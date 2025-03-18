export function displayModal() {
    const modal = document.getElementById("contact-modal");
    
    modal.style.display = "block";
    modal.classList.remove("modal-close");
    modal.classList.add("modal-open");
    
    const focusableElements = modal.querySelectorAll('button,input');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    firstFocusableElement.focus();

    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault();
                    firstFocusableElement.focus();
                }
        }
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById("contact-modal");
    const form = document.getElementById("contact-form");
    form.reset();
    modal.style.display = "none";
    modal.classList.remove("modal-open");
    modal.classList.add("modal-close");
}
window.closeModal = closeModal;

// Fonction pour afficher les données du formulaire
const sendDataForm = () => {
	const firstName = document.getElementById('first-name').value;
	const lastName = document.getElementById('last-name').value;
	const email = document.getElementById('email').value;
	const message = document.getElementById('message').value;
	console.log(`firstname: ${firstName} \nlastname: ${lastName} \nemail: ${email}\nmessage: ${message}`);
    closeModal();
}
window.sendDataForm = sendDataForm;