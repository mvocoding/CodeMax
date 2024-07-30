import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props {
    inputType?: string;
    className?: string;
    id: string;
    name: string;
    type: string;
    placeholder?: string;
    label?: string;
    defaultValue?: string;
    row?: number;
}

export const FormField: React.FC<Props> = ({
    inputType = 'input',
    className,
    id,
    name,
    type,
    placeholder = '',
    label = '',
    defaultValue = '',
    row = 1
}) => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div data-state={errors[name] ? 'error' : 'valid'} className={twMerge(className, `field 
            [&_label]:font-semibold
            [&_label]:block
            [&_label]:mb-1
            [&_.input]:border-2
            [&_.input]:p-3
            [&_.input]:w-full
            [&_.input]:rounded-md
            [&_.input]:bg-zinc-900
            focus:[&_.input]:bg-zinc-900
            focus:[&_.input]:outline-none
            focus:[&_.input]:ring-0
            [&_]:relative
            [&.editable_.field-input]:m-0
            [&.editable_.field-input]:flex
            [&.editable_.field-input]:items-center 
            whitespace-nowrap

            [&[data-state="error"]_.field-message]:bg-red-500
            [&[data-state="valid"]_.field-message]:bg-green-500
            `
        )}>
            <div className="field-input">
                {label && (<label>{label}</label>)}
                {inputType == 'textarea' ? (
                    <textarea {...register(name)} id={id} className="input" placeholder={placeholder} defaultValue={defaultValue} rows={row} />
                ) : (
                    <input id={id} type={type} className="input peer" placeholder={placeholder} defaultValue={defaultValue}
                        {...register(name)} />
                )}

            </div>
            {errors[name] && (<p className="field-message mt-4 p-2 rounded-lg">{(errors[name] as { message: string })?.message}</p>)}
        </div>
    )
}