const types = ["sine", 
               "triangle", 
               "sawtooth", 
               "square"]

class SoundModel {
  constructor(tones, volume, type, isLoop) {
    this.id = Date.now()
    this.tones = tones
    this.volume = volume
    this.type = types[type]
    this.loop = isLoop
  }
}