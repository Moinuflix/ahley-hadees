let allTopics = [];
let currentSection = null;
let currentCategory = null;

const cardsContainer = document.getElementById('cards-container');
const breadcrumbs = document.getElementById('breadcrumbs');

document.addEventListener('DOMContentLoaded', async () => {
  allTopics = await getTopics();
  renderLevel1();
});

function renderLevel1() {
  currentSection = null;
  currentCategory = null;
  breadcrumbs.innerHTML = `<strong>📍 Main Library</strong>`;
  
  cardsContainer.innerHTML = `
    <div class="action-card" onclick="selectSection('Quran')">
      <div class="icon">📖</div>
      <h3>Holy Quran</h3>
      <p>Scientific insights, Tawheed, and Quranic verses with linguistic breakdown.</p>
    </div>
    <div class="action-card" onclick="selectSection('Bible')">
      <div class="icon">✝️</div>
      <h3>The Bible</h3>
      <p>Prophecies, original Hebrew/Greek textual points, and comparative analysis.</p>
    </div>
  `;
}

function selectSection(section) {
  currentSection = section;
  breadcrumbs.innerHTML = `
    <span onclick="renderLevel1()">Home</span>
    <span style="margin: 0 8px;">›</span>
    <strong>${section}</strong>
  `;

  const categories = [...new Set(
    allTopics.filter(t => t.section === section).map(t => t.category)
  )];

  if (categories.length === 0) {
    cardsContainer.innerHTML = `
      <div style="grid-column: 1/-1; background: white; padding: 2rem; border-radius: 12px; text-align: center;">
        <p style="color: var(--text-muted); font-size: 1.1rem;">No categories in <strong>${section}</strong> yet.</p>
        <br>
        <a href="admin.html" class="btn-primary" style="text-decoration: none; display: inline-block;">+ Add Topic via Admin</a>
      </div>
    `;
    return;
  }

  cardsContainer.innerHTML = categories.map(cat => `
    <div class="action-card" onclick="selectCategory('${cat}')">
      <div class="icon">🔍</div>
      <h3>${cat}</h3>
      <p>Click to explore all chapters under <strong>${cat}</strong>.</p>
    </div>
  `).join('');
}

function selectCategory(category) {
  currentCategory = category;
  breadcrumbs.innerHTML = `
    <span onclick="renderLevel1()">Home</span>
    <span style="margin: 0 8px;">›</span>
    <span onclick="selectSection('${currentSection}')">${currentSection}</span>
    <span style="margin: 0 8px;">›</span>
    <strong>${category}</strong>
  `;

  const filteredTopics = allTopics.filter(
    t => t.section === currentSection && t.category === category
  );

  cardsContainer.innerHTML = filteredTopics.map(item => `
    <div class="action-card" onclick="openTopic('${item.id}')">
      <span class="badge">${item.chapterRef}</span>
      <h3>${item.title}</h3>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.5rem;">
        ${item.verses ? item.verses.length : 0} Verses Study Cards →
      </p>
    </div>
  `).join('');
}

function openTopic(id) {
  window.location.href = `topic.html?id=${id}`;
}
