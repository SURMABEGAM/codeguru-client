import React from "react";
import TopInstructors from "../home/TopInstructors";
import HeroSection from "../home/HeroSection";

import HowItWorksSection from "../home/HowItWorksSection";
import TestimonialsSection from "../home/TestimonialsSection";

const Home = () => {
  return (
    <div>
      <HeroSection />

      <HowItWorksSection />

      {/* <NewsletterSection /> */}
      <TopInstructors> </TopInstructors>

      <TestimonialsSection></TestimonialsSection>
    </div>
  );
};

export default Home;
