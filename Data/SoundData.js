let mariaTones = ["Eb4", "A4", "Bb4", "Eb4", "A4", "Bb4", "C5", "A4", "Bb4", "C5", "A4", "Bb4", "Bb4", "A4", "G4", "F4", "Eb4", "F4", "Bb4", "Ab4", "G4", "F4", "Eb4", "F4", "G4", "Eb4", "A4", "Bb4", "Eb4", "A4", "Bb4", "C5", "A4", "Bb4", "C5", "D5", "Bb4", "D5", "Eb5", "D5", "C5", "Bb4", "D5", "D5", "Eb5", "D5", "C5", "Bb4", "D5", "Eb5", "F5"]

let twinkleTones = ["C5", "C5", "G5", "G5", "A5", "A5", "G5", "F5", "F5", "E5", "E5", "D5", "D5", "C5", "C5"]

let randomTones = ["C5", "G5", "G5", "A5", "F5", "G5", "B5", "F5", "E5", "E5", "A5", "D5", "F5", "C5","C4", "G5", "G6", "A7", "F5", "G6", "B5", "F4", "E5", "E7", "A7", "D6", "F3", "C4"]

let diatonicTones = ["C7", "F7", "Bb7", "Eb7", "Ab7", "Db7", "Gb7", "B7", "E7", "A7", "D7", "G7"]

let harpotTones = [ "B4", "E5", "G5", "Gb5", "E5", "B5", "A5", "Gb5", "E5", "G5", "Fb5", "Eb5", "E5", "B4", "B4", "E5", "G5", "Gb5", "E5", "B5", "D5", "Db6", "C5", "Ab5", "C5", "B5", "Bb5", "Gb5", "G5", "E5", "G4", "B4", "G4", "B4", "G5", "C4", "B5", "Bb5", "Gb5", "G5", "B5", "Bb5", "Bb5", "B5", "B5", "G5", "B5", "G5", "B5", "G5", "D5", "Db5", "C5", "Bb5", "C5", "B5", "Bb5", "Gb5", "G5", "E5"]

let jingleBellTones = ["B5", "B5", "B5", "B5", "B5", "B5","B5", "D6", "G5", "A5", "B5", "C6", "C6", "C6", "C6", "B5", "B5", "B5", "D6", "D6", "C5", "A5", "G5"]

let iForgotTones = ["D6", "Db6", "D6", "A5", "G5", "D6", "Db6", "D6", "A5", "G5", "D6", "Db6", "Db6", "D6", "A5", "D5", "C6"] 

let imperialMarchTones = ["A4", "A4", "A4", "F4", "C5", "A4", "F4", "C5", "A4", "E5", "E5", "E5", "F4", "C5", "A4", "F4", "C5", "A4"]

let indianaJonesTones = ["E4", "F4", "G4", "C5", "D4", "E4", "F4", "G4", "A4", "B4", "F5", "A4", "B4", "C4", "D4", "E4"]

let nokiaTones = ["E5", "D5", "Gb4", "Ab4", "B4", "Db5", "D4", "E4", "A4", "B4", "Db4", "E4", "A4"]

// // Em Am Dm G C F Bb Bdim
// let guitarTones = [["F5", "A5", "C5"],
//                    ["G5","B5", "D5"], 
//                    ["A5","C6","E5"], 
//                    ["E5","G5","B5"], 
//                    ["C5", "E5", "G5"],
//                    ["D5","A5","F5"], 
//                    ["Bb5", "D6", "F6"], 
//                    ["B5", "D6", "F6"]]

// const toneToChord = ["F",
//                      "G",
//                      "Am",
//                      "Em", 
//                      "C",
//                      "Dm", 
//                      "Bb", 
//                      "Bdim"]

// Em Am Dm G C F Bb Bdim
let guitarTones = [["F5", "A5", "C5"],
                   ["G5","B5", "D5"], 
                   ["A5","C6","E5"],
                   ["C5", "E5", "G5"]]

const toneToChord = ["F",
                     "G",
                     "Am",
                     "C"]

const tones = [harpotTones, nokiaTones, indianaJonesTones, imperialMarchTones, twinkleTones,jingleBellTones]

const namesToIndex = {
  
  "Harry Potter": 0,
  "Nokia": 1,
  "Indiana Jones": 2,
  "Imperial March": 3,
  "Twinkle": 4,
  "Jingle Bells": 5,
}

const indexToName = ["Harry Potter", "Nokia", "Indiana Jones","Imperial March","Diatonic","Twinkle","Jingle Bells"]

const rhythm = ["4n", "8n", "16n", "32n"]