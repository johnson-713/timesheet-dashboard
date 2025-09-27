import { type CSSProperties, type ReactNode, createElement } from "react";

interface AppTextProps {
  type?: string;
  className?: string;
  onClick?: () => void;
  text?: string | ReactNode;
  style?: CSSProperties;
  textStroke?: boolean;
  children?: ReactNode;
  truncate?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function AppText({
  type = "p",
  className = "",
  onClick,
  text,
  style,
  textStroke,
  children,
  truncate,
  onMouseEnter,
  onMouseLeave,
}: AppTextProps) {
  const textStrokeStyle: CSSProperties = textStroke
    ? {
        WebkitTextStroke: "1px black",
      }
    : {};

  let truncatedText: string | null = null;
  if (truncate && text && typeof text == "string") {
    const textLength = text.length;
    truncatedText =
      text.slice(0, truncate) + (textLength > truncate ? "..." : "");
  }

  return createElement(
    type,
    {
      className: `text- ${className}`,
      style: {
        ...textStrokeStyle,
        ...style,
      },
      onClick,
      onMouseEnter,
      onMouseLeave,
    },
    truncatedText || text || children
  );
}

export default AppText;
