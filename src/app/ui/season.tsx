// import { getSeason } from "~/app/lib/data";
import { Countdown } from "./countdown";
import { calculateTimeLeft } from "~/app/utils";

export const Season = () => {
  // const seasonInfo = await getSeason();
  // if ("error" in seasonInfo) {
  //   return <div>{seasonInfo.message}</div>;
  // }

  // const { season, endTime } = seasonInfo;

  //  June 11th at 9 AM UTC
  const endTime = "2024-06-11T09:00:00Z";
  const season = 3;
  const timeLeft = calculateTimeLeft(endTime);

  if (!timeLeft) {
    return <div>Off season 😴</div>;
  }

  return (
    <div className="flex shrink-0 flex-col items-center sm:items-start">
      <h2 className="text-xl font-semibold text-white">Season {season}</h2>
      <Countdown endTime={endTime} />
    </div>
  );
};
