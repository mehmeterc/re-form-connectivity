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
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
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
				reform: {
					teal: '#1A6C6C',
					'teal-light': '#2A9D9D',
					'teal-dark': '#0E4F4F',
					cyan: '#4ECDC4',
					violet: '#9B87F5',
					pink: '#FF6B9E',
					orange: '#FF9671',
					yellow: '#FFC75F',
					neon: '#39FF14',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'shake': {
					'0%, 100%': { transform: 'translateX(0)' },
					'10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
					'20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-1000px 0' },
					'100%': { backgroundPosition: '1000px 0' },
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 15px 5px rgba(78, 205, 196, 0.4)' },
					'50%': { boxShadow: '0 0 25px 10px rgba(78, 205, 196, 0.6)' },
				},
				'bounce-soft': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-15px)' },
				},
				'orbit': {
					'0%': { transform: 'rotate(0deg) translateX(20px) rotate(0deg)' },
					'100%': { transform: 'rotate(360deg) translateX(20px) rotate(-360deg)' }
				},
				'dance': {
					'0%, 100%': { transform: 'scale(1) rotate(0deg)' },
					'25%': { transform: 'scale(1.1) rotate(-5deg)' },
					'50%': { transform: 'scale(1) rotate(0deg)' },
					'75%': { transform: 'scale(1.1) rotate(5deg)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
				'slide-up': 'slide-up 0.6s ease-out',
				'fade-in': 'fade-in 0.8s ease-out',
				'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
				'shimmer': 'shimmer 2s linear infinite',
				'glow': 'glow 3s ease-in-out infinite',
				'bounce-soft': 'bounce-soft 3s ease-in-out infinite',
				'orbit': 'orbit 10s linear infinite',
				'dance': 'dance 4s ease-in-out infinite',
			},
			transitionTimingFunction: {
				'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
				'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
			},
			textShadow: {
				sm: '0 1px 2px var(--tw-shadow-color)',
				DEFAULT: '0 2px 4px var(--tw-shadow-color)',
				lg: '0 8px 16px var(--tw-shadow-color)',
				teal: {
					light: '0 0 3px rgba(26, 108, 108, 0.1)',
					DEFAULT: '0 0 3px rgba(26, 108, 108, 0.5), 0 0 6px rgba(42, 157, 157, 0.3)',
				},
				neon: {
					light: '0 0 5px rgba(78, 205, 196, 0.2)',
					DEFAULT: '0 0 5px rgba(78, 205, 196, 0.7), 0 0 10px rgba(78, 205, 196, 0.5)',
				},
			},
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities, theme, variants }) {
			const textShadows = theme('textShadow', {});
			const utilities = {};
			
			Object.entries(textShadows).forEach(([key, value]) => {
				if (typeof value === 'object') {
					Object.entries(value).forEach(([subKey, subValue]) => {
						const className = subKey === 'DEFAULT' 
							? `.text-shadow-${key}`
							: `.text-shadow-${key}-${subKey}`;
						utilities[className] = { textShadow: subValue };
					});
				} else {
					const className = key === 'DEFAULT' 
						? '.text-shadow'
						: `.text-shadow-${key}`;
					utilities[className] = { textShadow: value };
				}
			});
			
			addUtilities(utilities, ['responsive', 'hover', 'dark']);
		},
	],
} satisfies Config;
