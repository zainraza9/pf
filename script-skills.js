const skillsData = [
  { name: "UNITY", percentage: 95 },
  { name: "C#", percentage: 90 },
  { name: "Game Mechanics", percentage: 85 },
  { name: "Mobile Games", percentage: 90 },
  { name: "Shader Development", percentage: 80 },
  { name: "Prototyping", percentage: 85 },
  { name: "AR/VR/XR Development", percentage: 75 },
  { name: "Unity Editor Scripting", percentage: 70 },
  
];

function createSkills() {
  const container = document.getElementById('skillZ_container');
  container.innerHTML = skillsData.map(skill => `
    <div class="skillZ_row">
      <div class="skillZ_name">${skill.name}</div>
      <div class="skillZ_barWrapper">
        <div class="skillZ_barBg">
          <div class="skillZ_barFill" style="width: 0%" data-fill="${skill.percentage}"></div>
        </div>
      </div>
      <div class="skillZ_percentage">${skill.percentage}%</div>
    </div>
  `).join('');
}

function animateBars() {
  const bars = document.querySelectorAll('.skillZ_barFill');
  bars.forEach(bar => {
    const fill = bar.getAttribute('data-fill');

    // Force 0% first
    bar.style.width = '0%';

    // Trigger animation after small delay
    setTimeout(() => {
      bar.style.width = `${fill}%`;
    }, 50); // 50ms is enough
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createSkills();
  animateBars();
});
