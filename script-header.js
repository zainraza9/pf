function initHeader() {
    fetch('data-header.json')
        .then(response => response.json())
        .then(data => {
            const header = document.createElement('header');
            header.className = 'header_container';
            
            header.innerHTML = `
                <div class="header_wrapper">
                    <div class="header_nav">
                        <img src="${data.developer.logo}" alt="Logo" class="header_logo">
                        <nav class="header_links">
                            ${data.navLinks.map(link => 
                                `<a href="#${link.id}" class="header_link">${link.name}</a>`
                            ).join('')}
                        </nav>
                    </div>
                    <div class="header_hero">
                        <img src="${data.developer.profilePic}" alt="Profile" class="profile-pic">
                        <h1 class="header_name">${data.developer.name}</h1>
                        <h2 class="header_designation">${data.developer.designation}</h2>
                        <div class="header_buttons_sec">
                            <a href="#contactF" class="header_button button-primary">GET IN TOUCH</a>
                            <a href="${data.developer.resumeUrl}" download class="header_button button-secondary">GET MY CV</a>
                        </div>
                        <p class="header_intro">${data.developer.intro}</p>
                    </div>
                </div>
            `;
            
            document.body.prepend(header);
            initHeaderNavigation();
        })
        .catch(error => console.error('Header initialization failed:', error));
}

function initHeaderNavigation() {
    // Smooth scrolling for navigation
    document.querySelectorAll('.header_link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId)?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', initHeader);