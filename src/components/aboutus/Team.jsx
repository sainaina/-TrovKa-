import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Avatar } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Define animation variants
const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

export function Team() {
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  const profiles = [
    { src: "/image/image1/adminh.jpg", name: "Seam Chiminh", role: "Frontend Developer", github: "https://github.com/SeamChiminh", facebook: "https://www.facebook.com/SeamChiminh?mibextid=LQQJ4d", instagram: "https://www.instagram.com/pu_chhveng/?igsh=MW1vcG52a2F2bHZ4cw%3D%3D&utm_source=qr" },
    { src: "/image/image1/pisei.jpg", name: "Sean ChannPisei", role: "Frontend Developer", github: "https://github.com/SeanChanpisey", facebook: "https://www.facebook.com/smos.konzii?mibextid=LQQJ4d", instagram: "https://www.instagram.com/sean_chanpisey/?igsh=bG40MzRkdTM4OHM4&utm_source=qr" },
    { src: "/image/image1/borey.jpg", name: "Ream Borey", role: "Frontend Developer", github: "", facebook: "", instagram: "https://www.instagram.com/riem.puurii?igsh=MTNxanF3ZXdyMnFscA%3D%3D&utm_source=qr" },
    { src: "/image/image1/meta.jpg", name: "Khann TeyMeta", role: "Frontend Developer", github: "https://github.com/khannteymeta", facebook: "https://www.facebook.com/khann.teymeta?mibextid=LQQJ4d", instagram: "https://www.instagram.com/khann_teymeta?igsh=aXU4aGw3YXN4dDE2&utm_source=qr" },
    { src: "/image/image1/saina.jpg", name: "Chim Saina", role: "Frontend Developer", github: "https://github.com/sainaina/", facebook: "https://www.facebook.com/chim.sainaina?mibextid=LQQJ4d", instagram: "https://www.instagram.com/chim_sainaa?igsh=dHV5eTU0MXhlNzl3&utm_source=qr" },
    { src: "/image/image1/heng.jpg", name: "Sam Bunheng", role: "Frontend Developer", github: "hhttps://github.com/SamBunheng", facebook: "https://www.facebook.com/kingheng1014?mibextid=LQQJ4d", instagram: "https://www.instagram.com/_hengggg__/" },
    { src: "/image/image1/arun.jpg", name: "Ou Chanarun", role: "Frontend Developer", github: "", facebook: "https://www.facebook.com/ahden.bekzer?mibextid=ZbWKwL", instagram: "https://www.instagram.com/chanarun4?igsh=OTIzMWQ2dHI1dXpp" },
    { src: "/image/image1/aziz.jpg", name: "Sim Aziz", role: "Frontend Developer", github: "https://github.com/Simaziz", facebook: "https://www.facebook.com/sim.aziz.50/", instagram: "" },
    { src: "/image/image1/phanit.jpg", name: "Voeng Phanith", role: "Frontend Developer", github: "", facebook: "", instagram: "" },
  ];

  return (
    <div className="flex text-Primary dark:text-Action my-[5px] flex-wrap gap-[150px] justify-center mb-[100px]" ref={ref}>
      {loading ? (
        profiles.map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <Skeleton circle={true} height={200} width={200} />
            <div className="mt-[15px] text-center">
              <Skeleton height={20} width={150} />
              <Skeleton height={15} width={100} />
              <div className="flex gap-[20px] mt-[10px] justify-center">
                <Skeleton circle={true} height={30} width={30} />
                <Skeleton circle={true} height={30} width={30} />
                <Skeleton circle={true} height={30} width={30} />
              </div>
            </div>
          </div>
        ))
      ) : (
        profiles.map((profile, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={index % 2 === 0 ? slideLeft : slideRight}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <Avatar
              src={profile.src}
              alt="avatar"
              withBorder={true}
              className="w-[200px] h-[200px]  px-[5px] py-[5px] dark:hover:bg-Primary dark:border-Primary border-Action hover:bg-Action hover:border-Action duration-300 rounded-full transform transition-transform hover:scale-110"
            />
            <div className="mt-[15px] text-center">
              <h2 className="">{profile.name}</h2>
              <h2 className="text-gray-800 dark:text-gray-300">{profile.role}</h2>
              <div className="flex gap-[20px] mt-[10px] justify-center">
                <a href={profile.github}><img src="/image/icon/github.svg" className="w-[30px] h-[30px]" alt="GitHub" /></a>
                <a href={profile.facebook}><img src="/image/icon/facebook.svg" className="w-[30px] h-[30px]" alt="Facebook" /></a>
                <a href={profile.instagram}><img src="/image/icon/square-instagram.svg" className="w-[30px] h-[30px]" alt="Instagram" /></a>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}
