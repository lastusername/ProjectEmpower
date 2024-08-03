import Image from "next/image";
import Vector from "../public/reshot-illustration-business-puzzle-solution-Y6DTJMBU4X-23b1d.svg";

export default function Home() {
  return (
    <div className="w-screen h-screen flex gap-9 items-center justify-center">
      <div className="flex flex-col gap-y-2">
        <p className="text-6xl text-blue-400 text-bold">Connect</p>
        <p>Go find your group of people!</p>
      </div>
      <Image
        priority
        src={Vector}
        alt="Vector"
        width={300}
        height={300}
      />
    </div>
  );
}
