module.exports = {
  permalink: '/',

  eleventyComputed: {
    articles: (data) => {
      const { collections } = data
      const articlesCollection = collections.articles

      return articlesCollection
        .map((article) => ({
          link: article.data.link,
          title: article.data.title
        }))
    }
  }
}