// Game development skills data
const skillsData = [
  { name: "UNITY", percentage: 90 },
  { name: "C#", percentage: 85 },
  { name: "GAMER-LAY", percentage: 90 },
  { name: "MECHANICS", percentage: 50 },
  { name: "PROJECTS", percentage: 95 },
  { name: "LGP", percentage: 85 },
  { name: "DN", percentage: 85 },
  { name: "HTML & CSS", percentage: 80 }
];

// Function to create skills HTML
function createSkills() {
  const container = document.getElementById('skills-container');
  
  skillsData.forEach(skill => {
    const skillHTML = `
      <div class="skill-item">
        <div class="skill-name">${skill.name}</div>
        <div class="skill-bar-container">
          <div class="skill-bar">
            <div class="skill-progress" data-percent="${skill.percentage}"></div>
          </div>
          <div class="skill-percentage">${skill.percentage}%</div>
        </div>
      </div>
    `;
    container.innerHTML += skillHTML;
  });
}

// Function to animate skills when scrolled into view
function animateSkills() {
  const skillsSection = document.getElementById('skills');
  const skillProgresses = document.querySelectorAll('.skill-progress');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillProgresses.forEach(progress => {
          const percent = progress.getAttribute('data-percent');
          progress.style.width = `${percent}%`;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(skillsSection);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  createSkills();
  animateSkills();
});