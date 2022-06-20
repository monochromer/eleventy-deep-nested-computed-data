const { setTimeout } = require('node:timers/promises')

module.exports = {
  pagination: {
    data: 'collections.articles',
    size: 1,
    alias: 'article'
  },

  eleventyComputed: {
    permalink: (data) => {
      const { article } = data
      const { link } = article.data
      return link
    },

    articleTitle: (data) => {
      const { article } = data
      return article.data.title
    },

    articleContent: (data) => {
      const { article } = data
      return () => article.templateContent
    },

    // this doesn't work
    articleCategories: (data) => {
      // // hack with declaring deps and macrotask:
      // data.article.data.populatedCategories
      // data.collections.categories
      // await setTimeout()

      const { article } = data
      const { populatedCategories } = article.data

      return populatedCategories
        .map?.((category) => ({
          id: category.data.id,
          title: category.data.title,
          link: category.data.link
        }))
    },

    articleCategories_workaround_1: (data) => {
      return () => {
        const { article } = data
        const { populatedCategories } = article.data

        return populatedCategories
          .map?.((category) => ({
            id: category.data.id,
            title: category.data.title,
            link: category.data.link
          }))
      }
    },

    articleCategories_workaround_2: (data) => {
      const { article } = data
      const { collections } = data
      const categoriesCollection = collections.categories
      const articleCategories = article.data.categories

      return categoriesCollection
        .filter((category) => articleCategories.includes(category.data.id))
        .map((category) => ({
          id: category.data.id,
          title: category.data.title,
          link: category.data.link
        }))
    }
  }
}