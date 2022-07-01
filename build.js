const { pipeline, Transform } = require('node:stream')
const Eleventy = require('@11ty/eleventy')

const DIVIDER = '\n------------------------------\n '

function consume(entry) {
  console.log(entry)
  console.log(DIVIDER)
}

;(async () => {
  const eleventy = new Eleventy()
  const eleventyDataStream = await eleventy.toNDJSON()

  // stream.on('data', (entry) => {
  //   consume(entry)
  // })

  // for await (const entry of stream) {
  //   consume(entry)
  // }

  pipeline(
    eleventyDataStream,
    new Transform({
      objectMode: true,
      transform(chunk, enc, next) {
        try {
          const item = JSON.parse(chunk + '')
          next(null, item)
        } catch (error) {
          next(error)
        }
      }
    }),
    async function* (stream) {
      for await (const entry of stream) {
        if (!entry?.url) {
          continue
        }

        consume(entry)
      }
    },
    (error) => {
      if (error) {
        console.error(error)
      }
    }
  )
})()