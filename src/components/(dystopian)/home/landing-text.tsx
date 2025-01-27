"use client";

import React from "react";
import XText from "@/components/(dystopian)/home/X";
import PText from "@/components/(dystopian)/home/P";
import EText from "@/components/(dystopian)/home/E";
import CText from "@/components/(dystopian)/home/C";
import TText from "@/components/(dystopian)/home/T";
import OText from "@/components/(dystopian)/home/O";
import QuoteText from "@/components/(dystopian)/home/'";
import TwoText from "@/components/(dystopian)/home/2";
import FiveText from "@/components/(dystopian)/home/5";

const LandingText = () => {
  return (
    <div className="hidden items-start gap-2 p-0 sm:flex md:gap-3 md:py-8 lg:gap-5">
      <XText />
      <PText />
      <EText />
      <CText />
      <TText />
      <OText />
      <div className="w-5"></div>
      <QuoteText />
      <TwoText />
      <FiveText />
    </div>
  );
};

export default LandingText;
