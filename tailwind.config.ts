
import type { Config } from "tailwindcss";

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
				cosmic: {
					DEFAULT: '#0F172A', // Deep midnight blue
					foreground: '#F5F5F5', // Starlight white
					accent: '#8B5CF6', // Soft purple
					'accent-light': '#C4B5FD', // Lavender
					highlight: '#FBBF24', // Starlight yellow
					pink: '#EC4899', // Cosmic pink
					'pink-light': '#F9A8D4', // Soft pink
					blue: '#1E293B', // Deep blue
					'blue-light': '#334155', // Lighter blue
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'twinkle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 5px 2px rgba(139, 92, 246, 0.3)' },
					'50%': { boxShadow: '0 0 20px 5px rgba(139, 92, 246, 0.6)' }
				},
                'pulse-light': {
                    '0%, 100%': { opacity: '1', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.05)' }
                },
                'color-shift': {
                    '0%': { filter: 'hue-rotate(0deg)' },
                    '50%': { filter: 'hue-rotate(15deg)' },
                    '100%': { filter: 'hue-rotate(0deg)' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'twinkle': 'twinkle 4s ease-in-out infinite',
				'fade-in': 'fade-in 1.5s ease-out',
				'glow': 'glow 4s ease-in-out infinite',
                'pulse-light': 'pulse-light 6s ease-in-out infinite',
                'color-shift': 'color-shift 8s ease-in-out infinite'
			},
			backgroundImage: {
				'cosmic-gradient': 'linear-gradient(to bottom right, #0F172A, #1E293B)',
				'dream-gradient': 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
				'affirmation-gradient': 'linear-gradient(to right, #EC4899, #8B5CF6)',
				'moon-gradient': 'radial-gradient(circle, #F5F5F5 30%, #C4B5FD 100%)',
				'star-gradient': 'radial-gradient(circle, #FBBF24 10%, transparent 70%)',
                'nebula-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                'cosmic-glow': 'radial-gradient(circle, rgba(196, 181, 253, 0.3) 0%, transparent 70%)'
			},
            scale: {
                '102': '1.02',
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
