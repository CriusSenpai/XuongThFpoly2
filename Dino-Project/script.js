import { updateGround, setupGround } from "./ground.js"
import { updateclouds, setupclouds } from "./clouds.js"
import { updateDino, setupDino, getDinoRect, setDinoLose, setDinoCoin } from "./dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"
import { updateCoin, setupCoin, getCoinRects, removeCoin } from "./coin.js"
import { updatemountain } from "./mountain.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001
// const SPEED_SCALE_INCREASE = 0.001

const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const coinElem = document.querySelector("[data-point]")
const startScreenElem = document.querySelector("[data-start-screen]")
const stopScreenElem = document.querySelector("[data-end-screen]")

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

let lastTime
let speedScale
let score
let coin = 0
let Highscore
function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime

  updateclouds(delta, speedScale)
  updatemountain(delta, speedScale)
  updateGround(delta, speedScale)
  updateDino(delta, speedScale)
  updateCactus(delta, speedScale)
  updateCoin(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)
  if (checkLose()) return handleLose()
  if (checkCoin()) handleCoin()
  lastTime = time
  window.requestAnimationFrame(update)
}

function checkLose() {
  const dinoRect = getDinoRect()
  return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

function checkCoin() {
  const dinoRect = getDinoRect()
  return getCoinRects().some(rect => isCollision(rect, dinoRect))
}


function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
    // false
  )
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  score += delta * 0.01 * speedScale
  scoreElem.textContent = Math.floor(score)
}
function updatePoint() {
  coin += 1
  coinElem.textContent = coin
  console.log(coin);
  
}

function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  Highscore = 1000
  setupclouds()
  setupGround()
  setupDino()
  setupCactus()
  setupCoin()
  startScreenElem.classList.add("hide")
  stopScreenElem.classList.add("hide")
  window.requestAnimationFrame(update)
}

function handleLose() {
  setDinoLose()
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    // startScreenElem.classList.remove("hide") 
    stopScreenElem.classList.remove("hide")
  }, 100)
}
function handleCoin() {
  setDinoCoin()
  updatePoint()
  removeCoin()
}

if (score > Highscore) {
  Highscore = score;
}

function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}
