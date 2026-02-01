import { VARIANT_COMPONENTS } from "./variants";

export const ModernButton = ({ variant = "default", callback, link, ...props }) => {
  const Component = VARIANT_COMPONENTS[variant] || VARIANT_COMPONENTS.default;

  // Augmented click handler
  const handleClick = (event) => {
    // Open link if provided
    // alert("TEST")
    // console.log(onClick)
    if (link) {
      window.open(link, "_blank"); // Or "_self" if you want same tab
    }

    // Call the original onClick if provided
    if (typeof callback === "function") {
      callback(event);
    }
  };

  return <Component variant={variant} {...props} onClick={handleClick} />;
};
