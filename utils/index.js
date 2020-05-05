import ColorHash from 'color-hash'

export const colorHash = new ColorHash({
  lightness: 0.8
})

export function printDate(d) {
  return (
    d.getFullYear() +
    '-' +
    (d.getMonth() + 1) +
    '-' +
    d.getDate() +
    ' ' +
    d.getHours() +
    ':' +
    d.getMinutes() +
    ':' +
    d.getSeconds()
  )
}

export function removeDuplicates(arr, key) {
  const seenKeys = {}
  const result = []

  arr.forEach(x => {
    const k = x[key]
    if (seenKeys[k]) {
      // we've already got in the result set
      return
    }

    result.push(x)
    seenKeys[k] = true
  })

  return result
}
