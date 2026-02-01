import getIcon from "../../../../utils/Iconifier.jsx"

export const LinkButton = ({
  label,
  link,
  size,
  variant,
  external,
  tooltip
}) => {
  const externalIconElement = external ? getIcon("external") : null;

  return (
    <a
      href={link}
      target={external ? "_blank" : undefined}
      className={`button button--${variant} button--${size}`}
      title={tooltip}
      rel={external ? "noopener noreferrer" : undefined}
      style={{ position: 'relative' }}
    >
      {label}
      {externalIconElement && (
        <span style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          fontSize: '0.6rem',
          opacity: 0.7
        }}>{externalIconElement}</span>
      )}
    </a>
  );
};
