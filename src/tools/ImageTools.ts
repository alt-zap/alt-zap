/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
const hasBlobConstructor =
  typeof Blob !== 'undefined' &&
  (function () {
    try {
      return Boolean(new Blob())
    } catch (e) {
      return false
    }
  })()

const hasArrayBufferViewSupport =
  hasBlobConstructor &&
  typeof Uint8Array !== 'undefined' &&
  (function () {
    try {
      return new Blob([new Uint8Array(100)]).size === 100
    } catch (e) {
      return false
    }
  })()

const hasToBlobSupport =
  typeof HTMLCanvasElement !== 'undefined'
    ? HTMLCanvasElement.prototype.toBlob
    : false

const hasBlobSupport =
  hasToBlobSupport ||
  (typeof Uint8Array !== 'undefined' &&
    typeof ArrayBuffer !== 'undefined' &&
    typeof atob !== 'undefined')

const hasReaderSupport =
  typeof FileReader !== 'undefined' || typeof URL !== 'undefined'

export class ImageTools {
  static async asyncResize(
    file: File,
    maxDimensions: { width: number; height: number }
  ) {
    return new Promise<Blob>((resolve, reject) => {
      this.resize(file, maxDimensions, (blob) => {
        if (!blob) {
          return reject()
        }

        return resolve(blob)
      })
    })
  }

  static resize(
    file: File,
    maxDimensions: { width: number; height: number },
    callback: (arg0: Blob | null, arg1: boolean) => void
  ) {
    if (typeof maxDimensions === 'function') {
      callback = maxDimensions
      maxDimensions = {
        width: 640,
        height: 480,
      }
    }

    if (!ImageTools.isSupported() || !file.type.match(/image.*/)) {
      callback(file, false)

      return false
    }

    if (file.type.match(/image\/gif/)) {
      // Not attempting, could be an animated gif
      callback(file, false)

      // TODO: use https://github.com/antimatter15/whammy to convert gif to webm
      return false
    }

    const image = document.createElement('img')

    image.onload = () => {
      let { width } = image
      let { height } = image
      let isTooLarge = false

      if (width >= height && width > maxDimensions.width) {
        isTooLarge = true
      } else if (height > maxDimensions.height) {
        isTooLarge = true
      }

      if (!isTooLarge) {
        // early exit; no need to resize
        callback(file, false)

        return
      }

      const scaleRatio = maxDimensions.width / width

      // TODO number of resampling steps
      // const steps = Math.ceil(Math.log(width / (width * scaleRatio)) / Math.log(2));

      width *= scaleRatio
      height *= scaleRatio

      const canvas = document.createElement('canvas')

      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')

      ctx!.imageSmoothingEnabled = true
      ctx!.imageSmoothingQuality = 'high'
      ctx!.drawImage(image, 0, 0, width, height)

      if (hasToBlobSupport) {
        canvas.toBlob((blob) => {
          callback(blob, true)
        }, file.type)
      } else {
        const blob = ImageTools._toBlob(canvas, file.type)

        callback(blob, true)
      }
    }

    ImageTools._loadImage(image, file)

    return true
  }

  static _toBlob(canvas: HTMLCanvasElement, type: string) {
    const dataURI = canvas.toDataURL(type)
    const dataURIParts = dataURI.split(',')
    let byteString

    if (dataURIParts[0].indexOf('base64') >= 0) {
      // Convert base64 to raw binary data held in a string:
      byteString = atob(dataURIParts[1])
    } else {
      // Convert base64/URLEncoded data component to raw binary data:
      byteString = decodeURIComponent(dataURIParts[1])
    }

    const arrayBuffer = new ArrayBuffer(byteString.length)
    const intArray = new Uint8Array(arrayBuffer)

    for (let i = 0; i < byteString.length; i += 1) {
      intArray[i] = byteString.charCodeAt(i)
    }

    const mimeString = dataURIParts[0].split(':')[1].split(';')[0]
    let blob = null

    if (hasBlobConstructor) {
      blob = new Blob([hasArrayBufferViewSupport ? intArray : arrayBuffer], {
        type: mimeString,
      })
    } else {
      blob = new Blob([arrayBuffer])
    }

    return blob
  }

  static _loadImage(image: HTMLImageElement, file: Blob, callback?: any) {
    if (typeof URL === 'undefined') {
      const reader = new FileReader()

      reader.onload = function (evt) {
        image.src = (evt.target as any).result
        if (callback) {
          callback()
        }
      }

      reader.readAsDataURL(file)
    } else {
      image.src = URL.createObjectURL(file)
      if (callback) {
        callback()
      }
    }
  }

  static _toFile = (theBlob: Blob, fileName: string): File => {
    const b: any = theBlob

    b.lastModifiedDate = new Date()
    b.name = fileName

    return <File>theBlob
  }

  static isSupported() {
    return (
      typeof HTMLCanvasElement !== 'undefined' &&
      hasBlobSupport &&
      hasReaderSupport
    )
  }
}
