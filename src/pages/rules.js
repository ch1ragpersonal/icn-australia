/** @jsxImportSource theme-ui */
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Box, Heading } from "theme-ui";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Seo from '../components/seo';
import SecondaryButton from "../components/SecondaryButton";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

const RulesPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulLongText(filter: { title: { eq: "Rules" } }) {
        nodes {
          title
          content {
            raw
          }
        }
      }
      allContentfulPdfInfo {
        nodes {
          title
          pdf {
            file {
              url
            }
          }
        }
      }
    }
  `);

  // Handle the case where no matching content is found.
  if (!data.allContentfulLongText.nodes || data.allContentfulLongText.nodes.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Heading as="h1">Rules</Heading>
        <p>No rules and regulations found.</p>
      </Box>
    );
  }

  const { title, content } = data.allContentfulLongText.nodes[0];

  // Get PDF links from Contentful
  const pdfNodes = data.allContentfulPdfInfo.nodes;
  const antiDopingPdf = pdfNodes.find(node => node.title === "Anti Doping Policy");
  const therapeuticPdf = pdfNodes.find(node => node.title === "Therapeutic Use");

  return (
    <>
      <Seo title={title} />
      <Box sx={{ p: 4 }}>
        <Heading as="h1" sx={{ mb: 4 }}>{title}</Heading>

        <Box
          sx={{
            '& h1': { fontSize: 5 },
            '& h2': { fontSize: 4 },
            '& p':  { fontSize: 2, lineHeight: 'body' }
          }}
        >
          {documentToReactComponents(JSON.parse(content.raw))}
        </Box>

        <Accordion>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    AFFILIATE MEMBER:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    ICN may sanction events although not conducted by ICN or part of the ICN calendar. Affiliate Members are bound by ICN rules and doping policy from the date they join and terminate when event placings are Official - after the return of the drug test results and finalised placings. A positive drug test by an Affiliate Member at a sanctioned event will have all penalties outlined in the current ICN Doping Policy applied.


                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    CANCELLATIONS:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    A division may be amalgamated with another if less than three competitors register.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    DIVISIONS:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    Please look at the Divisions page via the link in the main menu.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    CANCELLATIONS:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    A division may be amalgamated with another if less than three competitors register.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>

        <Box sx={{ mt: '50px' }}>
          <Heading as="h2" sx={{ mb: 4, textAlign: "center" }}>
            Drug Testing Quick Links:
          </Heading>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'space-evenly'
            }}
          >
            <SecondaryButton
              text="Anti Doping Policy"
              to={antiDopingPdf?.pdf?.file?.url}
            />
            <SecondaryButton
              text="Therapeutic Use"
              to={therapeuticPdf?.pdf?.file?.url}
            />
            <SecondaryButton to={'https://www.icompetenatural.com/report-cheating'} text="Report Cheating" />
            <SecondaryButton to={'https://www.globaldro.com/AU/search'} text="Check your Substance" />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RulesPage;
