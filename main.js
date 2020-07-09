(async function start() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true
  });

  const audioContext = new AudioContext();
  const mediaStreamSource = audioContext.createMediaStreamSource(stream);

	const processor = audioContext.createScriptProcessor(512);
  const element = document.getElementById("value");
	processor.onaudioprocess = e => {
	  const buffer = e.inputBuffer.getChannelData(0);
	  let sum = 0;

    for (const v of buffer) {
      sum += v * v;
    }

    const volume =  (Math.sqrt(sum / buffer.length) * 100).toPrecision(3);
    element.textContent = volume;
    element.style.transform = `scale(${volume})`;
  };
  mediaStreamSource.connect(processor);
	processor.connect(audioContext.destination);
})();
