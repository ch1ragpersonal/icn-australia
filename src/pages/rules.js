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

        {/* <Box
          sx={{
            '& h1': { fontSize: 5 },
            '& h2': { fontSize: 4 },
            '& p':  { fontSize: 2, lineHeight: 'body' }
          }}
        >
          {documentToReactComponents(JSON.parse(content.raw))}
        </Box> */}

        <Accordion allowZeroExpanded={true}>
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
                    DRESS – Posing Bikini and Men’s Trunk:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    No restriction on colour or design.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    ENTRIES:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    You are required to enter prior to the event. No entries are accepted on the day unless approved by the Promoter. This policy is necessary because iCompete gives each entrant a competitor trophy. Furthermore, the appropriate drug testing has to be planned, competitor details entered into the computer scoring program and we like to have all competitor names and details printed in the event worksheet and public information.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    ENTRY:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    An ICN Online Entry through the Members ICN Portal constitutes an application to compete. ICN reserve the right to refuse or withdraw any Application at their discretion and at any time, prior to the athlete competing.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    AUSTRALIAN ELIGIBILITY:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    To compete in the Australian titles, members must be an Australian citizen or have a working or residency visa for Australia. However, only Australian citizens or aliens who have lived in Australia for the past five years can win and receive the title of Overall ICN Mr/Ms Australia and represent Australia. If a non-Australian citizen possessing the work/residency visa required to compete does win the Australian championship, they will be given the Overall Australian Title and the runner up will be awarded the Mr/Ms Australia title and represent Australia.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    AUSTRALIAN INVITATION:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    To receive an ICN Invitation to compete at the Australian Titles the competitor must satisfy two criteria. Invitations are rarely granted:
                    <br></br>
                    i) The competitor must be of Australian standard.
                    <br></br>
                    ii) Have a reason why the competitor is unable to compete and qualify.
                    <br></br>
                    It is considered that if a competitor avoids competing in order to qualify, they have an unfair advantage - they only have to peak once. Reasons accepted in the past, include they were needed to act in an official capacity - i.e. a judge, or they were competing elsewhere on the same day.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    FEEDBACK:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    Competitors will be made aware how to obtain judges feedback prior to the event.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    PHOTOGRAPHY:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    A professional photographer will be contracted to take pictures that you can purchase.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    INTERNATIONAL:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    The Pinnacle Season A and Season B event (ICN UNIVERSE and ICN WORLD) require qualifying by placing in your Countries event – contact your ICN President for qualifying details. Members from countries without a qualifying event can enter directly through their Members Portal.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    JUDGING:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    Every event will have an odd number of judges, the head judge is known as the ‘Head Judges’. Judging is subjective based on the guidelines and personal preferences of the judges. Judging can vary from location to location and over time according to the prevailing popularity of certain looks and trends. Judging is executed based on the competitors on stage. The Head Judge can ask any competitor to do any reasonable action, whether it’s a regulation pose or not, so that the panel of judges can see the bodies better in an effort to adjudicate more fairly. Athletes should be cognizant of the fact that they may be requested to perform walking, standing and posing that they may not have practised.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    MEMBERSHIP:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    You must be a Premium Member of ICN and agree to our Random Drug Testing Program (ICN 365) to compete and receive ICN benefits. Join online at www.icompetenatural.com Membership is via annual subscription for 365 days.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    MEMBERSHIP REFUNDS:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    Membership refunds are rarely given and only apply to those people who have not competed yet. Once you compete there is no refund. We can only consider a refund if you join and cancel prior to competing. A A$35 administration fee will be deducted on any refund apporved. You must make a written application <a href="mailto:admin@icompetenatural.com">admin@icompetenatural.com</a> stating the reason/s for a refund. The refund clause is for genuine hardships that can be documented by third parties.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    MINIMUM AGE:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    ICN accepts Membership from individuals once they turn 15 years of age.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    MISCONDUCT:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    Misconduct by an ICN competitor at an event will attract point deductions on their score. Misconduct by any ICN member, at any time, may incur a suspension from competing. Misconduct can also cover drug testing as ICN considers cheating by natural competitors as blatant Misconduct. Hence in addition to any penalty imposed under the ICN Anti-Doping Policy, the ICN may impose a second sanction under Misconduct. If a competitor fails to a request to supply a sample for testing, fails on more than one substance, fails for taking a substance that ICN considers a known bodybuilding drug, or fails for taking an anabolic substance, the ICN can impose a second sanction - which is usually a LIFE ban.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    MUSCLE IMPLANTS:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    Athletes with muscle implants/injections are not eligible to compete.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    NO SHOW:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    Competitors who fail to complete an event by not appearing on stage for the Trophy Presentation will be considered a "No-Show" and given last place. ICN deems a competitor, who does not, or cannot make the announcement of placings, has not completed the event. Circumstances within or outside the control of a competitor may prevent them from making the Presentation. However, until the scores and placings have been announced a competitor is still subject to the rules of competition requiring athletes to complete the event. "Bad-luck" is part of sport. ICN cannot correct bad-luck. Like a competitor who falls sick the night before the event, will not be compensated by the promoters delaying the event until the following weekend, if a competitor fails to make the Trophy Presentation due to illness, accident or circumstances outside their control, ICN cannot correct the unfairness or bad-luck.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    ON STAGE:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    The responsibility is yours to know when you are ready to go on stage and to be in the line up to all walk on stage at the same time.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    PRIZES:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    ICN focuses on offering great prizes to competitors. Regional winners may receive a trip to compete at National events. Nationals winners may receive Travel Awards to represent their Country at a major international event.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    PROOF OF AGE:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    Those competing in the Teenage, Junior or Senior division may be required to show provide proof of age, drivers licence or birth certificate at the Event Check-in.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    REFUSAL:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    Members can refuse to participate in a drug test on the contest day or with the RDTP and incur no cost. However, drug testing is the cornerstone behind Natural Bodybuilding, and as such a refusal is considered gross Misconduct by an ICN Member and the Member will be subject to a lifetime ban.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    RESTRICTIONS:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    At the promoter’s discretion division restrictions may be enforced at an event. Typical restrictions, meaning competitors will not be able to enter the following combination:
                    <br></br>
                      Female: Bikini Model and Fitness Models
                      <br></br>
                      Female: Ms Figure and Bodybuilding
                      <br></br>
                      Male: Men’s Physique and Bodybuilding
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    SCHEDULED DIVISIONS:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    The promoters of any event have the right to alter the schedule of the event without notice. The schedule of the event is only an estimate, neither the order of divisions nor the approximate times are guaranteed, they are only a guide. The judging interpretation of divisions is subjective and under the control of the Head Judge, neither the promoters nor sanctioning body can be held responsible for the subjective opinion of the judging panel. All results are final except in the case of disqualification due to a breach of the banned substance code.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    SIGNS OF DRUG USE:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    A Competitor who displays any sign of using drugs (i.e. bitch tits) is encouraged not to compete until they have rectified the problem. This is regardless of their drug-free status. The credibility of the Naturals and the competitor themselves is undermined when the audience see what they believe is the result of drug use on stage in a natural contest. The judges will be notified to treat any sign of drug use as a substantial fault and mark the competitor down.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    TROPHIES:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    All competitors receive a trophy. If a competitor returns a positive drug test, the trophy must be returned to ICN.
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
