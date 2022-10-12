interface WrapperProps {
    condition: boolean;
    wrapper: any;
    children: any;
}


export default function ConditionalWrapper({ condition, wrapper, children }: WrapperProps) {
    return condition ? wrapper(children) : children;
}