const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const marqueeText = document.getElementById("marqueeText");
const generateBtn = document.getElementById('aboutBtn');

canvas.width = 852;
canvas.height = 90.22;

let x = canvas.width;
let textColor = '#FFFFFF';
let bgColor = 'transparent';
let text = '';
let animating = false;
let gif;
let captureGif = false;
let gifReady = false;
let start = performance.now();

function draw() {
  if (!animating) return;
  const textWidth = ctx.measureText(text).width;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '42px sans-serif';
  ctx.fillStyle = textColor;
  ctx.fillText(text, x, canvas.height / 2 + 10);

  // Start capturing gif when text starts to appear from the right
  if (x + textWidth >= (canvas.width - 150) && !captureGif && !gifReady) {
    captureGif = true;
    startCapturingGif();
  }

  // Stop capturing when text fully disappears to the left
  const limit = -Math.floor(textWidth);
  if (!gifReady && captureGif && x < 0 && Math.abs(x) >= Math.abs(limit) - 20) {
    captureGif = false;
    finishCapturingGif();
  }

  if (captureGif) {
    gif.addFrame(ctx, { copy: true, delay: 25 });
  }

  x -= 5;
  if (x + textWidth < 0) {
    x = canvas.width;
  }

  requestAnimationFrame(draw);
}

function startCapturingGif() {
  gif = new GIF({
    workers: 2,
    quality: 10,
    width: canvas.width,
    height: canvas.height
  });

}

function finishCapturingGif() {
  gif.on('finished', function (blob) {
    let end = performance.now();
    window.URL.revokeObjectURL(blob);

    let blobUrl = window.URL.createObjectURL(blob);

    let downloadLink = document.getElementById('hiddenDownloadLink');
    downloadLink.href = blobUrl;
    downloadLink.download = 'profile-marquee.gif';

    gifReady = true;

    // Enable the about button and change text back to "Download GIF"
    generateBtn.classList.remove('preparing');
    generateBtn.textContent = "Download GIF";
    generateBtn.disabled = false;
    marqueeText.disabled = true; // Enable the text input

  });

  gif.render();
}

function generateMarquee() {
  start = performance.now();
  text = marqueeText.value;

  if (marqueeText.value.trim() === '') {
    marqueeText.style.border = '2px solid red';
    marqueeText.classList.add('animate');
    return;
  }

  generateBtn.textContent = "Preparing GIF...";
  generateBtn.classList.add('preparing');
  generateBtn.disabled = true;

  generateBtn.style.animationDuration = `${text.length / (0.00290 * 1000)}s`;

  textColor = document.getElementById("marqueeTextColor").value;
  bgColor = document.getElementById("marqueeBgColor").value;
  x = canvas.width;
  animating = true;

  marqueeText.disabled = true;
  // also make the text background grayer (not that dark)
  marqueeText.style.backgroundColor = '#eee';

  draw();
}

marqueeText.addEventListener('input', function () {
  this.style.border = '2px solid #666';
  this.classList.remove('animate');
});

generateBtn.addEventListener('click', function (event) {
  if (gifReady) {
    document.getElementById('hiddenDownloadLink').click();
  } else {
    generateMarquee();
  }
});

document.getElementById('resetBtn').addEventListener('click', function () {
  // Get the download link
  let downloadLink = document.getElementById('hiddenDownloadLink');

  // Revoke the old ObjectURL
  window.URL.revokeObjectURL(downloadLink.href);

  // Remove the href from the download link
  downloadLink.removeAttribute('href');

  // Reset text field
  marqueeText.value = '';
  marqueeText.disabled = false; // Enable the text input
  // revert background color change:
  marqueeText.style.backgroundColor = '#fff';

  // Reset color pickers
  // document.getElementById('marqueeTextColor').value = '#FFFFFF';
  // document.getElementById('marqueeBgColor').value = '#000000';

  // Reset canvas and related variables
  animating = false;
  gif = null;  // Reset the gif object
  captureGif = false; // Reset gif capture status
  gifReady = false;  // Reset gif ready status
  x = canvas.width;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Reset button text and status
  generateBtn.textContent = "Generate";
  generateBtn.disabled = false;
  generateBtn.classList.remove('preparing');

  // Reset the text field's border color
  marqueeText.style.border = '2px solid #666';
});


document.body.addEventListener('keypress', function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById('aboutBtn').click();
  }
});

document.body.addEventListener('keydown', function (event) {
  // The 'Escape' key
  if (event.key === 'Escape') {
    // Trigger the clear button click
    document.getElementById('resetBtn').click();
  }
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
