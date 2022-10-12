interface SectionProps {
    children: any
    background?: string
    alignLeft?: boolean
}

export default function Section({ children, alignLeft, background = "bg-vanilla" }: SectionProps) {
    const alignment = alignLeft && "flex-row-reverse";
    return (
        <div className={`flex items-center ${alignment} max-w-screen-2xl mx-auto ${background} h-[30rem] md:h-[35rem] bg-cover bg-center`}>
            {children}
        </div>
    )
}