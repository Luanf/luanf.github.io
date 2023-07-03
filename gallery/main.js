var imagesText = [
  {
    header: "Pencil",
    caption: `Pure potential, released
Strokes of graphite lead
A masterpiece, complete`
},
  {
    header: "Change",
    caption: `Everyday signs of change
A sequence of accidents
Our destinies rearrange` },
  {
    header: "Sway", 
    caption: `Through gentle sway
Beauty finds its way`
},
  {
    header: "Louder", 
    caption: `Supernovas fade away
But love forever stays` 
},
  {
    header: "Game",
    caption: `Static rules, game begins.
Dynamic moves searches the win,
Chaos ordered by discipline.`
 },
  {
    header: "Ancient", 
    caption: `Mountains rise tall and strong,
Melodies played slow and long.
Echoes of ancient song,
For long etched in stone.`
},
  {
    header: "Belt", caption: `The world a conveyor belt
A stream of packages passing by
Notice it, and choose with care` },
  {
    header: "Elegant", caption: `Graceful dancers leap and twirl,
In perfect harmony with the world.
Elegant movements, fluid and light,
A dance of beauty, pure and bright.`
},
  {
    header: "Library", caption: `Librarian's skill,
In the mind apply,
Virtues to find.` },
  {
    header: "Apparent", caption: `Fleeting clouds in the sky
Our dreams and aspirations
Dissipate as they fly by
Nothing else but sensations.


An immense machinery
Of apparent solidity
At a moment diminishes
Nothing else but memories.`
},
  {
    header: "Brain", caption: `Pure complexity
Perfectly asymmetric` },
  {
    header: "Quest", caption: `Fishing for dreams,
In the river of life,
Man's quest supreme.` },
  {
    header: "Without", caption: `Long before we've been,
The world spins on, serene,
Miracles, in every scene.

Long after we've gone,
The stars shine on and on,
Miracles, the night's song.

Without a name,
Nature's wonder,
All the same.` },
  {
    header: "Mirror", caption: `Each face a mirror
Myself, distorted
A never-ending cycle
Of self-discovery` },
  {
    header: "Express", caption: `No time to second guess
Only time to express` },
  {
    header: "Savor", caption: `I move in slow, slow savor
A prisoner of time's flavor
Eternity is my release
My mind at peace` },
  {
    header: "Might", caption: `Captain of the ship
Through the vast sea
In a life long trip


Sea, boat, soul
We are all it
One and whole


The darkest nights
The fiercest storms
The captain's might.` },
  {
    header: "Goldilocks", caption: `A delicate dance,
All up to chance,
Nothing too far,
Moderation in all.` },
  {
    header: "Janus", caption: `In deep meditation,
Past and future,
Present.` },
  {
    header: "Cliff", caption: `The ocean crashes below,
As I stand atop the cliff,
The world at my feet.` },
  {
    header: "Wonder", caption: `Wonder, the highest of all
Feelings of joy, heart standing tall
Limit of man, nothing further to recall` },
  { header: "Patience", caption: "The secret of saying something new is to be patient." },
  {
    header: "Dice", caption: `If there was ever a void
In the boundarylessness
An edgeless dice.


If there is a universe
Through its boundaries
We are the dice,


Lucky enough to be
Of all things
Unlucky` },
  {
    header: "Fox", caption: `"As I walked home last night, I saw a lone fox 
    dancing in the cold moonlight.
I stood and watched; then took the low road, 
knowing the night was his by right.
Sometimes, when words ring true,
I’m like a lone fox dancing in the morning dew."
Ruskin Bond` },
  {
    header: "Cycles", caption: `cycles, cycles everywhere
a cycle that's infinite
and Divine

Happy New Year` },
  {
    header: "Airplanes", caption: `High above the clouds they soar,
Machines of metal, grace, and power,
Impressive beasts that never bore.` },
  {
    header: "Cow", caption: `Its sweet dark eyes were the last thing I've seen.
Awakening, the first thing I remember thinking,
Basking in the sunset, a beautiful dream.` },
  {
    header: "Art", caption: `"There are moments in our lives, there are moments in a day, when we seem to see beyond the usual. Such are the moments of our greatest happiness. Such are the moments of our greatest wisdom. If one could but recall this vision by some sort of sign. It was in this hope that the arts were invented. Signposts on the way to what may be. Signposts toward greater knowledge."

Robert M. Pirsig` },
];

window.onload = function () {
  createImageGrid();
  
  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];

  span.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      modal.style.display = "none";
    }
  });
  
  // Redraw the grid on window resize
  window.onresize = function() {
    createImageGrid();
  }
}

function createImageGrid() {
  var numColumns = setNumColumns();
  var grid = document.getElementById('imageGrid');
  var imageCount = 28;  // Change this to the actual number of images

  // Clear existing images
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  var lastRowCount = imageCount % numColumns;
  var normalWidth = 100 / numColumns;
  var lastRowWidth = 100 / lastRowCount;

  for (var i = imageCount; i >= 1; i--) {
    (function (i) {
      var img = document.createElement('img');
      img.src = 'images/image' + i + '.webp';

      // If this image is in the last row, make it fill the remaining space
      if (i <= lastRowCount) {
        img.style.width = `${lastRowWidth}%`;
      } else {
        img.style.width = `${normalWidth}%`;
      }

      img.onclick = function () {
        var index = imageCount - i;
        openModal(this.src, index);
      }
      img.addEventListener('mouseover', function () {
        playHoverSound(); // Play the hover sound
      });
      grid.appendChild(img);
    })(i);
  }
}


function setNumColumns() {
  var screenWidth = window.innerWidth;
  var numColumns;

  if (screenWidth >= 1200) {        // Large screens
    numColumns = 5;
  } else if (screenWidth >= 600) {  // Medium screens
    numColumns = 3;
  } else {                          // Small screens
    numColumns = 2;
  }

  document.body.style.setProperty('--num-columns', numColumns);
  return numColumns;
}

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


function openModal(src, index) {
  playClickSound();
  var modal = document.getElementById('myModal');
  var modalImg = document.getElementById("img01");
  var captionContainer = document.getElementById("caption");
  var modalHeader = document.getElementById("modal-header");

  modal.style.display = "block";
  modalImg.src = src;
  modalHeader.innerHTML = imagesText[index].header;

  // Remove any existing caption text
  while (captionContainer.firstChild) {
    captionContainer.removeChild(captionContainer.firstChild);
  }

  // Split the caption text into paragraphs and insert each one as a separate <p> element
  var paragraphs = imagesText[index].caption.split('\n');
  for (var i = 0; i < paragraphs.length; i++) {
    var paragraph = document.createElement('p');
    paragraph.innerText = paragraphs[i];
    paragraph.classList.add('fade-in');
    captionContainer.appendChild(paragraph);
  }
}

function closeModal() {
  if (location.hash) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
  var modal = document.getElementById('myModal');
  modal.style.display = "none";
}

function playHoverSound() {
  const context = new AudioContext();

  const duration = 0.05;
  const attack = 0.01;
  const release = duration - attack;

  const bufferSize = context.sampleRate * duration;
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const data = buffer.getChannelData(0);

  const baseFrequency = 60; // Adjust this value for the bass sound
  const hoverFrequency = 55; // Adjust this value for the lower hover sound

  for (let i = 0; i < bufferSize; i++) {
    const t = i / context.sampleRate;
    const value = Math.sin(2 * Math.PI * baseFrequency * t) * Math.exp(-8 * t);
    const hoverValue = Math.sin(2 * Math.PI * hoverFrequency * t) * Math.exp(-8 * t);
    data[i] = value + hoverValue * 0.05 // Adjust the hover volume (0.3) as desired
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
}

function goToRootPage() {
  var currentURL = window.location.href;
  // check if contains www
  if (currentURL.indexOf('www') > -1) {
    window.location.href = 'https://www.luonline.info';
  } else {
    window.location.href = 'https://luonline.info';
  }
}
