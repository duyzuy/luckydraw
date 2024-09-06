import InputError from "../InputError";
import InputLabel from "../InputLabel";

type FormItemProps = {
    htmlFor?: string;
    children?: React.ReactNode;
    label?: string;
    help?: string;
    validateStatus?: "error" | "success" | "warning";
};
const FormItem: React.FC<FormItemProps> = ({
    label,
    children,
    htmlFor,
    help,
}) => {
    return (
        <div className="form-item">
            {label ? (
                <InputLabel value={label} className="mb-2" htmlFor={htmlFor} />
            ) : null}
            {children}
            <div className="h-6 flex items-center">
                {help && <InputError message={help} />}
            </div>
        </div>
    );
};
export default FormItem;
