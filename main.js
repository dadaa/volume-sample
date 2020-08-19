(async function start() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true
  });

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  const mediaStreamSource = audioContext.createMediaStreamSource(stream);

	const processor = audioContext.createScriptProcessor(512);
  const sectionEl = document.querySelector("section");
  const labelEl = document.querySelector("label");

	processor.onaudioprocess = e => {
    const buffer = e.inputBuffer.getChannelData(0)

    let total = i = 0
    for (let i = 0; i < buffer.length; i++) {
      total += Math.abs(buffer[i]);
    }

    const rms = Math.sqrt(total / buffer.length);
    sectionEl.style.height = `${rms * 100}%`;
    labelEl.textContent = `${parseInt(rms * 100)}%`;
    labelEl.style.fontSize = `${100 + rms * 100}px`;
  };
  mediaStreamSource.connect(processor);
	processor.connect(audioContext.destination);
})();
