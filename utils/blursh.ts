import { decode } from 'blurhash'

export const decodeBlurHash = (hash: string, height: number, width: number): string => {
  const pixels = decode(hash, height, width)
  const canvas = document.createElement('canvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const imageData = ctx.createImageData(height, width)
  imageData.data.set(pixels)
  ctx.putImageData(imageData, 0, 0)
  return canvas.toDataURL()
}
