"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import type { Member } from "@prisma/client";

interface Props {
  data: Member[];
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

const TeamCarousel = ({ data, index, setIndex }: Props) => {
  const [apiDesktop, setApiDesktop] = useState<CarouselApi>();
  const [apiMobile, setApiMobile] = useState<CarouselApi>();

  const [pos, setPos] = useState(0);

  useEffect(() => {
    if (!apiDesktop) return;
    apiDesktop.scrollTo(index);
  }, [apiDesktop, index]);

  useEffect(() => {
    if (!apiMobile) return;
    apiMobile.scrollTo(index);
  }, [apiMobile, index]);

  useEffect(() => {
    if (!apiDesktop) return;
    apiDesktop.on("select", () => {
      setPos(apiDesktop.selectedScrollSnap());
    });
  }, [apiDesktop]);

  useEffect(() => {
    if (!apiMobile) return;
    apiMobile.on("select", () => {
      setPos(apiMobile.selectedScrollSnap());
    });
  }, [apiMobile]);

  useEffect(() => {
    setIndex(pos);
  }, [pos, setIndex]);

  return (
    <div className="relative flex h-full w-screen flex-col items-center justify-center overflow-x-clip px-5 lg:px-12">
      <Carousel
        setApi={setApiDesktop}
        opts={{
          align: "center",
          loop: true,
        }}
        orientation="vertical"
        className="hidden w-full md:block"
      >
        <CarouselContent className="-mt-1 h-[calc(100vh)]">
          {data.map((el, index) => (
            <CarouselItem
              key={index}
              className="relative flex flex-col items-center justify-center pt-5 md:basis-1/2"
            >
              <div className="relative h-full max-h-[400px] w-full border-2 border-amber-50 lg:max-h-[500px]">
                <Image
                  src={el.image}
                  width={500}
                  height={800}
                  alt={"Volunteer pic"}
                  className="h-full w-full bg-neutral-950 object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Carousel
        setApi={setApiMobile}
        opts={{
          align: "center",
          loop: true,
        }}
        orientation="horizontal"
        className="flex h-full w-screen flex-col items-center justify-center py-5 md:hidden"
      >
        <CarouselContent className="h-full">
          {data.map((el, index) => (
            <CarouselItem
              key={index}
              className="relative h-full max-h-[300px] max-w-[400px] basis-3/4 pl-5"
            >
              <Image
                src={el.image}
                width={500}
                height={800}
                alt={"Volunteer pic"}
                className="h-full w-full border-2 border-amber-50 bg-neutral-900 object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TeamCarousel;
