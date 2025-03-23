// In your component file, e.g. src/components/MyAccordion.js
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css"; // Import the CSS library

const Accordion = () => (
  <Accordion>
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>
          Section 1 Title
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p>This is the content for section 1.</p>
      </AccordionItemPanel>
    </AccordionItem>
    {/* Add more AccordionItems as needed */}
  </Accordion>
);

export default Accordion;
