import Image from "next/image";

type TeamPhotoProps = {
  src: string | null;
  name: string;
  label: string;
};

export function TeamPhoto({ src, name, label }: TeamPhotoProps) {
  return (
    <div className="relative flex aspect-[4/5] items-end overflow-hidden border border-mist bg-mist/60">
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col justify-between bg-[linear-gradient(135deg,#0B3D91_0%,#0A1224_58%,#3FC1F0_130%)] p-5">
          <p className="text-sm tracking-[0.04em] text-white/65">{label}</p>
          <p className="font-display text-6xl tracking-[-0.05em] text-white">
            {name.slice(0, 1)}
          </p>
        </div>
      )}
    </div>
  );
}
