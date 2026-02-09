import AutoSelect, { type IconType } from "./AutoSelect";

export interface FormField<T> {
  type: "select";
  size: number;
  onSelect: (item: T) => void;
  apiEndpoint?: string;
  fixedOptions?: T[];
  limit?: number;
  placeholder?: string;
  getLabel?: (item: T) => string;
  getKey?: (item: T) => string | number;
  inputIcon?: IconType;
}

interface CustomFormProps<T> {
  formFields: FormField<T>[];
}

function CustomForm<T>({ formFields }: CustomFormProps<T>) {
  const formContent = formFields.map((field, index) => {
    if (field.type === "select") {
      return (
        <AutoSelect
          key={index}
          size={field.size}
          onSelect={field.onSelect}
          apiEndpoint={field.apiEndpoint ?? ""}
          limit={field.limit}
          getLabel={field.getLabel}
          getKey={field.getKey}
          inputIcon={field.inputIcon}
          placeholder={field.placeholder}
        />
      );
    }

    return <></>;
  });

  return <div className="grid grid-cols-12 gap-4 p-4">{formContent}</div>;
}

export default CustomForm;
