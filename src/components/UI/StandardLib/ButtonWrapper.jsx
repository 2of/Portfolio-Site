import React from "react";

export const ButtonWrapper = ({
  label,
  icon,
  onClick,
  variant = "primary",
  size = "md",
  tooltip,
  link,
  disabled = false,
  external = false,
}) => {
  const className = [
    "button",
    `button--${variant}`,
    `button--${size}`,
  ].join(" ");

  const content = (
    <>
      {icon && <span className="button__icon">{icon}</span>}
      <span className="button__label">{label}</span>
    </>
  );

  if (link) {
    return (
      <a
        href={link}
        title={tooltip}
        className={className}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
    >
      {content}
    </button>
  );
};
