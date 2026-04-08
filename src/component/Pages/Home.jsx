import React from "react";
import Baner from "../home/Banner";
import Download from "../home/Download";
import TopInstructors from "../home/TopInstructors";
import StudentReveiw from "../home/StudentReveiw";
import LatestCourses from "../home/LatestCourses";

const Home = () => {
  return (
    <div>
      <Baner></Baner>
      <Download></Download>
      <LatestCourses></LatestCourses>
      <TopInstructors> </TopInstructors>
      <StudentReveiw> </StudentReveiw>
    </div>
  );
};

export default Home;
