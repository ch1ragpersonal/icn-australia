/**
 * @type {import('gatsby').GatsbyConfig}
 */

require('dotenv').config();


module.exports = {
  jsxRuntime: 'automatic',
  siteMetadata: {
    title: `ICN AUSTRALIA`,
    siteUrl: `https://www.yourdomain.tld`,
    description: `Your site description`,
  },
  plugins: [
    'gatsby-plugin-theme-ui',
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN
      }
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     name: `blog`,
    //     path: `${__dirname}/blog`,
    //   }
    // },

  ]
};