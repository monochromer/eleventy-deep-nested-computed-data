const Eleventy = require('@11ty/eleventy')

const DIVIDER = '\n------------------------------\n '

function consume(entry) {
  console.log(entry + '')
  console.log(DIVIDER)
}

;(async () => {
  const eleventy = new Eleventy()
  const stream = await eleventy.toNDJSON()

  // stream.on('data', (entry) => {
  //   consume(entry)
  // })

  for await (const entry of stream) {
    consume(entry)
  }
})()