const numOfTone = 3
let smoothness = 0.5
let sliderMax = 5
let selectedTone = 0

let input
let notesField
let slider
let selector
let restartBtn
let resetStateBtn
let saveStateBtn
let saveBtn
let loadBtn
let switchBtn
let musicTitle
let tempoTitle
let stateTitle
let switchTitle
let drawTitle
let loadTitle
let insTitle
let appTitle

let isSuccess
let successCount

let drawImg
let dragImg
let guitarImg
let demoImg


function drawArray(arr, conf) {
  for (let i = 0; i < min(numOfTone,arr.length); i++) {
    const pos = {
      x: (i * conf.size) + (i + 1) * conf.padding + 50,
      y: conf.y,
      size: 50/(i+1)
    }
    drawTextBox(arr[i], pos)
  }
}

function drawInstruction(width, height) {
  push()
  textAlign(CENTER, CENTER)
  fill(255)
  textStyle(BOLD)
  textFont(defaultFont)
  textSize(min(width,height)/30)
  // text("Drag the lines around", width/2, min(width,height)/30)
  pop()
}

function drawTextBox(txt, pos, borderRadius) {
  push()
  rectMode(CENTER)
  fill(0,0,0,95)
  square(pos.x, 
         pos.y, 
         pos.size, 
         borderRadius ? borderRadius : 15)
  
  textAlign(CENTER, CENTER)
  fill(255)
  textStyle(BOLD)
  textFont(defaultFont)
  textSize(pos.size/3)
  text(txt, pos.x, pos.y-1)
  pop()
}


function drawCircle() {
  if (points.length == 0 || !points) { return }
  
  for (const [key, value] of Object.entries(points)) {
    let pos = lines[key][value.i]
    let curPoint = points[key] ? points[key] :lines[key][0]
    
    push()
    fill(0)
    circle(curPoint.x, curPoint.y, 10)
    pop()
    
    const close = dist(curPoint.x, curPoint.y, pos.x, pos.y)
    const traverseNext = close <= ceil(smoothness) ? 1 : 0
    
    points[key] = {
      x: curPoint.x == pos.x ? curPoint.x : (curPoint.x < pos.x ? curPoint.x + smoothness : curPoint.x - smoothness),
      y: curPoint.y == pos.y ? curPoint.y : (curPoint.y < pos.y ? curPoint.y + smoothness : curPoint.y - smoothness),
      i: (curPoint.i + traverseNext),
        prev: points[key].prev
    }

    if (points[key].i >= lines[key].length) {
      points[key] = {
        x: lines[key][0].x,
        y: lines[key][0].y,
        i: 0
      }
    }
  }
}

function drawStrings(arr) {
  arr.forEach(string => {
    push()
    // noStroke()
    strokeWeight(1)
    fill(255)
    // line(string.x, 0, string.x, height)
    rect(string.x, cnvY, 3, height*2)
    pop()
    
    if (playerController.state === state[1]) {
      push()
    const pos = {
      x: string.x,
      y: height - min(width, height)/10,
      size: min(width, height)/10
    }
    const idx = guitarTones.indexOf(string.note)
    drawTextBox(toneToChord[idx], pos)
    pop()
    }
    
  })
}


function setupInput() {
  resetInput()
  
  const level = 30
  const spacing = max(10,windowWidth/10)
  const startX = cnvX + width + spacing/2
  const startY = cnvY
  const bPadding = 40
  
  appTitle = createP("Musically")
  appTitle.position(windowWidth/2, 0)
  appTitle.id('title')
  
  drawTitle = createP("Draw your music path (left click + drag)")
  drawTitle.position(cnvX, cnvY + cnv.height)
  drawTitle.id('draw')
  
  if (successCount) {
    insTitle = createP(isSuccess ? "Uploaded" : "File not supported")
    insTitle.position(startX + (1.3 * spacing), startY + (level * 0))
  } 
  
  loadTitle = createP("Have a Musically file already?")
  loadTitle.position(startX + (0 * spacing), startY + (level * 0))
  
  input = createFileInput(loadState);
  input.position(startX + (0 * spacing), startY + (level * 0) + bPadding)
  
  tempoTitle = createP("Tempo")
  tempoTitle.position(startX + (0 * spacing), startY + (level * 5))
  slider = createSlider(1, sliderMax, 1, 1);
  slider.position(startX + (0 * spacing), startY + (level * 5) + bPadding);
  slider.style('width', '80px');
  
  stateTitle = createP("File Options")
  stateTitle.position(startX + (0 * spacing), startY + (level * 7))

  saveStateBtn = createButton('Save');
  saveStateBtn.position(startX + (0 * spacing), startY + (level * 7) + bPadding);
  saveStateBtn.mousePressed(saveState);
  
  
  resetStateBtn = createButton('Reset');
  resetStateBtn.position(startX + max(50, min(60, 0.5 * spacing)), startY +  (level * 7) + bPadding);
  resetStateBtn.mousePressed(resetState);
  
  switchTitle = createP("Switch Mode")
  switchTitle.position(startX + (0 * spacing), startY + (level * 8) + bPadding)

  if (playerController.state === state[1]) {
    switchBtn = createButton('Demo Mode');
    switchBtn.position(startX + (0 * spacing), startY + (level * 9.5) + bPadding);
    
  } else {
    switchBtn = createButton('Guitar Mode');
   
    musicTitle = createP("Music Settings")
    restartBtn = createButton('Restart Music');
    restartBtn.mousePressed(initMusic);
    restartBtn.class('button')
    
    selector = createSelect()
    Object.keys(namesToIndex).forEach(name => {
      selector.option(name);
    })
    selector.changed(initMusic)
    selector.selected(indexToName[selectedTone])
    selector.selected(selectedTone)
    
    switchBtn.position(startX + (0 * spacing), startY + (level * 9.5) + bPadding);
    restartBtn.position(startX + (0 * spacing), startY + (level * 3) + bPadding);
    selector.position(startX + (0 * spacing), startY + (level * 2) + bPadding)
    musicTitle.position(startX + (0 * spacing), startY + (level * 2))
  }
  
  switchBtn.mousePressed(changeState);
}

let startA = 59
let endA = 110
let startB = 140
let endB = 149

function animate(obj) {
  let targetFrames = [0, 0];
  if (!didPlay) {
    didPlay = true;
    targetFrames = [startA, endA];
  } else {
    didPlay = false;
    targetFrames = [startB, endB]
  }
  anim.playSegments([targetFrames], true);
}
  
function drawIntro() {
  const startX = windowWidth/4
  const startY = windowHeight/8
  
  push()
  textAlign(CENTER)
  textFont(defaultFont)
  textSize(windowHeight/20)
  text("Musically", windowWidth/2, windowHeight/15)
  pop()
  
  push()
  const drawText = "Draw your music path (left click + drag)"
  const drawSize = drawText.length * 8
  noStroke()
  rect(windowWidth/2 - drawSize/2, startY - 30, drawSize, 25, 20);
  
  textAlign(CENTER)
  textFont(defaultFont)
  textSize(windowHeight/60)
  text(drawText, windowWidth/2, startY - 15)
  pop()
  
  drawImg.position(windowWidth/2-drawImg.width/2, startY);
  
//   push()
//   textFont(defaultFont)
//   textAlign(CENTER)
//   text("Drag musical strings", startX*4, startY - 15)
//   pop()
  
//   dragImg.position(startX*3.3, startY);
 
  push()
  const demoText = "Demo Mode - Play Music"
  const demoSize = demoText.length * 8
  noStroke()
  rect(startX - demoSize/2, startY*4 - 15, demoSize, 25, 20);
  
  textFont(defaultFont)
  textAlign(CENTER)
  textSize(windowHeight/60)
  text(demoText, startX, startY*4)
  pop()
  
  demoImg.position(startX-demoImg.width/2, startY*4.2);
  
  push()
  const guitarText = "Guitar Mode - Play Chords"
  const guitarSize = guitarText.length * 8
  noStroke()
  rect(startX*3 - guitarSize/2, startY*4 - 15, guitarSize, 25, 20);
  
  textFont(defaultFont)
  textAlign(CENTER)
  textSize(windowHeight/60)
  text(guitarText, startX*3, startY*4)
  pop()
  
  guitarImg.position(startX*3-guitarImg.width/2, startY*4.2);
  
  push()
  const enterText = "Guitar Mode - Play Chords"
  const enterSize = guitarText.length * 8
  noStroke()
  rect(windowWidth/2 - enterSize/2, windowHeight*14/15 - 15, enterSize, 25, 20);
  
  textFont(defaultFont)
  textAlign(CENTER)
  text("Press Enter to Start", windowWidth/2, windowHeight*14/15)
  pop()
  
}
  

function resetInput() {
  if (input) {
    input.remove();
 switchBtn.remove()
 musicTitle.remove()
  }
  
  if (notesField) {
    notesField.remove()
  }
  
  if (slider) {
    slider.remove()
  }
  
  if (selector) {
    selector.remove()
  }
  
  if (restartBtn) {
    restartBtn.remove()
  }
  
  if (resetStateBtn) {
    resetStateBtn.remove()
  }
  
  if (saveStateBtn) {
    saveStateBtn.remove()
  }
  
  if (switchBtn) {
    switchBtn.remove()
  }
  
  if (stateTitle) {
    stateTitle.remove()
  }
  
  if (musicTitle) {
    saveStateBtn.remove()
  }
  
  if (switchTitle) {
    switchTitle.remove()
  }
  
  if (drawTitle) {
    drawTitle.remove()
  }
  
  if (loadTitle) {
    loadTitle.remove()
  }
  
  if (tempoTitle) {
    tempoTitle.remove()
  }
  
  if (insTitle) {
    insTitle.remove()
  }
  
  if (appTitle) {
    appTitle.remove()
  }
}