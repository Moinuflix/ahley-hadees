const STORAGE_KEY = 'ahley_hadees_topics';

async function getTopics() {
  try {
    const res = await fetch('/data/topics.json?t=' + Date.now());
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    }
  } catch (e) {}

  const local = localStorage.getItem(STORAGE_KEY);
  return local ? JSON.parse(local) : [];
}
