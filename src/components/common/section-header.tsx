import React, { type ReactNode } from "react";
import Image from "next/image";

interface Props {
  title: string;
  children: ReactNode;
}

const SectionHeader = ({ title, children }: Props) => {
  return (
    <div className="relative z-0 flex min-h-96 w-full flex-col items-center justify-center border-y-2 border-amber-50 px-12 py-12 pt-40 text-center">
      <Image
        src={`https://res.cloudinary.com/diqdg481x/image/upload/v1739200155/images/glitch.jpg`}
        alt={"Section header background"}
        width={300}
        height={300}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-bottom opacity-50"
      />
      <div className="text-7xl font-extrabold uppercase sm:text-8xl md:text-9xl xl:text-[150px]">
        {title}
      </div>
      <div className="text-4xl font-medium uppercase sm:text-5xl md:-mt-5 md:font-semibold">
        {children}
      </div>
    </div>
  );
};

export default SectionHeader;
