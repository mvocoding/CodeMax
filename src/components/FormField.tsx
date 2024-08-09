import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface SelectOption {
    text: string;
    value: string;
}

interface Props {
    inputType?: string;
    className?: string;
    id: string;
    name: string;
    type?: string;
    placeholder?: string;
    label?: string;
    defaultValue?: string;
    row?: number;
    data?: SelectOption[];
}

export const FormField: React.FC<Props> = ({
    inputType = 'text',
    className,
    id,
    name,
    type = 'text',
    placeholder = '',
    label = '',
    defaultValue = '',
    data = [],
    row = 1
}) => {
    const { register, formState: { errors } } = useFormContext();

    const template = {
        'textarea': (
            <textarea {...register(name)} id={id} className="input" placeholder={placeholder} defaultValue={defaultValue} rows={row} />
        ),

        'text': (
            <input id={id} type={type} className="input peer" placeholder={placeholder} defaultValue={defaultValue}
                {...register(name)} />
        ),

        'select': (
            <select className="input" {...register(name)} id={id} defaultValue={defaultValue}>
                {data.map((item, index) => (
                    <option key={index} value={item.value}>{item.text}</option>
                ))}
            </select>
        )
    }
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
                {template[inputType]}
            </div>
            {errors[name] && (<p className="field-message mt-4 p-2 rounded-lg">{(errors[name] as { message: string })?.message}</p>)}
        </div>
    )
}