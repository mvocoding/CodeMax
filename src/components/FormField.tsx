import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
    id: string;
    name: string;
    type: string;
    placeholder?: string;
    label?: string;
}

export const FormField: React.FC<Props> = ({
    className,
    id,
    name,
    type,
    placeholder = '',
    label = ''
}) => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div className={twMerge(className, `field 
            [&_label]:font-semibold
            [&_label]:block
            [&_label]:mb-1
            [&_input]:border-2
            [&_input]:py-5
            [&_input]:px-5
            [&_input]:w-full
            [&_input]:rounded-md
            [&_input]:transition-all
            [&_input]:duration-300
            [&_input]:bg-zinc-900
            focus:[&_input]:bg-zinc-900
            focus:[&_input]:outline-none
            focus:[&_input]:ring-0
            [&_]:relative
            [&.editable_*]:p-0
            [&.editable_*]:m-0
            [&.editable]:flex
            [&.editable]:items-center 
            [&.editable]:gap-5
            [&.editable.hide>input]:bg-transparent
            [&.editable.hide>input]:border-0
            [&.editable.hide>input]:placeholder-white
            [&.editable.hide>input]:pointer-events-none
            whitespace-nowrap

            `,
        )}>
            <label>{label}</label>
            <input id={id} type={type} className="peer" placeholder={placeholder} 
                {...register(name)}
            />
        </div>
    )
}