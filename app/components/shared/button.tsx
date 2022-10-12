import { Link } from "@remix-run/react";
import { ReactChild, ReactFragment } from "react";
import ConditionalWrapper from "./conditionalWrapper";

interface ButtonProps {
    text: string;
    disabled?: boolean;
    to?: string;
    color?: "lightBlue" | "lemon";
}


export default function Button({ text, disabled = false, to = "", color = "lightBlue" }: ButtonProps) {
    const hoverColor = color == "lightBlue" ? "blue" : "orange";
    const classString: string = disabled ? `inline-block px-6 py-2.5 bg-${color} text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out pointer-events-none opacity-60`
        : `inline-block px-6 py-2.5 bg-${color} text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-${hoverColor}-500 hover:shadow-lg focus:bg-${color} focus:shadow-lg focus:outline-none focus:ring-0 active:bg-${color} active:shadow-lg transition duration-150 ease-in-out`
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