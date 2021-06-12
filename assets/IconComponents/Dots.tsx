import * as React from 'react'

function SvgDots(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 992 992" width="30" height="30" {...props}>
      <circle cx={144.3} cy={496} r={144.3} />
      <circle cx={496} cy={496} r={144.3} />
      <circle cx={847.7} cy={496} r={144.3} />
    </svg>
  )
}

export default SvgDots
