interface SectionProps {
  children: any;
  background?: string;
  alignLeft?: boolean;
}

export default function Section({
  children,
  alignLeft,
  background,
}: SectionProps) {
  const alignment = alignLeft && "flex-row-reverse";
  return (
    <div style={{ background }}>
      <div
        className={`flex items-center flex-wrap justify-around ${alignment} max-w-screen-2xl mx-auto min-h-[30rem] md:min-h-[35rem] py-4 px-8`}
      >
        {children}
      </div>
    </div>
  );
}
