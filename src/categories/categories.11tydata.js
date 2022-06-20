module.exports = {
  eleventyComputed: {
    id: (data) => {
      const { fileSlug } = data.page
      return fileSlug
    },

    link: (data) => {
      const { id } = data
      return `/categories/${id}/`
    },

    // this doesn't work
    populatedArticles: (data) => {
      const { id: categoryId } = data
      const { collections } = data
      const articlesCollections = collections.articles

      return articlesCollections
        .filter((article) => article.data.categories.includes(categoryId))
    }
  }
}