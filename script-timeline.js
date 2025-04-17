document.addEventListener('DOMContentLoaded', function() {
    const timelineContainer = document.querySelector('.timeline-container');
    
    // Fetch timeline data
    fetch('data-timeline.json')
        .then(response => response.json())
        .then(data => {
            data.timelineEntries.forEach((entry, index) => {
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';
                
                const content = `
                    <div class="timeline-content">
                        <h3>${entry.date}</h3>
                        <h4>${entry.role}</h4>
                        <p>${entry.company}</p>
                        <p class="description">${entry.description}</p>
                    </div>
                `;
                
                timelineItem.innerHTML = content;
                timelineContainer.appendChild(timelineItem);
            });

            // Initialize animations after content loaded
            initAnimations();
        })
        .catch(error => console.error('Error loading timeline data:', error));

    function initAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        timelineItems.forEach(item => {
            item.style.opacity = 0;
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.5s ease-out';
            observer.observe(item);
        });
    }
});