module.exports = {
  eleventyComputed: {
    id: (data) => {
      const { fileSlug } = data.page
      return fileSlug
    },

    link: (data) => {
      const { id } = data
      return `/articles/${id}/`
    },

    populatedCategories: (data) => {
      const { collections } = data
      const categoriesCollection = collections.categories
      const articleCategories = data.categories

      // TODO: optimize
      return categoriesCollection
        .filter((category) => articleCategories.includes(category.data.id))
    }
  }
}