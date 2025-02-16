/**
 * @type {import('gatsby').GatsbyConfig}
 */

require('dotenv').config();


module.exports = {
  jsxRuntime: 'automatic',
  pathPrefix: "/icn-australia", // If deploying to username.github.io, omit this
  siteMetadata: {
    title: `ICN AUSTRALIA`,
    description: `Your site description`,
  },
  flags: {
    FAST_DEV: true,
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
    `gatsby-plugin-stripe`,
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     name: `blog`,
    //     path: `${__dirname}/blog`,
    //   }
    // },

  ]
};