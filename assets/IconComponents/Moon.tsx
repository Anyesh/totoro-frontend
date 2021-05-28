import * as React from 'react'

function SvgMoon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="22.5"
      height="22.5"
      {...props}
    >
      <path
        fill="#464646"
        d="M20.21 15.32A8.56 8.56 0 1111.29 3.5a.5.5 0 01.51.28.49.49 0 01-.09.57A6.46 6.46 0 009.8 9a6.57 6.57 0 009.71 5.72.52.52 0 01.58.07.52.52 0 01.12.53z"
      />
    </svg>
  )
}

export default SvgMoon
