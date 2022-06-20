module.exports = function (eleventyConfig) {

  eleventyConfig.addCollection('categories', (collectionAPI) => {
    return collectionAPI.getFilteredByGlob('src/categories/*/*.md')
  })

  eleventyConfig.addCollection('articles', (collectionAPI) => {
    return collectionAPI.getFilteredByGlob('src/articles/*/*.md')
  })

  return {
    dir: {
      input: 'src',
      output: 'dist'
    }
  }
}