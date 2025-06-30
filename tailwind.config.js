// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        shine: {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "11.11%": {
            backgroundPosition: "-150% 0",
          },
          "22.22%": {
            backgroundPosition: "-100% 0",
          },
          "33.33%": {
            backgroundPosition: "-50% 0",
          },
          "44.44%": {
            backgroundPosition: "0% 0",
          },
          "55.55%": {
            backgroundPosition: "50% 0",
          },
          "66.66%": {
            backgroundPosition: "100% 0",
          },
          "88%": {
            backgroundPosition: "150% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },
        glow: {
          "0%, 100%": {
            textShadow: "0 0 8px #facc15, 0 0 16px #facc15",
          },
          "50%": {
            textShadow: "0 0 16px #fde047, 0 0 32px #fde047",
          },
        },
        "neon-shadow": {
          "0%": { backgroundPosition: "0% 0" },
          "50%": { backgroundPosition: "300% 0" },
          "100%": { backgroundPosition: "0% 0" },
        },
      },
      animation: {
        shine: "shine 1.5s ease-out forwards",
        glow: "glow 2s ease-in-out 1.5s infinite",
        "neon-shadow": "neon-shadow 20s linear infinite",
      },
    },
  },
};
