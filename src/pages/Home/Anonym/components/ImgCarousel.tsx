import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import BMWKdeURL from "@images/BMWK_de.png";
import BMWKenURL from "@images/BMWE_en.png";
import DATEV from "@images/partner/DATEV.svg";
import InfAi from "@images/partner/InfAI.png";
import IWU from "@images/partner/IWU.png";
import MGA from "@images/partner/MGA.svg";
import NRU from "@images/partner/NRU.svg";
import Smart3 from "@images/partner/Smart3.svg";
import trilogIQa from "@images/partner/trilogIQa.svg";
import TUC from "@images/partner/TUC.png";
import USU from "@images/partner/USU.svg";
import WHZ from "@images/partner/WHZ.svg";
import logger from "@/hooks/useLogger";

interface HomeImgCarouselProps {}

interface HomeImgItemProps {
  img: string;
  href: string;
  title: string;
}

const HomeImgCarousel: React.FC<HomeImgCarouselProps> = (props) => {
  const {} = props;
  const { t, i18n } = useTranslation();

  const partners: HomeImgItemProps[] = [
    // {
    //   img: i18n.language === "de" ? BMWKdeURL : BMWKenURL,
    //   href: "https://www.bmwk.de/",
    //   title: "BMWK",
    // },
    {
      img: DATEV,
      href: "https://www.datev.de/",
      title: "DATEV",
    },
    {
      img: InfAi,
      href: "https://infai.org/",
      title: "InfAi",
    },
    {
      img: IWU,
      href: "https://www.iwu.fraunhofer.de/",
      title: "IWU",
    },
    {
      img: MGA,
      href: "https://www.mga-net.com/",
      title: "MGA",
    },
    {
      img: NRU,
      href: "https://www.nru.de/",
      title: "NRU",
    },
    {
      img: Smart3,
      href: "https://www.smart-3.de/",
      title: "Smart3",
    },
    {
      img: trilogIQa,
      href: "https://www.trilogiq.de/",
      title: "trilogIQa",
    },
    {
      img: TUC,
      href: "https://www.tu-chemnitz.de/",
      title: "TUC",
    },
    {
      img: USU,
      href: "https://www.usu.com/",
      title: "USU",
    },
    {
      img: WHZ,
      href: "https://www.fh-zwickau.de/",
      title: "WHZ",
    },
  ];

  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPartnerIndex((prevIndex) =>
        prevIndex === partners.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [currentPartnerIndex, partners.length]);

  useEffect(() => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth / partners.length;
      // logger("scroll", scrollWidth, carouselRef.current);
      carouselRef.current.scrollLeft = currentPartnerIndex * scrollWidth;
    }
  }, [currentPartnerIndex, partners.length]);

  return (
    <div
      className="flex w-full flex-grow basis-2/3 items-center justify-start overflow-x-hidden scroll-smooth"
      ref={carouselRef}
    >
      <div className="flex h-fit w-fit flex-row items-center justify-center gap-5 py-5">
        {partners.map((partner, index) => (
          <a
            key={index}
            href={partner.href}
            title={partner.title}
            target="_blank"
            className="flex w-60 items-center justify-center"
          >
            <img
              alt={partner.title}
              className="w-60 duration-300 hover:scale-105"
              src={partner.img}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default HomeImgCarousel;
