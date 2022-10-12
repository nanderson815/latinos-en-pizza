import { Link } from "@remix-run/react";
import { ReactChild, ReactFragment } from "react";
import ConditionalWrapper from "./conditionalWrapper";

interface ButtonProps {
    text: string;
    disabled?: boolean;
    to?: string;
    color?: "bg-lightBlue" | "bg-lemon";
}


export default function Button({ text, disabled = false, to = "", color = "bg-lightBlue" }: ButtonProps) {
    const hoverColor = color == "bg-lightBlue" ? "bg-blue-500" : "bg-orange-500";
    const classString: string = disabled ? `inline-block px-6 py-2.5 ${color} text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out pointer-events-none opacity-60`
        : `inline-block px-6 py-2.5 ${color} text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:${hoverColor} hover:shadow-lg focus:${color} focus:shadow-lg focus:outline-none focus:ring-0 active:${color} active:shadow-lg transition duration-150 ease-in-out`
    return (
        <ConditionalWrapper
            condition={!!to} wrapper={(children: ReactChild | ReactFragment) => <Link to={to}>{children}</Link>}>
            <button type="button"
                className={classString}
                disabled={disabled}
            >
                {text}
            </button>
        </ConditionalWrapper>

    )
}