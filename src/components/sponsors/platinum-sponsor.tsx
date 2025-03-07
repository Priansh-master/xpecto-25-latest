"use client";

import React, { useContext, useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { Share_Tech } from "next/font/google";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";
import { type Sponsor } from "@/lib/sponsor-data";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

interface Props extends Sponsor {
  delay: number;
}

const PlatinumSponsor = ({ name, img, desc, link, delay, title }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const { setIsHovered } = useContext(CursorContext);

  return (
    <div
      className="relative z-0 w-full overflow-clip border-2 border-amber-50"
      ref={ref}
    >
      <motion.div
        className="loading absolute left-0 top-0 z-20 h-full w-full"
        initial={{ display: "block" }}
        animate={{ display: inView ? "none" : "block" }}
        transition={{ delay: 0.5 + delay }}
      ></motion.div>
      <motion.div
        className="absolute left-0 top-0 z-10 h-full w-full bg-neutral-900"
        initial={{ display: "block" }}
        animate={{ display: inView ? "none" : "block" }}
        transition={{ delay: 0.5 + delay }}
      ></motion.div>
      <Image
        src={img}
        width={800}
        height={800}
        alt={name}
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover opacity-30"
      />
      <div className="flex h-full w-full flex-col items-start justify-start p-5 py-12">
        <div className="mb-2.5 flex flex-row flex-wrap justify-end gap-2.5">
          <div className="rounded-full bg-neutral-600 px-3 py-1 text-sm font-light uppercase text-amber-50">
            {title}
          </div>
        </div>
        <div className="mb-2 text-4xl font-semibold uppercase text-amber-50 md:text-5xl">
          {name}
          <span className="font-extralight">&reg;</span>
        </div>
        <div className={`mb-5 text-base ${sharetech.className} tracking-tight`}>
          {desc}
        </div>
        <Link
          href={link}
          target={"_blank"}
          className="cursor-none border-2 border-amber-50 bg-amber-50/[0.5] px-5 py-1 text-xl font-normal uppercase text-neutral-900 backdrop-blur-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          visit page
        </Link>
      </div>
    </div>
  );
};

export default PlatinumSponsor;
