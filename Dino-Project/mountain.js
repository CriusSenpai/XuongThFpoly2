import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./update.js"

const SPEED = 0.01
const mountainElems = document.querySelectorAll("[data-mountain]")

export function setupmountain() {
  setCustomProperty(mountainElems[0], "--left", 0)
  setCustomProperty(mountainElems[1], "--left", 100)
}

export function updatemountain(delta, speedScale) {
  mountainElems.forEach(mountain => {
    incrementCustomProperty(mountain, "--left", delta * speedScale * SPEED * -1)

    if (getCustomProperty(mountain, "--left") <= -100) {
      incrementCustomProperty(mountain, "--left", 300)
    } 
  })
}
