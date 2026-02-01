import getIcon from "../../../../utils/Iconifier.jsx"

export const BaseButton = ({
  label,
  icon,
  size,
  variant,
  disabled,
  tooltip,
  onClick,
  external
}) => {
  const externalIcon = external ? getIcon("external") : null;

  return (
    <button
      type="button"
      className={`button button--${variant} button--${size}`}
      disabled={disabled}
      title={tooltip}
      onClick={onClick}
      style={{ position: 'relative' }}
    >
      {icon && <span className="button__icon">{icon}</span>}
      {label}
      {externalIcon && (
        <span style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          fontSize: '0.6rem',
          opacity: 0.7
        }}>{externalIcon}</span>
      )}
    </button>
  );
};
