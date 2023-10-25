import { Link } from "@remix-run/react";
import type { ReactChild, ReactFragment } from "react";
import ConditionalWrapper from "./conditionalWrapper";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    text: string;
    disabled?: boolean;
    to?: string;
    color?: "bg-lightBlue" | "bg-lemon" | "bg-sauceRed";
}


export default function Button({ text, disabled = false, to = "", color = "bg-sauceRed", ...rest }: ButtonProps) {
    const hoverColor = color == "bg-lightBlue" ? "bg-blue-500" : "bg-red-700";
    const classString: string = disabled ? `inline-block px-12 py-6 ${color} text-white font-medium text-xl leading-tight uppercase rounded-full shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out pointer-events-none opacity-60`
        : `inline-block px-12 py-6 ${color} text-white font-medium text-xl leading-tight uppercase rounded-full shadow-md hover:${hoverColor} hover:shadow-lg focus:${color} focus:shadow-lg focus:outline-none focus:ring-0 active:${color} active:shadow-lg transition duration-150 ease-in-out`
    return (
        <ConditionalWrapper
            condition={!!to} wrapper={(children: ReactChild | ReactFragment) => <Link to={to}>{children}</Link>}>
            <button
                {...rest}
                className={classString}
                disabled={disabled}
            >
                {text}
            </button>
        </ConditionalWrapper >

    )
}