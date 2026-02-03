import React from "react";

type ButtonTheme = "primary" | "secondary" | "danger" | "ghost";
type TextTheme = "light" | "dark";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  buttonTheme?: ButtonTheme;
  textTheme?: TextTheme;
  pointer?: boolean;
  width?: string | number;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  buttonTheme = "primary",
  textTheme = "light",
  pointer = true,
  width = "auto",
  disabled = false,
}) => {
  const getButtonStyles = (): React.CSSProperties => {
    const styles: Record<ButtonTheme, React.CSSProperties> = {
      primary: {
        backgroundColor: "var(--primary)",
        border: "none",
      },
      secondary: {
        backgroundColor: "var(--accent)",
        border: "none",
      },
      danger: {
        backgroundColor: "var(--danger)",
        border: "none",
      },
      ghost: {
        backgroundColor: "transparent",
        border: "1px solid var(--border)",
      },
    };

    return styles[buttonTheme];
  };

  const getTextStyles = (): React.CSSProperties => {
    if (disabled) return { color: "var(--disabled-text)" };

    switch (buttonTheme) {
      case "primary":
      case "secondary":
      case "danger":
        return { color: "#ffffff" };
      case "ghost":
        return { color: "var(--text)" };
      default:
        return textTheme === "light"
          ? { color: "var(--text)" }
          : { color: "var(--text-secondary)" };
    }
  };

  const finalWidth = typeof width === "number" ? `${width}px` : width;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...getButtonStyles(),
        ...getTextStyles(),
        width: finalWidth,
        cursor: pointer && !disabled ? "pointer" : "default",
        padding: "10px 16px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: 500,
        opacity: disabled ? 0.6 : 1,
        transition: "all 0.2s ease",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...(pointer && !disabled
          ? {
              ":hover": {
                backgroundColor:
                  buttonTheme === "primary"
                    ? "var(--primary-dark)"
                    : buttonTheme === "secondary"
                      ? "var(--accent)"
                      : buttonTheme === "danger"
                        ? "var(--danger-hover)"
                        : "var(--bg-secondary)",
              },
            }
          : {}),
      }}
    >
      {label}
    </button>
  );
};

export default Button;
