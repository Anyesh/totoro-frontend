import * as React from 'react'

function SvgChat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 110 110"
      width="22.5"
      height="22.5"
      {...props}
    >
      <circle cx={55} cy={55} r={55} fill="#25b7d3" />
      <path
        fill="#6fdaf1"
        d="M39 67a4 4 0 004 4h24l12 12V71h4a4 4 0 004-4V35a4 4 0 00-4-4H43a4 4 0 00-4 4v32z"
      />
      <path
        fill="#f0f1f1"
        d="M71 59a4 4 0 01-4 4H43L31 75V63h-4a4 4 0 01-4-4V27a4 4 0 014-4h40a4 4 0 014 4v32z"
      />
      <path
        fill="currentColor"
        d="M70.335 24.798A3.99 3.99 0 0067 23H27a4 4 0 00-4 4v32a4 4 0 004 4h4v1.134l39.335-39.336z"
      />
      <circle cx={35} cy={43} r={4} fill="#21b2d1" />
      <circle cx={47} cy={43} r={4} fill="#21b2d1" />
      <circle cx={59} cy={43} r={4} fill="#21b2d1" />
    </svg>
  )
}

export default SvgChat
