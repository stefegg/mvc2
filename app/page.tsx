"use client";
import {
  Title,
  TitleBackground,
  AnimatedBorderButton,
} from "../components";
import { useEffect, useRef } from "react";
import { animate, inView, stagger } from "motion";
import Link from "next/link";
import { COLORS } from "@/constants/theme";

export default function Home() {
  const titleSection = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!titleSection.current) return;

    inView(titleSection.current, () => {
      animate(
        ".model-section-animation",
        {
          opacity: 1,
          transform: "translateY(0px)",
        },
        {
          duration: 1.25,
          delay: stagger(0.1),
        }
      );

      animate(
        ".controller-section-animation",
        {
          opacity: 1,
          transform: "translateY(0px)",
        },
        {
          duration: 1.25,
          delay: stagger(0.1),
        }
      ).then(() => {
        animate(
          ".model-section-animation",
          {
            color: ["#ffffff", COLORS.NEO_BLUE, "#ffffff", COLORS.NEO_TEAL, COLORS.NEO_PURPLE],
          },
          {
            duration: 0.66,
            repeat: 2,
          }
        );
        animate(
          ".vs-section-animation",
          {
            color: ["#ffffff", COLORS.NEO_PURPLE, "#ffffff", COLORS.NEO_BLUE, COLORS.NEO_TEAL],
          },
          {
            duration: 0.66,
            repeat: 2,
          }
        );
        animate(
          ".controller-section-animation",
          {
            color: ["#ffffff", COLORS.NEO_PURPLE, "#ffffff", COLORS.NEO_TEAL, COLORS.NEO_BLUE],
          },
          {
            duration: 0.66,
            repeat: 2,
          }
        ).then(() => {
          animate(".screen-flash", { opacity: 1 }, { duration: 0.2 }).then(
            () => {
              animate(".screen-flash", { opacity: 0 }, { duration: 2 }).then(
                () => {
                  animate(
                    ".title-background",
                    { opacity: 1 },
                    { duration: 0.5 }
                  );
                  animate(
                    ".button-show",
                    {
                      opacity: 1,
                    },
                    { duration: 1 }
                  );
                  animate(
                    ".model-section-animation",
                    {
                      textShadow:
                        "2px 2px 0px #03DAc6, 5px 4px 0px rgba(0,0,0,0.15)",
                    },
                    { duration: 0.3 }
                  );
                  animate(
                    ".vs-section-animation",
                    {
                      textShadow:
                        "2px 2px 0px #8A2BE2, 5px 4px 0px rgba(0,0,0,0.15)",
                    },
                    { duration: 0.3 }
                  );
                  animate(
                    ".controller-section-animation",
                    {
                      textShadow:
                        "2px 2px 0px #3700b3, 5px 4px 0px rgba(0,0,0,0.15)",
                    },
                    { duration: 0.3 }
                  );
                }
              );
            }
          );
        });
      });
    });
  }, []);
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 gap-16">
      <div className="title-background opacity-0">
        <TitleBackground />
      </div>
      <div className="screen-flash fixed inset-0 bg-white opacity-0 z-50 pointer-events-none" />
      <main
        className="flex flex-col gap-[32px] row-start-2 items-center justify-center w-full"
        ref={titleSection}
      >
        <Title
          className={
            "model-section-animation opacity-0 text-8xl text-neo-purple"
          }
          title="M O D E L"
        />

        <Title
          title="vs."
          className={"text-7xl text-neo-teal vs-section-animation"}
        />
        <Title
          title="C O N T R O L L E R"
          className={
            "controller-section-animation opacity-0 text-8xl text-neo-blue"
          }
        />
        <Link href="/fighter-select">
          <AnimatedBorderButton
            text="S T A R T"
            className="button-show opacity-0"
            initialColor={COLORS.NEO_PURPLE}
            hoverColor={COLORS.NEO_TEAL}
            contentClassName="bg-neo-navy text-neo-blue"
            buttonClassName="w-48 h-12 text-xl bg-transparent bg-neo-navy text-neo-blue hover:text-neo-yellow transition-colors duration-300"
          />
        </Link>
      </main>
    </div>
  );
}
