import React, { useContext } from "react";
import MarqueeContainer from "@/components/common/marquee-container";
import { type CompetitionWithDetails } from "@/app/types";
import Link from "next/link";
import { CursorContext } from "@/context/cursor-context";

interface Props {
  data: CompetitionWithDetails;
}

const CompetitionBrief = ({ data }: Props) => {
  const { setIsHovered } = useContext(CursorContext);

  const details = [
    { name: "Prize pool", content: `INR ${data.prizepool}` },
    { name: "Venue", content: data.competitionDetails.venue },
    {
      name: "Team size",
      content:
        data.min_team_size === data.max_team_size
          ? `${data.max_team_size}`
          : `${data.min_team_size} - ${data.max_team_size}`,
    },
    {
      name: "Start time",
      content: data.competitionDetails.begin_time.toLocaleString(),
    },
    // TODO: Show initiation fee when available only (i.e., only for online events)
    // {
    //   name: "entry fee",
    //   content: `INR ${data.competitionDetails.regPlans[0]?.price ?? 0.0}`,
    // },
  ];

  return (
    <div className="relative w-full overflow-auto overscroll-none border-2 border-amber-50 bg-neutral-900 md:h-full">
      <div className="sticky left-0 top-0 z-10 flex h-8 w-full flex-col justify-center overflow-clip border-b-2 border-amber-50 bg-neutral-900 text-lg font-extralight uppercase text-amber-50">
        <MarqueeContainer
          text={[
            "mission briefing",
            data.competitionDetails.name,
            "more details",
            data.competitionDetails.name,
            "mission briefing",
            data.competitionDetails.name,
            "more details",
            data.competitionDetails.name,
          ]}
          delay={-1}
        />
      </div>
      <div className="grid min-h-[348px] w-full grid-cols-1 gap-5 p-5 text-amber-50 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {details.map((el, i) => (
          <div
            className="flex w-full flex-col items-center -space-y-1 text-center"
            key={i}
          >
            <div className={`text-xl font-light uppercase text-amber-400`}>
              {el.name}
            </div>
            <div
              className={`text-4xl font-light uppercase text-amber-50/[0.8]`}
            >
              {el.content}
            </div>
          </div>
        ))}
        <div className="flex w-full flex-col items-center -space-y-1 text-center">
          <div className={`text-xl font-light uppercase text-amber-400`}>
            rulebook
          </div>
          <Link
            href={data.rulebook ?? "/"}
            className={`cursor-none text-2xl font-normal uppercase text-amber-50/[0.8] hover:underline`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            target="_blank"
          >
            click to access
          </Link>
        </div>
      </div>
      {/* <div className="relative flex h-12 w-full flex-col justify-center overflow-clip border-t-2 border-amber-50 bg-amber-50/[0.7] text-2xl font-normal uppercase text-neutral-900">
        <MarqueeContainer
          text={[
            "view intel brief",
            data.competitionDetails.name,
            "view intel brief",
            data.competitionDetails.name,
          ]}
          href={data.rulebook ?? "/"}
          delay={-2}
        />
      </div> */}
    </div>
  );
};

export default CompetitionBrief;
