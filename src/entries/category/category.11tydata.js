module.exports = {
  pagination: {
    data: 'collections.categories',
    size: 1,
    alias: 'category'
  },

  eleventyComputed: {
    permalink: (data) => {
      const { category } = data
      const { link } = category.data
      return link
    },

    categoryTitle: (data) => {
      const { category } = data
      const { title } = category.data
      return title
    },

    categoryContent: (data) => {
      const { category } = data
      return () => category.templateContent
    },

    categoryArticles: (data) => {
      const { category } = data
      const { populatedArticles } = category.data

      return populatedArticles
        .map?.((article) => ({
          link: article.data.link,
          title: article.data.title
        }))
    }
  }
}