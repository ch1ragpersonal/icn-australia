// import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
const Page = ({ data }) => {
  return (
    <>
    <Seo 
      title={data.contentfulPage.title}
      description={data.contentfulPage.description.description}
    />
    <main>
      <h1>{data.contentfulPage.title}</h1>
      <p>{data.contentfulPage.description.description}</p>
      <img
        src={data.contentfulPage.image.file.url}
        alt={data.title}
        style={{ width: 300, height: 'auto' }}
     /> 
   </main>
   </>
 );
};

export const data = graphql`
  query pageQuery($id: String) {
    contentfulPage(id: { eq: $id }) {
      url
      title
      description {
        description
      }
      image {
        file {
          url
        }
      }
    }
  }
`;

export default Page;