import React, { useContext, useEffect, useState } from "react";
import { useCurrentUser } from "@/lib/utils";
import type { ProniteWithDetails } from "@/app/types";
import { Share_Tech } from "next/font/google";
import Image from "next/image";
import { CursorContext } from "@/context/cursor-context";
import MarqueeContainer from "@/components/common/marquee-container";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

const ProniteDetailsBox = ({ pronite }: { pronite: ProniteWithDetails }) => {
  const router = useRouter();

  const { CurrentUser } = useCurrentUser();
  const { setIsHovered } = useContext(CursorContext);

  const [regPrice, setRegPrice] = useState(0);
  const [regPlanId, setRegPlanId] = useState("");

  const { data: plan, isLoading: isRegistrationLoading } =
    api.registration.checkUserRegisteration.useQuery(
      {
        userId: CurrentUser?.id ?? "",
        eventId: pronite?.proniteDetailsId ?? "",
      },
      {
        enabled: !!CurrentUser && !!pronite,
      },
    );

  const regStatus = !!plan;
  const offlineEvent = pronite?.proniteDetails.venue !== "online";
  const { data: offlineReg } = api.registration.checkUserRegisteration.useQuery(
    {
      userId: CurrentUser?.id ?? "",
      eventId: "universaleve",
    },
    {
      enabled: !!CurrentUser,
    },
  );

  useEffect(() => {
    setRegPrice(pronite?.proniteDetails.regPlans[0]?.price ?? 0);
    setRegPlanId(pronite?.proniteDetails.regPlans[0]?.id ?? "");
  }, [pronite]);

  return (
    <>
      <div className="relative flex h-full w-full flex-col items-start overflow-y-scroll overscroll-none bg-neutral-900 md:flex-row">
        <Image
          src={
            // pronite.proniteDetails.cover ??
            `https://res.cloudinary.com/diqdg481x/image/upload/v1737737280/signin_iiaec7.jpg`
          }
          alt={pronite.proniteDetails.name}
          width={500}
          height={1080}
          className="sticky top-0 h-96 w-full shrink border-2 border-t-0 border-amber-50 object-cover md:h-screen md:w-[300px] md:border-l-0 md:border-t-2 lg:w-[400px]"
        />
        <div className="relative shrink-0 md:h-screen md:w-full md:max-w-[calc(100vw-364px)] lg:max-w-[calc(100vw-464px)]">
          <div className="space-y-5 overflow-auto overscroll-none p-12 md:pt-44">
            <div className="-mb-2.5 flex flex-wrap gap-2.5">
              <div className="rounded-full bg-neutral-600 px-5 py-1 text-base uppercase text-amber-50">
                music
              </div>
              <div className="rounded-full bg-neutral-600 px-5 py-1 text-base uppercase text-amber-50">
                dance
              </div>
            </div>
            <div className="text-6xl font-semibold uppercase tracking-wider lg:text-7xl lg:font-bold xl:text-8xl">
              {pronite.proniteDetails.name}
            </div>
            <div
              className={`${sharetech.className} max-w-screen-lg text-base tracking-tight text-amber-50 lg:text-lg`}
            >
              {pronite.proniteDetails.description}
            </div>
            <div className="relative h-12 w-full bg-neutral-900">
              {regStatus ? (
                !plan.verified && (
                  <div className="w-fit border-2 bg-amber-50/[0.7] px-5 py-2 text-xl font-normal uppercase text-neutral-900">
                    Your payment is being verified right now
                  </div>
                )
              ) : offlineEvent && !CurrentUser?.accomodation && offlineReg ? (
                <div className="w-fit border-2 bg-amber-50/[0.7] px-5 py-2 text-xl font-normal uppercase text-neutral-900">
                  Your payment is being verified right now
                </div>
              ) : (
                offlineEvent &&
                !CurrentUser?.accomodation && (
                  <button
                    className="w-full cursor-none overflow-clip"
                    disabled={CurrentUser?.email === ""}
                    onMouseEnter={() => {
                      if (CurrentUser?.email !== "") setIsHovered(true);
                    }}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => {
                      router.push("/memberships");
                    }}
                  >
                    <div
                      className={`absolute bottom-0 flex h-12 w-full cursor-none items-center overflow-clip border-2 border-amber-50 bg-amber-50/[0.7] text-2xl uppercase text-neutral-900 md:border-l-0`}
                    >
                      <MarqueeContainer
                        text={[
                          `register for XPECTO membership - pass to all offline events`,
                          CurrentUser?.email === ""
                            ? "login required to register"
                            : `register for XPECTO membership - pass to all offline events`,
                          `register for  XPECTO membership - pass to all offline events`,
                          CurrentUser?.email === ""
                            ? "login required to register"
                            : `register for XPECTO membership - pass to all offline events`,
                        ]}
                      />
                    </div>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProniteDetailsBox;
