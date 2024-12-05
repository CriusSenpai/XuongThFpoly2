import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./update.js"

const SPEED = 0.05
const CACTUS_INTERVAL_MIN = 900
const CACTUS_INTERVAL_MAX = 2500
const worldElem = document.querySelector("[data-world]")

let nextCoinTime
export function setupCoin() {
  nextCoinTime = CACTUS_INTERVAL_MIN
  document.querySelectorAll("[data-coin]").forEach(coin => {
    coin.remove()
  })
}

export function updateCoin(delta, speedScale) {
  document.querySelectorAll("[data-coin]").forEach(coin => {
    incrementCustomProperty(coin, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(coin, "--left") <= -100) {
      coin.remove()
    }
  })

  if (nextCoinTime <= 0) {
    createCoin()
    nextCoinTime =
      randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
  }
  nextCoinTime -= delta
}

export function removeCoin(){
  document.querySelectorAll("[data-coin]").item(0)?.remove();
}

export function getCoinRects() {
  return [...document.querySelectorAll("[data-coin]")].map(coin => {
    return coin.getBoundingClientRect()
  })
}

function createCoin() {
  const coin = document.createElement("img")
  coin.dataset.coin = true
  coin.src = "images/coin.png"
  coin.classList.add("coin")
  setCustomProperty(coin, "--left", 100)
  worldElem.append(coin)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
