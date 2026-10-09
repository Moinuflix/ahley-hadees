document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('topic-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newTopic = {
      id: `${document.getElementById('section').value.toLowerCase()}-${Date.now()}`,
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

    try {
      const response = await fetch('/api/save-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTopic)
      });

      if (response.ok) {
        alert('✅ Topic Seedha data/topics.json File Me Save Ho Gaya!');
        // Local cache clear taaki index page par naya topic turant dikhe
        localStorage.removeItem('ahley_hadees_topics');
        form.reset();
      } else {
        alert('❌ Error saving data via Python server');
      }
    } catch (err) {
      // Fallback agar python server na chal raha ho
      const topics = getTopics();
      topics.push(newTopic);
      saveTopics(topics);
      alert('⚠️ Python server unreachable! Saved to LocalStorage.');
    }
  });
});
