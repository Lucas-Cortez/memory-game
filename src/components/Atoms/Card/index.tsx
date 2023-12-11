import { DetailedHTMLProps, HTMLAttributes } from "react";
import Image from "next/image";

type CardProps = { flipped: boolean; imgSrc: string } & DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Card: React.FC<CardProps> = ({ imgSrc, style, color, flipped, ...props }) => {
  return (
    <div className="h-20 w-20">
      <div
        {...props}
        className={`h-full w-full transition-all duration-500 preserve-3d relative ${
          flipped ? "rotate-y-180" : ""
        } `}
      >
        <div className="face rotate-y-180">
          <Image src={imgSrc} alt="" fill objectFit="cover" className="rounded" />
        </div>
        <div className="face bg-gray-500 visibility-hidden"></div>
      </div>
    </div>
  );
};

// export const Card: React.FC<CardProps> = ({ ...props }) => {
//   return <div {...props} className={`h-20 w-14 rounded cursor-pointer`} />;
// };
