let bg
let cnv
let curLine = []
let lines = []
let points = {}

let strings = []
let numOfNotes = guitarTones.length

let noteSize
let frameRate_
let bound

let moveString

let soundController
let playerController

let prevTime = 0
let curTime = 0
let defaultFont
 
let cnvX
let cnvY

let lineImg
let showImg = 500
let showHint = 390
let showHint2 = 330

function preload() {
  //setup
  frameRate_ = 60
  noteSize = 50

  defaultFont = loadFont('Font/SansitaSwashed-Light.ttf');

  demoImg = createImg("Assets/demo.gif");
  drawImg = createImg("Assets/draw.gif");
  // dragImg = createImg("Assets/drag.gif");
  guitarImg = createImg("Assets/guitar.gif");
  bg = loadImage('Assets/bg.png');
  lineImg = loadImage('Assets/line.png');

}

function setup() {
  // createCanvas(min(500,windowWidth/2), max(500,windowHeight*3/4))
  cnv = createCanvas(windowWidth, windowHeight)
  playerController = new PlayerController(state[2])
}

function windowResized() {
  cnvX = windowWidth / (windowWidth < 1200 ? 15 : 3.5)
    cnvY = windowHeight / 6
  if (playerController.state !== state[2]) {
    setupInput()
    resizeCanvas(min(500, windowWidth / 2), max(200, windowHeight * 3 / 4));
  } else {
    resizeCanvas(windowWidth, windowHeight);
  }
}

function draw() {
  cnvX = windowWidth / (windowWidth < 1200 ? 15 : 3.5)
    cnvY = windowHeight / 6

  if (playerController.state === state[2]) {
    background(bg)
    // background('#f5c887')
    drawIntro()
  } else {
    cnv.position(cnvX, cnvY)
    fill(0, 0, 0, 10);
    rectMode(CENTER)
    rect(width/2, height/2, width, height, 25)

    curTime = millis()
    let timeDif = curTime - prevTime
    let op = map(timeDif, 0, 5000, 30, 120)

    fill(0, 0, 0, floor(op));
    rect(width/2, height/2, width, height, 25)
    // background(0, 0, 0, floor(op))
    if (timeDif >= 500) {
      prevTime = curTime
      fill(0,0,0,95);
    rect(width/2, height/2, width, height, 25)
    }

    frameRate(frameRate_);

    stroke(120)

    if (moveString) {
      strings[moveString].x = mouseX
    }
    
    const isInCanvas = mouseY < height && mouseY > 0 && mouseX > 0 && mouseX < width
    if (mouseIsPressed === true && isInCanvas) {
      // if (curLine.length == 0) {
      //   for (const [key, value] of Object.entries(strings)) {
      //     if (abs(strings[key].x - mouseX) < strings[key].d / 2) {
      //       moveString = key
      //       break
      //     }
      //   }
      // }

      if (!moveString && dist(pmouseX,pmouseY, mouseX, mouseY) > 10) {
        curLine.push({
          x: mouseX,
          y: mouseY,
          pX: pmouseX,
          pY: pmouseY
        })

        line(mouseX, mouseY, pmouseX, pmouseY);
      }
    } else if (curLine.length > 1) {
      lines.push(curLine)

      if (lines.length != 0) {
        points[lines.length - 1] = {
        x: lines[lines.length - 1][0].x,
        y: lines[lines.length - 1][0].y,
        i: 1,
        prev: points[lines.length - 1]
      }}

      curLine = []
      showImg = 0
    }
    

    if (mouseIsPressed !== true) {
      moveString = null
    }

    smoothness = slider ? slider.value() : 1

    drawCircle()
    drawStrings(strings)

    if (soundController) {
      soundController.createSound(points, strings)
    }


    const conf = {
      padding: 10,
      size: noteSize,
      y: height - noteSize - noteSize / 5,
    }

    if (playerController && playerController.state === state[0]) {
      drawArray(soundController.getNotes(), conf)
    }

    drawInstruction(width, height)

    if (successCount && successCount > 300 && insTitle) {
      insTitle.remove()
      successCount = null
    } else if (successCount) {
      successCount += 1
    }

    //     push()
    //     const startX = width/5
    //     const startY = 12
    //   const insText = "Draw your music path (left click + drag)"
    //   const insSize = insText.length * 7
    //   noStroke()
    //     fill(255)
    //     rectMode(CENTER)
    //   rect(startX, startY, insSize, 25, 20);

    //   fill(0)
    //   textFont(defaultFont)
    //   textAlign(CENTER)
    //   text(insText, startX, startY)
    //   pop()
    
    if (showImg > 0) {
      showImg -= 1
      bezier(width/4, height*3/4, 
             width/2, height*3/4, 
             width/2, height/4, 
             width*3/4, height/4);
      push()
      fill(255)
      textAlign(CENTER, CENTER)
      text("draw a long line using a single drag", width/2, height/2)
      text("(left click + drag)", width/2, height*4/7)
      pop()
    }
    
    if (showHint > 0 && showImg == 0) {
      showHint -= 1
      push()
      fill(0,0,0,90)
      strokeWeight(1)
      rectMode(CENTER)
      strokeJoin(ROUND);
      rect(width/2, 
         height/2, 
         width*9/10, 
         25, 25)
      fill(255)
      textAlign(CENTER, CENTER)
      text("A music note will be played everytime a circle hit a string", width/2, height/2)
      pop()
    }
    
    if (showHint == 0 && showHint2 > 0) {
      showHint2 -= 1
      push()
      fill(0,0,0,90)
      strokeWeight(1)
      rectMode(CENTER)
      strokeJoin(ROUND);
      rect(width/2, 
         height/2, 
         width*8/10, 
         25, 25)
      fill(255)
      textAlign(CENTER, CENTER)
      text("You can draw multiple lines", width/2, height/2)
      pop()
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER && playerController.state === state[2]) {
    playerController.state = state[0]
    cnv = createCanvas(min(500, windowWidth / 2), max(200, windowHeight * 3 / 4))
    cnvX = windowWidth / (windowWidth < 1200 ? 15 : 3.5)
    cnvY = windowHeight / 6
    background('#f5c887')
    drawImg.remove()
    guitarImg.remove()
    demoImg.remove()

    initMusic()

    for (let i = 0; i < toneToChord.length; i++) {
      strings.push({
        x: (i + 1) * width / (toneToChord.length + 1),
        note: guitarTones[i],
        d: 10
      })
    }
    setupInput()
  }
}

function initMusic() {
  soundController = null
  const val = selector ? namesToIndex[selector.value()] : 0
  model = new SoundModel(tones[val], -3, 0)
  soundController = new SoundController(model, playerController.state === state[1])
}

function changeState() {
  playerController.state = playerController.state === state[0] ? state[1] : state[0]
  setupInput()
  initMusic()
}

function resetState() {

  playerController = new PlayerController(state[0])

  initMusic()

  curLine = []
  lines = []
  points = {}
}

function saveState() {
  let obj = {
    lines: lines,
    points: points,
    strings: strings,
    frameRate_: frameRate_,
    tones: selector ? namesToIndex[selector.value()] : null,
    state: playerController.state
  }
  
  saveJSON(obj, 'musicState.json');
}

function loadState(file) {
  successCount = 1
  if (file.type === 'application' && file.data.strings && file.data.lines) {
    if (file.data.tones) {
      selectedTone = file.data.tones
      model = new SoundModel(tones[file.data.tones], -3, 0)
      selector.selected(indexToName[file.data.tones])
      initMusic(file.data.model)
      soundController = new SoundController(model, playerController.state === state[1])
    }

    playerController.state = file.data.state ? file.data.state : playerController.state
    lines = file.data.lines
    points = file.data.points
    strings = file.data.strings
    frameRate_ = file.data.frameRate_
    isSuccess = true
    setupInput()
    selector.selected(file.data.tones)
    return
  }

  isSuccess = false
  setupInput()
}