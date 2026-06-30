export const FRAME_COUNT = 150
const framePath = (i) => `/frames/frame_${String(i).padStart(4, '0')}.jpg`

export function preloadFrames(onProgress) {
  const images = []
  let loaded = 0

  return new Promise((resolve) => {
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      images.push(img)

      const done = () => {
        loaded++
        onProgress?.(loaded / FRAME_COUNT)
        if (loaded === FRAME_COUNT) resolve(images)
      }

      img.onload = done
      img.onerror = done
      img.src = framePath(i)
    }
  })
}
