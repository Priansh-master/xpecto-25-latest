import React, { useContext, useEffect, useState } from "react";
import CreateTeamDialog from "./create-team-dialog";
import RegisterDialog from "../common/registration-dialog";
import { useCurrentUser } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import type { CompetitionWithDetails, TeamWithFullDetails } from "@/app/types";
import { Share_Tech } from "next/font/google";
import Image from "next/image";
import { Clock, Pin } from "lucide-react";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import { CursorContext } from "@/context/cursor-context";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const CompetitionDetailsBox = ({
  comp,
  regStatus,
  regTeam,
}: {
  comp: CompetitionWithDetails;
  regStatus: boolean;
  regTeam: TeamWithFullDetails | null | undefined;
}) => {
  const { CurrentUser } = useCurrentUser();

  const { isHovered, setIsHovered } = useContext(CursorContext);

  const [regPrice, setRegPrice] = useState(0);
  const [regPlanId, setRegPlanId] = useState("");

  useEffect(() => {
    setRegPrice(comp?.competitionDetails.regPlans[0]?.price ?? 0);
    setRegPlanId(comp?.competitionDetails.regPlans[0]?.id ?? "");
  }, [comp]);

  //TODO: Add more comp details on the page. I have just added the basic ones

  return (
    <div className="relative flex h-full max-w-screen-lg flex-col overflow-y-scroll overscroll-none border-2 border-amber-50 lg:h-[calc(100vh-290px)]">
      <div className="flex h-full w-full flex-col lg:flex-row">
        <Image
          src={`/event_covers/competitions/${comp.competitionDetails.slug}.jpeg`}
          width={576}
          height={768}
          alt={comp.competitionDetails.name}
          className="aspect-video w-full object-cover lg:aspect-auto lg:w-96"
        />
        <div className="flex h-full w-full flex-col">
          <div className="px-5 pt-12 text-7xl font-semibold uppercase">
            {comp.competitionDetails.name}
          </div>
          <div
            className={`${sharetech.className} mt-2.5 space-y-1 px-5 text-base tracking-tight sm:text-lg`}
          >
            {comp.competitionDetails.description}
          </div>
          <div
            className={`${sharetech.className} my-5 space-y-1 px-5 text-base tracking-tight sm:text-xl`}
          >
            <div className="flex w-fit flex-row items-center justify-center gap-1">
              <Pin />
              <span>{comp.competitionDetails.venue}</span>
            </div>
            <div className="flex w-fit flex-row items-center justify-center gap-1">
              <Clock />
              <span>
                {comp.competitionDetails.begin_time.toLocaleString()} to{" "}
                {comp.competitionDetails.end_time.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-12 h-12">
            {regStatus ? (
              !regTeam && <CreateTeamDialog competitionId={comp.id} />
            ) : (
              <RegisterDialog
                trigger={
                  <button
                    className="w-full cursor-none overflow-clip"
                    disabled={CurrentUser?.email === ""}
                    onMouseEnter={() => {
                      if (CurrentUser?.email !== "") setIsHovered(true);
                    }}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <div
                      className={`absolute bottom-0 flex h-12 w-full items-center overflow-clip border-t-2 border-amber-50 bg-amber-50/[0.7] text-2xl uppercase text-neutral-900 lg:w-[calc(100%-384px)]`}
                    >
                      <MarqueeContainer
                        text={[
                          `register for ${comp.competitionDetails.name}`,
                          CurrentUser?.email === ""
                            ? "login required to register"
                            : `register for ${comp.competitionDetails.name}`,
                          `register for ${comp.competitionDetails.name}`,
                          CurrentUser?.email === ""
                            ? "login required to register"
                            : `register for ${comp.competitionDetails.name}`,
                        ]}
                      />
                    </div>
                  </button>
                }
                content={
                  <RadioGroup
                    onValueChange={(e) => {
                      setRegPlanId(e.split(" ")[1]!);
                      setRegPrice(parseInt(e.split(" ")[0]!));
                    }}
                    defaultValue={
                      (comp.competitionDetails.regPlans[0]?.price.toString() ??
                        "") +
                      " " +
                      (comp.competitionDetails.regPlans[0]?.id ?? "")
                    }
                  >
                    {comp.competitionDetails.regPlans.map((reg) => {
                      return (
                        <div
                          key={reg.id}
                          className="mb-2 flex items-center gap-2 px-5"
                        >
                          <RadioGroupItem
                            className="h-8 w-8 rounded-none bg-amber-50/[0.5]"
                            value={reg.price.toString() + " " + reg.id}
                            key={reg.id}
                          />
                          <Label
                            htmlFor={reg.id}
                            className="flex w-full flex-col p-2"
                          >
                            <div className="flex items-center gap-2">
                              <div className="text-xl font-normal uppercase">
                                {reg.name} - ₹{reg.price}
                              </div>
                              <div className="rounded-full bg-gray-500 px-2 py-0.5 text-sm font-light uppercase">
                                {/* //TODO: Make labelling as a border wrapper. So that it looks premium */}
                                {reg.labelling}
                              </div>
                            </div>
                            <div
                              className={`${sharetech.className} mt-1 text-base tracking-tight`}
                            >
                              {reg.description}
                            </div>
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                }
                price={regPrice}
                regPlanId={regPlanId}
                eventId={comp.competitionDetails.id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionDetailsBox;
