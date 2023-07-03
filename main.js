let buttons = document.querySelectorAll('button');

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

// button.addEventListener('click', () => {
//   playClickSound();
// });


buttons.forEach(function (button) {
  button.addEventListener('click', () => {
    playClickSound();
  });
});