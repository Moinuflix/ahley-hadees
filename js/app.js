let allTopics = [];
let currentSection = null;
let currentCategory = null;

const cardsContainer = document.getElementById('cards-container');
const breadcrumbs = document.getElementById('breadcrumbs');

document.addEventListener('DOMContentLoaded', async () => {
  allTopics = await getTopics();
  renderLevel1();
});

// Level 1: Quran ya Bible
function renderLevel1() {
  currentSection = null;
  currentCategory = null;
  breadcrumbs.innerHTML = `<strong>Home</strong>`;
  
  cardsContainer.innerHTML = `
    <div class="action-card" onclick="selectSection('Quran')">
      <h3>📖 QURAN</h3>
      <p>Explore scientific facts, Tawheed, and Quranic verses.</p>
    </div>
    <div class="action-card" onclick="selectSection('Bible')">
      <h3>✝️ BIBLE</h3>
      <p>Explore prophecies, original Hebrew/Greek references, and comparisons.</p>
    </div>
  `;
}

// Level 2: Categories (Prophecy, Science, etc.)
function selectSection(section) {
  currentSection = section;
  currentCategory = null;

  breadcrumbs.innerHTML = `
    <span onclick="renderLevel1()">Home</span> &gt; 
    <strong>${section}</strong>
  `;

  const categories = [...new Set(
    allTopics.filter(t => t.section === section).map(t => t.category)
  )];

  if (categories.length === 0) {
    cardsContainer.innerHTML = `<p>No categories found in ${section}. Add via Admin.</p>`;
    return;
  }

  cardsContainer.innerHTML = categories.map(cat => `
    <div class="action-card" onclick="selectCategory('${cat}')">
      <h3>${cat}</h3>
      <p>View all topics under ${cat}</p>
    </div>
  `).join('');
}

// Level 3: Topics List Cards (Prophecy 1, Prophecy 2, etc.)
function selectCategory(category) {
  currentCategory = category;

  breadcrumbs.innerHTML = `
    <span onclick="renderLevel1()">Home</span> &gt; 
    <span onclick="selectSection('${currentSection}')">${currentSection}</span> &gt; 
    <strong>${category}</strong>
  `;

  const filteredTopics = allTopics.filter(
    t => t.section === currentSection && t.category === category
  );

  cardsContainer.innerHTML = filteredTopics.map(item => `
    <div class="action-card" onclick="openTopic('${item.id}')">
      <span class="badge">${item.verseRef}</span>
      <h3>${item.title}</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem;">Click for Verse & Study Details →</p>
    </div>
  `).join('');
}

function openTopic(id) {
  window.location.href = `topic.html?id=${id}`;
}