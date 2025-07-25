import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
				pixel: ["Press Start 2P", "monospace"],
				retro: ["Orbitron", "monospace"],
				bungee: ['"Bungee"', 'cursive'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				electric: 'hsl(var(--electric))',
				'electric-secondary': 'hsl(var(--electric-secondary))',
				'gaming-dark': 'hsl(var(--gaming-dark))',
				'gaming-surface': 'hsl(var(--gaming-surface))',
				'neon-cyan': 'hsl(var(--neon-cyan))',
				'neon-pink': 'hsl(var(--neon-pink))',
				'neon-yellow': 'hsl(var(--neon-yellow))',
				'neon-green': 'hsl(var(--neon-green))',
				'retro-dark': 'hsl(var(--retro-dark))',
				'retro-surface': 'hsl(var(--retro-surface))',
				'retro-grid': 'hsl(var(--retro-grid))'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-surface': 'var(--gradient-surface)',
				'gradient-electric': 'var(--gradient-electric)',
				'gradient-neon': 'var(--gradient-neon)',
				'gradient-retro': 'var(--gradient-retro)'
			},
			boxShadow: {
				'electric': 'var(--shadow-electric)',
				'glow': 'var(--shadow-glow)',
				'card': 'var(--shadow-card)',
				'neon': 'var(--shadow-neon)',
				'pink': 'var(--shadow-pink)',
				'retro': 'var(--shadow-retro)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-electric': {
					'0%, 100%': {
						boxShadow: '0 0 20px hsl(271 91% 65% / 0.3)'
					},
					'50%': {
						boxShadow: '0 0 40px hsl(271 91% 65% / 0.6)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'glow': {
					'0%, 100%': {
						filter: 'brightness(1)'
					},
					'50%': {
						filter: 'brightness(1.2)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-electric': 'pulse-electric 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
