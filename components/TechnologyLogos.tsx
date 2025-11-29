'use client'

import React from 'react'

interface TechnologyLogoProps {
  name: string
  size?: number
  className?: string
}

const TechnologyLogo: React.FC<TechnologyLogoProps> = ({ name, size = 18, className = '' }) => {
  const logos: Record<string, React.ReactNode> = {
    'C++': (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
        <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.513.977a3.333 3.333 0 0 0-3.026 0L1.258 5.31A1.25 1.25 0 0 0 .6 6.606v10.788a1.25 1.25 0 0 0 .658 1.296l8.229 4.333a3.333 3.333 0 0 0 3.026 0l8.229-4.333a1.25 1.25 0 0 0 .658-1.296V6.606a1.25 1.25 0 0 0-.006-.606z" fill="#00599C"/>
        <path d="M9.5 9.5h5v5h-5z" fill="#004482"/>
        <text x="12" y="16" fontSize="7" fill="#fff" textAnchor="middle" fontWeight="bold" fontFamily="Arial, sans-serif">++</text>
      </svg>
    ),
    'Rust': (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
        <circle cx="12" cy="12" r="11" fill="#000"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#CE412B"/>
        <path d="M8 8h8v8H8z" fill="#CE412B"/>
        <path d="M10 10h4v4h-4z" fill="#000"/>
      </svg>
    ),
    'MOJO': (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="#FF4F00"/>
        <path d="M12 4.5l7.5 3.75v7.5L12 19.5l-7.5-3.75v-7.5L12 4.5z" fill="#FF6B35"/>
        <path d="M12 7l-4 2v4l4 2 4-2V9l-4-2z" fill="#FF8C5A"/>
        <path d="M10 10h4v4h-4z" fill="#FF4F00"/>
        <circle cx="12" cy="12" r="1.5" fill="#fff"/>
      </svg>
    ),
    'Assembly': (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="#6E4C13"/>
        <rect x="4" y="6" width="16" height="12" rx="1" fill="#8B6914"/>
        <path d="M6 8h12M6 12h12M6 16h8" stroke="#FFA500" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="4" cy="8" r="1" fill="#FFA500"/>
        <circle cx="4" cy="12" r="1" fill="#FFA500"/>
        <circle cx="4" cy="16" r="1" fill="#FFA500"/>
      </svg>
    ),
    'Vulkan API': (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="#AC162C"/>
        <path d="M12 4.5l7.5 3.75v7.5L12 19.5l-7.5-3.75v-7.5L12 4.5z" fill="#D32F2F"/>
        <path d="M12 7l-4 2v4l4 2 4-2V9l-4-2z" fill="#F44336"/>
        <path d="M10 10h4v4h-4z" fill="#AC162C"/>
      </svg>
    ),
    'Qt': (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="#41CD52"/>
        <circle cx="12" cy="12" r="8" fill="#2E7D32"/>
        <circle cx="12" cy="12" r="6" fill="#41CD52"/>
        <path d="M12 8l-2 4h4l-2-4z" fill="#1B5E20"/>
      </svg>
    ),
    'TypeScript': (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
        <rect x="0" y="0" width="24" height="24" rx="2" fill="#3178C6"/>
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 4.687 4.687 0 0 1-1.512-.493v-2.63a5.28 5.28 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 7.53 7.53 0 0 0-1.01-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 5.851 5.851 0 0 1 1.77-.264zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" fill="#fff"/>
      </svg>
    ),
    'Python': (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
        <path d="M14.5 2.5c0 .83-.67 1.5-1.5 1.5h-2c-.83 0-1.5-.67-1.5-1.5S10.17 1 11 1h2c.83 0 1.5.67 1.5 1.5zM12 22c-5.52 0-10-4.48-10-10S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8z" fill="#3776AB"/>
        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#FFD43B"/>
        <circle cx="10" cy="12" r="1.5" fill="#3776AB"/>
        <circle cx="14" cy="12" r="1.5" fill="#3776AB"/>
      </svg>
    ),
    'JavaScript': (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
        <rect x="0" y="0" width="24" height="24" rx="2" fill="#F7DF1E"/>
        <path d="M7.5 18.5c0 .83.67 1.5 1.5 1.5h6c.83 0 1.5-.67 1.5-1.5v-13c0-.83-.67-1.5-1.5-1.5H9c-.83 0-1.5.67-1.5 1.5v13zm2-11h5v9h-5v-9z" fill="#000"/>
        <text x="12" y="16" fontSize="8" fill="#F7DF1E" textAnchor="middle" fontWeight="bold" fontFamily="Arial, sans-serif">JS</text>
      </svg>
    ),
    'Node.js': (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#339933"/>
        <path d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm0 14c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z" fill="#339933"/>
      </svg>
    ),
    'Angular': (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
        <path d="M9.93 12.645h4.134L11.998 7.98z" fill="#DD0031"/>
        <path d="M11.998.431L1.533 4.237l1.764 14.99 8.7 4.773 8.698-4.773 1.765-14.99L11.998.431zm5.736 17.623h-2.119l-1.005-2.526H9.387L8.382 18.054H6.262L11.998 4.135l5.736 13.919z" fill="#DD0031"/>
        <path d="M11.998 7.98l-2.068 4.665h4.134l-2.066-4.665z" fill="#C3002F"/>
      </svg>
    ),
    'React': (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
        <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
        <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1.2"/>
        <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(-60 12 12)"/>
      </svg>
    ),
    'Vue': (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
        <path d="M12 2L2 19h4l6-11 6 11h4L12 2z" fill="#4FC08D"/>
        <path d="M12 2L7 12l5 7 5-7L12 2z" fill="#35495E"/>
      </svg>
    ),
    'HTML5': (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L3.653 4.41l.213 2.622h10.125l-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.955-.81-.188-2.11H4.78l.29 3.855L12 19.288l7.373-2.02L20.5 4.414z" fill="#E34F26"/>
        <path d="M12 19.288l7.373-2.02.885-9.276H12v2.716h4.603l-.366 3.523-2.91.804-2.955-.81-.188-2.11H7.76l.29 3.855L12 19.288z" fill="#EF652A"/>
      </svg>
    ),
    'CSS3': (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L3.653 4.41l.213 2.622h10.125l-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.955-.81-.188-2.11H4.78l.29 3.855L12 19.288l7.373-2.02L20.5 4.414z" fill="#1572B6"/>
        <path d="M12 19.288l7.373-2.02.885-9.276H12v2.716h4.603l-.366 3.523-2.91.804-2.955-.81-.188-2.11H7.76l.29 3.855L12 19.288z" fill="#33A9DC"/>
      </svg>
    ),
    'PostgreSQL': (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
        <path d="M23.559 4.683c-.38-2.237-2.095-3.978-4.316-4.306C17.88.25 16.736 0 15.645 0c-1.106 0-2.143.213-3.12.563-2.19.774-4.07 2.308-5.37 4.31-1.302 2.002-2.024 4.36-2.024 6.87 0 .96.12 1.89.34 2.78.38 1.58 1.08 3.05 2.04 4.31.96 1.26 2.18 2.28 3.58 3.01 1.4.73 2.96 1.1 4.56 1.1.96 0 1.89-.12 2.78-.34 1.58-.38 3.05-1.08 4.31-2.04 1.26-.96 2.28-2.18 3.01-3.58.73-1.4 1.1-2.96 1.1-4.56 0-1.106-.213-2.143-.563-3.12z" fill="#336791"/>
        <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2C7.582 4 4 7.582 4 12s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" fill="#336791"/>
        <path d="M12 6c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6zm0 2c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z" fill="#336791"/>
      </svg>
    ),
  }

  return <>{logos[name] || <div className={`w-${size} h-${size} bg-gray-500 rounded`} />}</>
}

export default TechnologyLogo
