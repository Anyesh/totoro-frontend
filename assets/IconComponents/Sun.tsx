import * as React from 'react'

function SvgSun(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="30" height="30" {...props}>
      <circle cx={8.5} cy={7.5} r={4.5} />
      <path d="M8 0h1v2H8zm0 13h1v2H8zm6-6h2v1h-2zM1 7h2v1H1zm11.04 4.743l.708-.707 1.414 1.414-.707.707zM2.838 2.55l.707-.707 1.414 1.414-.707.707zm.005 9.905l1.414-1.414.707.707-1.414 1.414zm9.192-9.203l1.414-1.414.708.707-1.415 1.414z" />
    </svg>
  )
}

export default SvgSun
