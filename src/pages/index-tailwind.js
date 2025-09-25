import Navbar from "../components/navbar-tailwind";
import Footer from "../components/Footer"
import EventShowcase from "../components/EventShowcase";
import DivisionTabs from "../components/DivisionTabs";
import testImage from "../images/test_image.png"

export default function TestApp() {

    const slides = [
        {
          key: "mens-fitness",
          title: "Men's Fitness",
          headline: "JUMPS AND ACROBATICS FOR BEGINNERS AND EXPERTS",
          body:
            "Trampolining is the ideal sport for letting off steam, whether you're an adult or a child. When you feel the need to expend energy, head to the Men's Fitness at Xperience Park to practice somersaults and other somersaults in complete safety!",
          ctaText: "Learn More",
          ctaHref: "/mens-fitness",
          image: "/images/activities/mens-fitness.png",
          imageAlt: "Athlete jumping with lightning graphics",
          imageSide: "left",
        },
        {
          key: "mens-physique",
          title: "Men's Phyique",
          headline: "OBSTACLE COURSE: BECOME A WARRIOR",
          body:
            "Challenges to complete solo, or challenge friends and family, for an ever-faster time. The Ninja Warrior course is for all jumpers aged 7 and up.",
          ctaText: "Learn More",
          ctaHref: "/mens-physique",
          image: "/images/activities/mens-physique.png",
          imageAlt: "Athlete flipping with lightning graphics",
          imageSide: "left",
        },
        {
          key: "mens-classic-physique",
          title: "Men's Classic Physique",
          headline: "THE BASKETBALL VERSION OF CONNECT 4",
          body:
            "The Connect 4 board game takes on a new dimension here. This game involves chaining basketball shots to try to form a line of 4 balls of the same color.",
          ctaText: "Learn More",
          ctaHref: "/mens-classic-physique",
          image: "/images/activities/mens-classic-physique.png",
          imageAlt: "Basketball player dunking with lightning graphics",
          imageSide: "left",
        },
        {
          key: "bodybuilding",
          title: "Bodybuilding",
          headline: "COME AND HAVE FUN WITH OUR DIFFERENT GAMES",
          body:
            "Xperience Park is also an arcade and puck games area with free access.",
          ctaText: "Learn More",
          ctaHref: "/bodybuilding",
          image: "/images/activities/bodybuilding.png",
          imageAlt: "Game controller with lightning graphics",
          imageSide: "left",
        },
        {
            key: "ms-wellness",
            title: "Ms Wellness",
            headline: "COME AND HAVE FUN WITH OUR DIFFERENT GAMES",
            body:
              "Xperience Park is also an arcade and puck games area with free access.",
            ctaText: "Learn More",
            ctaHref: "/ms-wellness",
            image: "/images/activities/ms-wellness.png",
            imageAlt: "Game controller with lightning graphics",
            imageSide: "left",
          },
          {
            key: "ms-swimsuit",
            title: "Ms Swimsuit",
            headline: "COME AND HAVE FUN WITH OUR DIFFERENT GAMES",
            body:
              "Xperience Park is also an arcade and puck games area with free access.",
            ctaText: "Learn More",
            ctaHref: "/ms-swimsuit",
            image: "/images/activities/ms-swimsuit.png",
            imageAlt: "Game controller with lightning graphics",
            imageSide: "left",
          },
          {
            key: "ms-fitness",
            title: "Ms Fitness",
            headline: "COME AND HAVE FUN WITH OUR DIFFERENT GAMES",
            body:
              "Xperience Park is also an arcade and puck games area with free access.",
            ctaText: "Learn More",
            ctaHref: "/ms-fitness",
            image: "/images/activities/ms-fitness.png",
            imageAlt: "Game controller with lightning graphics",
            imageSide: "left",
          },
          {
            key: "ms-figure",
            title: "Ms Figure",
            headline: "COME AND HAVE FUN WITH OUR DIFFERENT GAMES",
            body:
              "Xperience Park is also an arcade and puck games area with free access.",
            ctaText: "Learn More",
            ctaHref: "/ms-figure",
            image: "/images/activities/ms-figure.png",
            imageAlt: "Game controller with lightning graphics",
            imageSide: "left",
          },
          {
            key: "ms-sports-model",
            title: "Ms Sports Model",
            headline: "COME AND HAVE FUN WITH OUR DIFFERENT GAMES",
            body:
              "Xperience Park is also an arcade and puck games area with free access.",
            ctaText: "Learn More",
            ctaHref: "/ms-sports-model",
            image: "/images/activities/ms-sports-model.png",
            imageAlt: "Game controller with lightning graphics",
            imageSide: "left",
          },
          {
            key: "ms-bikini-model",
            title: "Ms Bikini Model",
            headline: "COME AND HAVE FUN WITH OUR DIFFERENT GAMES",
            body:
              "Xperience Park is also an arcade and puck games area with free access.",
            ctaText: "Learn More",
            ctaHref: "/ms-bikini-model",
            image: "/images/activities/ms-bikini-model.png",
            imageAlt: "Game controller with lightning graphics",
            imageSide: "left",
          },
      ];

    return(
        <div>
            {/* Full-screen hero image behind transparent navbar */}
            <header className="relative h-screen -mt-16 md-20">
                <img
                    src={testImage}
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </header>
            <div>
                <EventShowcase/>
            </div>
            <div className="px-4 md:px-8 lg:px-12 py-8 md:py-12">
                <DivisionTabs items={slides} />
            </div>
        </div>


    );
}