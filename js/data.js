const STORAGE_KEY = 'ahley_hadees_topics';

async function getTopics() {
  const localData = localStorage.getItem(STORAGE_KEY);
  if (localData) {
    return JSON.parse(localData);
  }
  
  try {
    const response = await fetch('data/topics.json');
    const data = await response.json();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Data load error:", error);
    return [];
  }
}

function saveTopics(topics) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
}