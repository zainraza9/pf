function initFooter() {
    fetch('data-footer.json')
        .then(response => response.json())
        .then(data => {
            const footer = document.createElement('footer');
            footer.className = 'footer_container';
            
            footer.innerHTML = `
                <div class="footer_wrapper">
                    <div class="footer_content">
                        <h3 class="footer_heading">CONTACT</h3>
                        <p class="footer_text">${data.contactText}</p>
                        <div class="footer_socials">
                            ${data.socialLinks.map(social => 
                                `<a href="${social.url}" target="_blank" class="footer_social-link">
                                    <img src="assets/icons/${social.icon}.svg" alt="${social.name}" class="footer_social-icon">
                                </a>`
                            ).join('')}
                        </div>
                        <p class="footer_copyright">${data.copyright}</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(footer);
        })
        .catch(error => console.error('Footer initialization failed:', error));
}

document.addEventListener('DOMContentLoaded', initFooter);