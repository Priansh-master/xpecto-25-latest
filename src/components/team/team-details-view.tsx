"use client";

import React, { useContext } from "react";
import BgImg from "../../../public/images/background-teams.png";
import Image from "next/image";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";
import { Share_Tech } from "next/font/google";
import PixelEmail from "@/components/svg/mail";
import PixelInsta from "@/components/svg/insta";
import PixelLinkedin from "@/components/svg/linkedin";
import { motion } from "motion/react";
import { Member } from "@prisma/client";

const shareTech = Share_Tech({ weight: "400", subsets: ["latin"] });

const keyframes = {
  flicker: {
    opacity: [0, 1, 0.3, 0.0, 0.3, 1, 0.3, 0, 0.3, 1, 0.3, 1],
  },
};

interface Props {
  data?: Member;
}

const TeamDetailsView = ({ data }: Props) => {
  const { setIsHovered } = useContext(CursorContext);

  return (
    <div className="z-0 flex h-full w-full flex-col items-start justify-start bg-neutral-900 p-5 md:p-12">
      <Image
        src={BgImg}
        width={1920}
        height={1080}
        alt={data?.org ?? "Background image"}
        className="absolute left-0 top-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-tl from-neutral-950/[0.7] to-transparent"></div>
      <div className="py-5">
        <Link
          href={"/"}
          className="cursor-none text-lg font-light uppercase text-amber-50/[0.7]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          &lt;&lt; back to launchpad
        </Link>
        <motion.div
          className="flex flex-wrap items-baseline gap-2.5 uppercase"
          variants={keyframes}
          animate="flicker"
          transition={{
            duration: 0.5,
            ease: "linear",
          }}
        >
          <span className="mr-5 text-6xl font-bold sm:text-7xl md:text-6xl lg:text-8xl">
            {data?.name ?? "unknown player"}
          </span>
          <span className="rounded-full bg-neutral-600 px-4 text-lg font-light uppercase">
            {data?.role ?? "anonymous"}
          </span>
          <span className="rounded-full bg-neutral-600 px-4 text-lg font-light uppercase">
            {data ? (data.org ?? "admin") : "mystery"} team
          </span>
        </motion.div>
        <motion.div
          className={`py-5 text-lg tracking-tight text-amber-50 ${shareTech.className} max-w-screen-sm`}
          variants={keyframes}
          animate="flicker"
          transition={{
            duration: 0.5,
            ease: "linear",
            delay: 0.25,
          }}
        >
          {/* {data?.desc ?? "No details provided for selected player."} */}
        </motion.div>
        <div className="mb-5 h-[2px] w-full bg-amber-50/[0.5] backdrop-blur-2xl"></div>
        <motion.div
          className="flex flex-wrap justify-end gap-8"
          variants={keyframes}
          animate="flicker"
          transition={{
            duration: 0.5,
            ease: "linear",
            delay: 0.5,
          }}
        >
          {data?.instagram && (
            <Link
              href={data?.instagram}
              target="_blank"
              className="cursor-none"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <PixelInsta size={32} color={"#fffbeb"} />
            </Link>
          )}
          {data?.email && (
            <Link
              href={`mailto:${data?.email}`}
              target="_blank"
              className="cursor-none"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <PixelEmail size={32} color={"#fffbeb"} />
            </Link>
          )}
          {data?.linkedin && (
            <Link
              href={data?.linkedin}
              target="_blank"
              className="cursor-none"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <PixelLinkedin size={32} color={"#fffbeb"} />
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TeamDetailsView;
