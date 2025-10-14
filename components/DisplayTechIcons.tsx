import { cn, getTechLogos } from "@/lib/utils";
import Image from "next/image";

interface TechIconProps {
  techstack: string[];
}

export default async function DisplayTechIcons({ techstack }: TechIconProps) {
  const techIcons: { tech: string; url: string }[] = await getTechLogos(techstack);

  return (
    <div className="flex flex-row gap-2 items-center">
      {techIcons.slice(0, 3).map(({ tech, url } , index) => (
        <div
          key={tech}
          className={cn("relative group bg-dark-300 rounded-full p-2 flex items-center justify-center" , index >= 1 && '-ml-5')}
        >
          <span className="tech-tooltip">
            {tech}
          </span>
          <Image
            src={url}
            alt={tech}
            width={100}
            height={100}
            className=" object-contain size-5 "
          />
        </div>
      ))}
    </div>
  );
}
