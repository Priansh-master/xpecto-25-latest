"use client";

import React, { useState } from "react";
import Image from "next/image";
import Tardis from "public/images/tardis.png";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import NavDialog from "@/components/root/nav-dialog";

const TardisNav = () => {
  const path = usePathname();
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <AnimatePresence>
        {toggle && (
          <motion.div
            className="fixed left-0 top-0 z-50 flex h-screen w-screen items-end justify-end bg-neutral-900/[0.7] p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "anticipate" }}
          >
            <NavDialog toggle={toggle} setToggle={setToggle} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        whileHover={{ translateX: -50, rotateZ: -15 }}
        onClick={() => setToggle(!toggle)}
      >
        <motion.div
          initial={{ opacity: 0, translateY: 200 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            duration: 1,
            delay: path === "/" ? 10 : 0.5,
            ease: "backOut",
          }}
        >
          <motion.div
            initial={{ translateY: 0 }}
            animate={{ translateY: 10 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="cursor-pointer"
          >
            <Image src={`https://res.cloudinary.com/diqdg481x/image/upload/v1737737279/tardis_cvwwxx.png`}
            width={300} height={300} //Added a sample width and height
            alt={"Tardis lol"} className="transition-all" />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default TardisNav;
