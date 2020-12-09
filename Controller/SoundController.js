class SoundController {
  constructor(soundModel, isGuitarMode) {
    this.soundModel = soundModel
    this.isGuitarMode = isGuitarMode

    if (this.isGuitarMode) {
      this.synth = new Tone.PolySynth().toMaster();
      this.synth.set({ detune: -1200 });
    } else {
      this.synth = new Tone.AMSynth().toMaster();
    }
    
    this.synth.set({
      "filter" : {
		"type" : "lowpass"
	},
      "maxPolyphony": 2,
      "oscillator": {
        "type": this.soundModel.type
      },
      envelope: {
        attack: this.isGuitarMode ? 10 : 0.005,
        decay: this.isGuitarMode ? 0 : 0.01,
        sustain: this.isGuitarMode ? 0 : 1,
        release: 1
      }
    })

    this.tones = [...soundModel.tones]

    this.synth.loop = false
    this.synth.volume.value = this.soundModel.volume
    this.c = 0
    Tone.Transport.start()
  }

  createSound(points, lines) {
    loadPixels();

    Tone.volume = -2

    for (const [key, value] of Object.entries(points)) {
      for (const line of lines) {
        let dist = abs(floor(points[key].x) - floor(line.x))
        if (dist < 10 && points[key].prev !== floor(line.x)) {
          this.playSound(this.isGuitarMode ? line.note : null)
          points[key].prev = floor(line.x)
        }
      }
    }
  }

  playSound(tone) {
    const now = Tone.now()

    if (this.isGuitarMode) {
        if (this.synth.numberOfOutputs > 2) { return }
      this.synth.triggerAttackRelease(tone,
      1)
    } else {
      this.synth.triggerAttackRelease(this.tones[this.c],
      "8n",
      now)
      const first = this.tones.shift()
    this.tones.push(first)
    }
  }

  getNextNote() {
    return this.tones[this.c]
  }

  getNotes() {
    return this.tones
  }
}