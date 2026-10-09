document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('topic-form');
  const exportBtn = document.getElementById('export-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const topics = await getTopics();
    const newId = `${document.getElementById('section').value.toLowerCase()}-${Date.now()}`;

    const newTopic = {
      id: newId,
      section: document.getElementById('section').value,
      category: document.getElementById('category').value.trim(),
      title: document.getElementById('title').value.trim(),
      verseRef: document.getElementById('verseRef').value.trim(),
      classicalTamil: document.getElementById('classicalTamil').value.trim(),
      modernTamil: document.getElementById('modernTamil').value.trim(),
      question: document.getElementById('question').value.trim(),
      answer: document.getElementById('answer').value.trim(),
      sources: document.getElementById('sources').value.trim()
    };

    topics.push(newTopic);
    saveTopics(topics);

    alert('Topic successfully saved! Automatically visible in drill-down view.');
    form.reset();
  });

  // Export updated topics.json file download karne ke liye
  exportBtn.addEventListener('click', async () => {
    const topics = await getTopics();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(topics, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "topics.json");
    dlAnchorElem.click();
  });
});