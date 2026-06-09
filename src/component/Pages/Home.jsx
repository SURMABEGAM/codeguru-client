import React from "react";

import TopInstructors from "../home/TopInstructors";
import StudentReveiw from "../home/StudentReveiw";

import HeroSection from "../home/HeroSection";
import StatisticsSection from "../home/StatisticsSection";
import HowItWorksSection from "../home/HowItWorksSection";
import TestimonialsSection from "../home/TestimonialsSection";
import NewsletterSection from "../home/NewsletterSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <StatisticsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <NewsletterSection />
      <TopInstructors> </TopInstructors>
      <StudentReveiw> </StudentReveiw>
    </div>
  );
};

export default Home;
