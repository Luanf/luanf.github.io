let attemptNumber = 0;
let triviaQueue = [];
let currentIndex = 0;
let awardInterval;

document.getElementById('backBtn').addEventListener('click', function () {
  // wait 200ms, then back
  setTimeout(function () {
    window.history.back();
  }, 600);
});


document.getElementById('aboutBtn').addEventListener('click', async function () {
  let button = document.getElementById('aboutBtn');
  console.log({ triviaQueue, currentIndex });

  if (triviaQueue.length < 10) {
    // Fetch more trivia if the queue is running low
    fetchTrivia();
  }

  updateAward();

  // Add class to animate fading
});

document.getElementById('speedSlider').addEventListener('change', updateAwardRate);

function displayAward(award) {
  let awardElement = document.createElement('div');
  awardElement.innerHTML = award;

  // Add a class for the initial state (opacity 0, scaled down)
  awardElement.classList.add('award');

  // Append the new award element to the award div
  let awardDiv = document.getElementById('award');
  // but first we remove all other children
  while (awardDiv.firstChild) {
    awardDiv.removeChild(awardDiv.firstChild);
  }
  awardDiv.appendChild(awardElement);

}


function updateAward() {
  currentIndex = (currentIndex + 1) % triviaQueue.length || 0;

  // Fetch more trivia if we're near the end of the queue
  if (currentIndex >= triviaQueue.length - 5) {
    fetchTrivia();
  }

  const award = generateAward();
  displayAward(award);
}

function updateAwardRate() {
  clearInterval(awardInterval);
  awardInterval = setInterval(updateAward, 10000 - document.getElementById('speedSlider').value);
}

// Array of similar sentences
const sentenceList = [
  "Tell me more",
  "I'm interested to know more",
  "What else can you share?",
  "I'm all ears",
  "Enlighten me",
  "I'm curious",
  "Give me the details",
  "Expand on that",
  "Tell me further",
  "I want to learn more",
  "What more can you tell me?",
  "Share additional information",
  "I'm eager for more knowledge",
  "Educate me further",
  "Let me in on the secret",
  "Feed me with more facts",
  "I'm thirsty for knowledge",
  "Delve deeper into the subject",
  "Tell me the whole story",
  "I hunger for more insights",
  "What other tidbits can you provide?",
  "I'm open to further revelations",
  "Deepen my understanding",
  "Reveal more about this topic",
  "Unveil additional details",
  "Paint a more complete picture",
  "I'm ready for the next revelation",
  "Uncover more intriguing facts",
  "Stimulate my intellect",
  "Broaden my horizons",
  "Enrich my understanding",
  "Dive into more fascinating information",
  "I crave further enlightenment",
  "Teach me something new",
  "I'm captivated, tell me more",
  "Immerse me in further knowledge",
  "Engage me with additional insights",
  "I yearn for more educational content",
  "Bring forth more fascinating details",
  "Satisfy my intellectual curiosity",
  "I'm thirsty for further enlightenment",
  "Quench my thirst for knowledge",
  "I'm eager to absorb more information",
  "Whet my appetite for learning",
  "Feed me with an endless stream of facts",
  "Imbue me with boundless wisdom",
  "Elevate my understanding to new heights",
  "I'm insatiably curious, keep it coming",
  "Reveal the mysteries to me",
  "Immerse me in the knowledge",
  "Unleash the floodgates of information",
  "Let me soak up the wisdom",
  "Take me on a journey of discovery",
  "Enlighten me with your expertise",
  "Open my mind to new insights",
  "Unravel the complexities for me",
  "Satisfy my hunger for learning",
  "Engross me in fascinating details",
  "Ignite my passion for knowledge",
  "Unearth hidden gems of information",
  "Tease my intellect with more",
  "Unlock the vault of wisdom",
  "Deepen my knowledge",
  "Show me the bigger picture",
  "Reveal the inner workings",
  "Sate my thirst for understanding",
  "Guide me through uncharted territories",
  "Sharpen my intellect with your words",
  "Unmask the secrets for me",
  "Paint vivid pictures of knowledge",
  "Imprint new ideas in my mind",
  "Lead me to new revelations",
  "I'm an eager student, enlighten me",
  "Unveil the mysteries of the universe",
  "Expand the boundaries of my knowledge",
  "Enlighten me with your vast expertise",
  "Fuel my curiosity with more insights",
  "Break down complex concepts for me",
  "Quench my thirst for intellectual growth",
  "Reignite the spark of learning within me",
  "Take me on an intellectual adventure",
  "Uncover the depths of wisdom",
  "Empower me with knowledge",
  "Captivate my mind with your words",
  "Immerse me in a sea of information",
  "Challenge my intellect with new ideas",
  "Elevate my understanding to new heights",
  "Indulge my craving for knowledge",
  "Reveal the hidden truths to me",
  "Unravel the mysteries of the universe",
  "Broaden my perspective",
  "Expand my mental horizons",
  "Enrich my intellectual journey",
  "Fascinate me with new discoveries",
  "Quench my intellectual curiosity",
  "Satisfy my thirst for wisdom",
  "Enlighten me with your profound insights",
  "Stimulate my mind with thought-provoking ideas",
  "Deepen my appreciation for knowledge",
  "Guide me on the path of enlightenment",
  "Empower me with transformative information",
  "Unleash the power of wisdom upon me",
  "Nourish my intellect with your words",
  "Engage me in a symphony of knowledge",
  "Immerse me in a realm of infinite learning",
  "Enthrall me with your intellectual prowess",
  "Unlock the gates of wisdom for me",
  "Fuel my thirst for intellectual discovery",
  "Awaken my intellectual curiosity",
  "Ignite the fire of learning within me",
  "Take me on a voyage of intellectual exploration",
  "Deepen my understanding of the world",
  "Enlighten me with your profound wisdom",
  "Sow the seeds of knowledge in my mind",
  "Expand my mental landscape",
  "Challenge my assumptions with new perspectives",
  "Quench my insatiable thirst for knowledge",
  "Unveil the secrets of the universe to me",
  "Nurture my intellectual growth",
  "Engross me in the wonders of knowledge",
  "Immerse me in the depths of understanding",
  "Empower me with the tools of enlightenment",
  "Guide me to new realms of knowledge",
  "Unleash the boundless potential of my mind",
  "Inspire me with your intellectual brilliance",
  "Reveal the intricacies of the world to me",
  "Broaden my intellectual horizons",
  "Awaken the dormant genius within me",
  "Ignite my passion for lifelong learning",
  "Take me on an odyssey of intellectual exploration",
  "Deepen my comprehension of the universe",
  "Enlighten me with your vast reservoir of knowledge",
  "Saturate my mind with the elixir of wisdom",
  "Engage me in an intellectual dance",
  "Immerse me in a universe of profound ideas",
  "Enrich my existence with the power of knowledge",
  "Quench my eternal thirst for intellectual stimulation",
  "Unleash the transformative power of information",
  "Nurture my insatiable hunger for wisdom",
  "Elevate my consciousness with your intellectual revelations",
  "Guide me on the path of intellectual enlightenment",
  "Empower me with the keys to intellectual liberation",
  "Awaken my mind to new possibilities",
  "Ignite my imagination with the flames of knowledge",
  "Take me on a grand adventure of intellectual discovery",
  "Deepen my understanding of the interconnectedness of all things",
  "Enlighten me with your radiant intellect",
  "Sow the seeds of inspiration in my fertile mind",
  "Engross me in the symphony of wisdom",
  "Immerse me in the ocean of knowledge",
  "Enthrall me with the marvels of the human intellect",
  "Quench my thirst for intellectual nourishment",
  "Unveil the mysteries of the mind to me",
  "Nurture my intellectual curiosity",
  "Empower me with the tools of intellectual empowerment",
  "Guide me on the path of intellectual growth",
  "Unleash the infinite potential of my intellect",
  "Inspire me with your intellectual brilliance",
  "Reveal the hidden gems of knowledge to me",
  "Broaden my intellectual vistas",
  "Awaken the dormant genius within me",
  "Ignite my passion for lifelong learning",
  "Take me on a journey of intellectual transformation",
  "Deepen my understanding of the world",
  "Enlighten me with your profound wisdom",
  "Saturate my mind with the elixir of knowledge",
  "Engage me in a dance of intellectual exploration",
  "Immerse me in a universe of infinite possibilities",
  "Enrich my existence with the power of wisdom",
  "Quench my eternal thirst for intellectual stimulation",
  "Unleash the transformative power of information",
  "Nurture my insatiable hunger for knowledge",
  "Elevate my consciousness with your profound insights",
  "Guide me on the path of intellectual enlightenment",
  "Empower me with the keys to intellectual liberation",
  "Awaken my mind to new frontiers of thought",
  "Ignite my imagination with the fire of knowledge",
  "Take me on a wondrous journey of intellectual discovery",
  "Deepen my comprehension of the mysteries of life",
  "Enlighten me with your profound understanding",
  "Sow the seeds of inspiration in the garden of my mind",
  "Engross me in the symphony of wisdom",
  "Immerse me in the ocean of knowledge",
  "Enthrall me with the wonders of the human intellect",
  "Quench my thirst for intellectual enlightenment",
  "Unveil the secrets of the mind to me",
  "Nurture my intellectual curiosity",
  "Empower me with the tools of intellectual growth",
  "Guide me on the path of intellectual exploration",
  "Unleash the infinite potential of my mind",
  "Inspire me with your intellectual brilliance",
  "Reveal the hidden treasures of knowledge to me",
  "Broaden my intellectual horizons",
  "Awaken the sleeping genius within me",
  "Ignite my passion for continuous learning",
  "Take me on an extraordinary journey of intellectual discovery",
  "Deepen my understanding of the interconnectedness of all things",
  "Enlighten me with your radiant wisdom",
  "Sow the seeds of inspiration in the fertile soil of my mind",
  "Engross me in the symphony of knowledge",
  "Immerse me in the vast ocean of wisdom",
  "Enthrall me with the marvels of human intellect",
  "Quench my thirst for intellectual growth",
  "Unveil the mysteries of the human mind to me",
  "Nurture my insatiable hunger for intellectual stimulation",
  "Empower me with the tools of intellectual enlightenment",
  "Guide me on the path of intellectual liberation",
  "Awaken my mind to new realms of thought",
  "Ignite my imagination with the sparks of knowledge",
  "Take me on a transformative journey of intellectual exploration",
  "Deepen my understanding of the world",
  "Enlighten me with your profound insights",
  "Saturate my mind with the elixir of knowledge",
  "Engage me in a dance of intellectual curiosity",
  "Immerse me in a universe of infinite possibilities",
  "Enrich my existence with the power of wisdom",
  "Quench my eternal thirst for intellectual nourishment",
  "Unleash the transformative power of information",
  "Nurture my insatiable hunger for knowledge",
  "Elevate my consciousness with your profound wisdom",
  "Guide me on the path of intellectual enlightenment",
  "Empower me with the keys to intellectual empowerment",
  "Awaken my mind to new frontiers of knowledge",
  "Ignite my passion for lifelong learning",
  "Take me on a breathtaking journey of intellectual discovery",
  "Deepen my understanding of the mysteries of life",
  "Enlighten me with your profound understanding",
  "Sow the seeds of inspiration in the garden of my mind",
  "Engross me in the symphony of wisdom",
  "Immerse me in the vast ocean of knowledge",
  "Enthrall me with the wonders of human intellect",
  "Quench my thirst for intellectual enlightenment",
  "Unveil the secrets of the mind to me",
  "Nurture my intellectual curiosity",
  "Empower me with the tools of intellectual growth",
  "Guide me on the path of intellectual exploration",
  "Unleash the infinite potential of my mind",
  "Inspire me with your intellectual brilliance",
  "Reveal the hidden treasures of knowledge to me",
  "Broaden my intellectual horizons",
  "Awaken the dormant genius within me",
  "Ignite my passion for continuous learning",
  "Take me on an extraordinary journey of intellectual discovery",
  "Deepen my understanding of the interconnectedness of all things",
  "Enlighten me with your radiant wisdom",
  "Sow the seeds of inspiration in the fertile soil of my mind",
  "Engross me in the symphony of knowledge",
  "Immerse me in the vast ocean of wisdom",
  "Enthrall me with the marvels of human intellect",
  "Quench my thirst for intellectual growth",
  "Unveil the mysteries of the human mind to me",
  "Nurture my insatiable hunger for intellectual stimulation",
  "Empower me with the tools of intellectual enlightenment",
  "Guide me on the path of intellectual liberation",
  "Awaken my mind to new realms of thought",
  "Ignite my imagination with the sparks of knowledge",
  "Take me on a transformative journey of intellectual exploration",
  "Deepen my understanding of the world",
  "Enlighten me with your profound insights",
  "Saturate my mind with the elixir of knowledge",
  "Engage me in a dance of intellectual curiosity",
  "Immerse me in a universe of infinite possibilities",
  "Enrich my existence with the power of wisdom",
  "Quench my eternal thirst for intellectual nourishment",
  "Unleash the transformative power of information",
  "Nurture my insatiable hunger for knowledge",
  "Elevate my consciousness with your profound wisdom",
  "Guide me on the path of intellectual enlightenment",
  "Empower me with the keys to intellectual empowerment",
  "Awaken my mind to new frontiers of knowledge",
  "Ignite my passion for lifelong learning",
  "Take me on a breathtaking journey of intellectual discovery",
  "Deepen my understanding of the mysteries of life",
  "Enlighten me with your profound understanding",
  "Sow the seeds of inspiration in the garden of my mind",
  "Engross me in the symphony of wisdom",
  "Immerse me in the vast ocean of knowledge",
  "Enthrall me with the wonders of human intellect",
  "Quench my thirst for intellectual enlightenment",
  "Unveil the secrets of the mind to me",
  "Nurture my intellectual curiosity",
  "Empower me with the tools of intellectual growth",
  "Guide me on the path of intellectual exploration",
  "Unleash the infinite potential of my mind",
  "Inspire me with your intellectual brilliance",
  "Reveal the hidden treasures of knowledge to me",
  "Broaden my intellectual horizons",
  "Awaken the dormant genius within me",
  "Ignite my passion for continuous learning",
  "Take me on an extraordinary journey of intellectual discovery",
  "Deepen my understanding of the interconnectedness of all things",
  "Enlighten me with your radiant wisdom",
  "Sow the seeds of inspiration in the fertile soil of my mind",
  "Engross me in the symphony of knowledge",
  "Immerse me in the vast ocean of wisdom",
  "Enthrall me with the marvels of human intellect",
  "Quench my thirst for intellectual growth",
  "Unveil the mysteries of the human mind to me",
  "Nurture my insatiable hunger for intellectual stimulation",
  "Empower me with the tools of intellectual enlightenment",
  "Guide me on the path of intellectual liberation",
  "Awaken my mind to new realms of thought",
  "Ignite my imagination with the sparks of knowledge",
  "Take me on a transformative journey of intellectual exploration",
  "Deepen my understanding of the world",
  "Enlighten me with your profound insights",
  "Saturate my mind with the elixir of knowledge",
  "Engage me in a dance of intellectual curiosity",
  "Immerse me in a universe of infinite possibilities",
  "Enrich my existence with the power of wisdom",
  "Quench my eternal thirst for intellectual nourishment",
  "Unleash the transformative power of information",
  "Nurture my insatiable hunger for knowledge",
  "Elevate my consciousness with your profound wisdom",
  "Guide me on the path of intellectual enlightenment",
  "Empower me with the keys to intellectual empowerment",
  "Awaken my mind to new frontiers of knowledge",
  "Ignite my passion for lifelong learning",
  "Take me on a breathtaking journey of intellectual discovery",
  "Deepen my understanding of the mysteries of life",
  "Enlighten me with your profound understanding",
  "Sow the seeds of inspiration in the garden of my mind",
  "Engross me in the symphony of wisdom",
  "Immerse me in the vast ocean of knowledge",
  "Enthrall me with the wonders of human intellect",
  "Quench my thirst for intellectual enlightenment",
  "Unveil the secrets of the mind to me",
  "Nurture my intellectual curiosity",
  "Empower me with the tools of intellectual growth",
  "Guide me on the path of intellectual exploration",
  "Unleash the infinite potential of my mind",
  "Inspire me with your intellectual brilliance",
  "Reveal the hidden treasures of knowledge to me",
  "Broaden my intellectual horizons",
  "Awaken the dormant genius within me",
  "Ignite my passion for continuous learning",
  "Take me on an extraordinary journey of intellectual discovery",
  "Deepen my understanding of the interconnectedness of all things",
  "Enlighten me with your radiant wisdom",
  "Sow the seeds of inspiration in the fertile soil of my mind",
  "Engross me in the symphony of knowledge",
  "Immerse me in the vast ocean of wisdom",
  "Enthrall me with the marvels of human intellect",
  "Quench my thirst for intellectual growth",
  "Unveil the mysteries of the human mind to me",
  "Nurture my insatiable hunger for intellectual stimulation",
  "Empower me with the tools of intellectual enlightenment",
  "Guide me on the path of intellectual liberation",
  "Awaken my mind to new realms of thought",
  "Ignite my imagination with the sparks of knowledge",
  "Take me on a transformative journey of intellectual exploration",
  "Deepen my understanding of the world",
  "Enlighten me with your profound insights",
  "Saturate my mind with the elixir of knowledge",
  "Engage me in a dance of intellectual curiosity",
  "Immerse me in a universe of infinite possibilities",
  "Enrich my existence with the power of wisdom",
  "Quench my eternal thirst for intellectual nourishment",
  "Unleash the transformative power of information",
  "Nurture my insatiable hunger for knowledge",
  "Elevate my consciousness with your profound wisdom",
  "Guide me on the path of intellectual enlightenment",
  "Empower me with the keys to intellectual empowerment",
  "Awaken my mind to new frontiers of knowledge",
  "Ignite my passion for lifelong learning",
  "Take me on a breathtaking journey of intellectual discovery",
  "Deepen my understanding of the mysteries of life",
  "Enlighten me with your profound understanding",
  "Sow the seeds of inspiration in the garden of my mind",
  "Engross me in the symphony of wisdom",
  "Immerse me in the vast ocean of knowledge",
  "Enthrall me with the wonders of human intellect",
  "Quench my thirst for intellectual enlightenment",
  "Unveil the secrets of the mind to me",
  "Nurture my intellectual curiosity",
  "Empower me with the tools of intellectual growth",
  "Guide me on the path of intellectual exploration",
  "Unleash the infinite potential of my mind",
  "Inspire me with your intellectual brilliance",
  "Reveal the hidden treasures of knowledge to me",
  "Broaden my intellectual horizons",
  "Awaken the dormant genius within me",
  "Ignite my passion for continuous learning",
  "Take me on an extraordinary journey of intellectual discovery",
  "Deepen my understanding of the interconnectedness of all things",
  "Enlighten me with your radiant wisdom",
  "Sow the seeds of inspiration in the fertile soil of my mind",
  "Engross me in the symphony of knowledge",
  "Immerse me in the vast ocean of wisdom",
  "Enthrall me with the marvels of human intellect",
  "Quench my thirst for intellectual growth",
  "Unveil the mysteries of the human mind to me",
  "Nurture my insatiable hunger for intellectual stimulation",
  "Empower me with the tools of intellectual enlightenment",
  "Guide me on the path of intellectual liberation",
  "Awaken my mind to new realms of thought",
  "Ignite my imagination with the sparks of knowledge",
  "Take me on a transformative journey of intellectual exploration",
  "Deepen my understanding of the world",
  "Enlighten me with your profound insights",
  "Saturate my mind with the elixir of knowledge",
  "Engage me in a dance of intellectual curiosity",
  "Immerse me in a universe of infinite possibilities",
  "Enrich my existence with the power of wisdom",
  "Quench my eternal thirst for intellectual nourishment",
  "Unleash the transformative power of information",
  "Nurture my insatiable hunger for knowledge",
  "Elevate my consciousness with your profound wisdom",
  "Guide me on the path of intellectual enlightenment",
  "Empower me with the keys to intellectual empowerment"];

// Shuffle the sentenceList array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
let sentenceIndex = 0;
function updateButtonText() {
  const button = document.getElementById('aboutBtn');
  button.innerHTML = sentenceList[sentenceIndex];
  sentenceIndex = (sentenceIndex + 1) % sentenceList.length; // Circular path
  if (sentenceIndex === 0) {
    shuffleArray(sentenceList);
  }
}
function generateAward() {
  if (attemptNumber === 0) {
    attemptNumber++;
    // remove "hidden" class from speedSlider
    document.getElementById('speedSlider').classList.remove('hidden');
    // updateAwardRate();
    // change from About to "Tell me more"
    updateButtonText();
    return "That's the spirit!";
  } else {
    if (triviaQueue[currentIndex]) {
      updateButtonText();
      return triviaQueue[currentIndex].question;
    } else {
      // If the current index is undefined, fetch more trivia and use a default message in the meantime
      fetchTrivia();
      return "Fetching more trivia...";
    }
  }
}


let apiKeySet = false;
async function fetchTrivia() {
  if (!apiKeySet) {
    const tokenResponse = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenData = await tokenResponse.json();
    apiKeySet = tokenData.token;
  }
  if (apiKeySet) {
    const response = await fetch('https://opentdb.com/api.php?amount=50&type=boolean&token=' + apiKeySet);
    const data = await response.json();
    if (data.response_code === 4) {
      // If we've run out of trivia, reset the token
      apiKeySet = false;
      fetchTrivia();
    } else {
      triviaQueue.push(...data.results.filter(item => item.correct_answer === 'True' &&
        item.category !== 'Entertainment: Video Games' &&
        item.category !== 'Entertainment: Japanese Anime & Manga' &&
        item.category !== 'Entertainment: Cartoon & Animations' &&
        item.category !== 'Entertainment: Comics' &&
        item.category !== 'Entertainment: Board Games' &&
        !item.question.includes('?') && 
        !item.question.includes('woman') &&
        !item.question.toLowerCase().includes('united states'))
        );
    }
  }
}

// Initial fetch
shuffleArray(sentenceList);
fetchTrivia();


const button = document.getElementById('aboutBtn');

function playClickSound() {
  const context = new AudioContext();

  const duration = 0.05;
  const attack = 0.01;
  const release = duration - attack;

  const bufferSize = context.sampleRate * duration;
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const data = buffer.getChannelData(0);

  const baseFrequency = 60; // Adjust this value for the bass sound

  for (let i = 0; i < bufferSize; i++) {
    const t = i / context.sampleRate;
    const value = Math.sin(2 * Math.PI * baseFrequency * t) * Math.exp(-8 * t);
    data[i] = value;
  }

  const source = context.createBufferSource();
  source.buffer = buffer;

  const gainNode = context.createGain();
  gainNode.gain.setValueAtTime(0, context.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, context.currentTime + attack);
  gainNode.gain.linearRampToValueAtTime(0, context.currentTime + duration);

  source.connect(gainNode);
  gainNode.connect(context.destination);

  source.start();

  // Add a higher-pitched click sound
  const clickOscillator = context.createOscillator();
  const clickGainNode = context.createGain();

  const clickFrequency = 600; // Adjust this value for the higher click sound

  clickOscillator.type = 'triangle';
  clickOscillator.frequency.setValueAtTime(clickFrequency, context.currentTime);
  clickOscillator.connect(clickGainNode);
  clickGainNode.connect(context.destination);

  clickGainNode.gain.setValueAtTime(0.2, context.currentTime);
  clickGainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration);

  clickOscillator.start();
  clickOscillator.stop(context.currentTime + duration);
}

button.addEventListener('click', () => {
  playClickSound();
});


// apply same sound to backBtn
document.getElementById('backBtn').addEventListener('click', () => {
  playClickSound();
});

function goToRootPage() {
  var currentURL = window.location.href;
  // check if contains www
  if (currentURL.indexOf('www') > -1) {
    window.location.href = 'https://www.luonline.info';
  } else {
    window.location.href = 'https://luonline.info';
  }
}
