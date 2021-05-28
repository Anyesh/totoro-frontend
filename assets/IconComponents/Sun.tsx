import * as React from 'react'

function SvgSun(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="22.5"
      height="22.5"
      {...props}
    >
      <g fill="none" fillRule="evenodd" stroke="#979797" strokeWidth={2} transform="translate(2 2)">
        <circle cx={14} cy={14} r={8} />
        <path
          strokeLinecap="round"
          d="M14 0v3m9.9 1.1l-2.122 2.122M28 14h-3m-1.1 9.9l-2.122-2.122M14 28v-3m-9.9-1.1l2.122-2.122M0 14h3m1.1-9.9l2.122 2.122"
        />
      </g>
    </svg>
  )
}

export default SvgSun
