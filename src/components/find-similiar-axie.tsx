"use client";
import { useState } from "react";
import Image from "next/image";
import type { Axie, AxieClass, Stat } from "~/lib/definitions";
import { createFindSimilarAxieUrl } from "~/lib/find-similar-axie";
import { HiMiniMagnifyingGlass as MagnifyingGlassIcon } from "react-icons/hi2";
import { LuInfo as InfoIcon } from "react-icons/lu";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

type FindSimilarAxieProps = {
  axie: Axie;
  axieId: string;
};

export const FindSimilarAxie = ({ axie, axieId }: FindSimilarAxieProps) => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const [preservedStats, setPreservedStats] = useState<{
    [key in Stat]: boolean;
  }>({
    hp: defaultPreservedStatsByClass[axie.class].includes("hp"),
    morale: defaultPreservedStatsByClass[axie.class].includes("morale"),
    skill: defaultPreservedStatsByClass[axie.class].includes("skill"),
    speed: defaultPreservedStatsByClass[axie.class].includes("speed"),
  });

  const handlePreserveStat = (stat: Stat) => {
    setPreservedStats((prev) => ({
      ...prev,
      [stat]: !prev[stat],
    }));
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 sm:min-h-[330px]">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-semibold leading-none">
          find similar axie
        </h2>
        <div className="flex items-center gap-1">
          <h3>optimized for classic</h3>
          <TooltipProvider delayDuration={0}>
            <Tooltip open={openTooltip}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setOpenTooltip((open) => !open)}
                  onMouseEnter={() => setOpenTooltip(true)}
                  onMouseLeave={() => setOpenTooltip(false)}
                  onTouchStart={() => setOpenTooltip((open) => !open)}
                  onTouchEnd={(e) => e.preventDefault()}
                  onKeyDown={(e) => {
                    e.preventDefault();
                    e.key === "Enter" && setOpenTooltip((open) => !open);
                  }}
                  tabIndex={-1}
                  role="button"
                  className="h-4 w-4"
                >
                  <InfoIcon className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                sideOffset={6}
                className="rounded border-neutral-separator-dark bg-neutral-bg-dark text-neutral-100"
              >
                <div className="flex max-w-[180px] flex-col gap-2">
                  <p>Eyes, ears and body are not considered for the search.</p>
                  <p>Summer, japanese and winter parts are included.</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="flex flex-col items-center md:flex-row">
        <div
          className={`h-[150px] w-[200px] scale-x-[-1] transform bg-no-repeat`}
          style={{
            backgroundImage: `url(https://axiecdn.axieinfinity.com/axies/${axieId}/axie/axie-full-transparent.png)`,
            backgroundSize: "130%",
            backgroundPosition: "40% 20%",
          }}
        />
        <div className="flex flex-col gap-2">
          <p className="text-xl">Preserve stast?</p>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(axie.stats).map(([stat, value]) => (
              <StatsSelector
                key={stat}
                selected={preservedStats[stat as Stat]}
                onToggle={() => handlePreserveStat(stat as Stat)}
                stat={stat as Stat}
                value={value}
              />
            ))}
          </div>
        </div>
      </div>
      <Button asChild className="mt-4 px-2 py-1.5 text-lg md:mt-0">
        <a
          target="_blank"
          rel="noreferrer"
          href={createFindSimilarAxieUrl(
            axie,
            Object.keys(preservedStats).filter(
              (stat) => preservedStats[stat as Stat],
            ) as Stat[],
          )}
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
          find on marketplace
        </a>
      </Button>
    </div>
  );
};

type StatsSelectorProps = {
  selected: boolean;
  onToggle: () => void;
  stat: Stat;
  value: number;
};

function StatsSelector({
  selected,
  onToggle,
  stat,
  value,
}: StatsSelectorProps) {
  return (
    <label className="flex cursor-pointer items-center justify-end gap-2">
      <div className="flex select-none items-center gap-px">
        <Image width={24} height={24} alt={stat} src={`/stats/${stat}.png`} />
        <span className="text-lg font-semibold">{value}</span>
      </div>
      <Checkbox checked={selected} onCheckedChange={onToggle} />
    </label>
  );
}

const defaultPreservedStatsByClass: Record<AxieClass, Stat[]> = {
  Beast: [],
  Aquatic: ["speed"],
  Bird: ["speed"],
  Bug: [],
  Dawn: ["speed"],
  Dusk: [],
  Mech: ["speed"],
  Plant: ["hp"],
  Reptile: [],
};
