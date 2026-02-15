import type { Metadata } from "next";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/svg+xml";

export default function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 512 512"
      role="img"
      aria-label="Regenova"
    >
      <defs>
        <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1f232b" />
          <stop offset="50%" stopColor="#5b606a" />
          <stop offset="100%" stopColor="#12151c" />
        </linearGradient>
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f1f3f6" />
          <stop offset="50%" stopColor="#b6bbc5" />
          <stop offset="100%" stopColor="#6e737c" />
        </linearGradient>
      </defs>
      <circle
        cx="256"
        cy="256"
        r="210"
        fill="none"
        stroke="url(#ring)"
        strokeWidth="20"
      />
      <text
        x="50%"
        y="58%"
        textAnchor="middle"
        fontFamily="Space Grotesk, Arial Black, Arial, sans-serif"
        fontSize="240"
        fontWeight="600"
        fill="url(#metal)"
        letterSpacing="-8"
      >
        R
      </text>
    </svg>
  );
}
