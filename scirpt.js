let cachedQA = null;

async function loadQA() {
  if (!cachedQA) {
    try {
      const response = await fetch('https://raw.githubusercontent.com/dimakan200kg/history/main/q.js');
      cachedQA = await response.json();
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      cachedQA = [];
    }
  }
}

async function sa() {
  await loadQA();
  const elements = document.querySelectorAll('p, h1, h2, h3, div');

  elements.forEach(element => {
    cachedQA.forEach(qa => {
      if (element.textContent.includes(qa.question)) {
        console.log(`Вопрос: ${qa.question}`);
        console.log(`Ответ: ${qa.answer}`);
      }
    });
  });
}

async function fa(partOfQuestion) {
  await loadQA();
  const matchingQAs = cachedQA.filter(qa => qa.question.toLowerCase().includes(partOfQuestion.toLowerCase()));

  if (matchingQAs.length) {
    matchingQAs.forEach(qa => {
      console.log(`Ответ на "${qa.question}": ${qa.answer}`);
    });
  } else {
    console.log(`Вопрос, содержащий "${partOfQuestion}", не найден.`);
  }
}