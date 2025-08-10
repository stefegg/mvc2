"use client";
import {
  Title,
  TitleBackground,
  Button,
  AnimatedBorderDiv,
} from "./_components";
import { useEffect, useRef } from "react";
import { animate, inView, stagger } from "motion";

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
            color: ["#ffffff", "#23d1f6", "#ffffff", "#03DAc6", "#BB86FC"],
          },
          {
            duration: 0.66,
            repeat: 2,
          }
        );
        animate(
          ".vs-section-animation",
          {
            color: ["#ffffff", "#BB86FC", "#ffffff", "#23d1f6", "#03DAc6"],
          },
          {
            duration: 0.66,
            repeat: 2,
          }
        );
        animate(
          ".controller-section-animation",
          {
            color: ["#ffffff", "#BB86FC", "#ffffff", "#03DAc6", "#23d1f6"],
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
                    ".button-rise",
                    {
                      opacity: 1,
                      transform: "translateY(0px)",
                    },
                    { duration: 1 }
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
            "model-section-animation opacity-0 text-8xl text-neo-purple [text-shadow:2px_2px_0px_#03DAc6,_5px_4px_0px_rgba(0,0,0,0.15)]"
          }
          title="M O D E L"
        />

        <Title
          title="vs."
          className={
            "text-7xl text-neo-teal vs-section-animation [text-shadow:2px_2px_0px_#8A2BE2,_5px_4px_0px_rgba(0,0,0,0.15)]"
          }
        />
        <Title
          title="C O N T R O L L E R"
          className={
            "controller-section-animation opacity-0 text-8xl text-neo-blue [text-shadow:2px_2px_0px_#3700b3,_5px_4px_0px_rgba(0,0,0,0.15)]"
          }
        />
        <AnimatedBorderDiv
          className="button-rise opacity-0"
          contentClassName="bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          <Button text="S T A R T" />
        </AnimatedBorderDiv>
      </main>
    </div>
  );
}
