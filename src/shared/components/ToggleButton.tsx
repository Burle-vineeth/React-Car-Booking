import React from "react";

interface ToggleButtonProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer">
      {label && (
        <span className="text-sm font-medium text-(--text)">{label}</span>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer
          ${checked ? "bg-(--primary)" : "bg-(--text-secondary)"}
          ${disabled ? "opacity-50 cursor-not-allowed!" : ""}
        `}
      >
        <span
          className={`
            inline-block h-5 w-5 transform rounded-full bg-white transition-transform
            ${checked ? "translate-x-5" : "translate-x-1"}
          `}
        />
      </button>
    </label>
  );
};

export default ToggleButton;
