import * as React from 'react'

function SvgAdd(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30" height="30" {...props}>
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M649 137.999h26v18h-14m-8 0h-4v-14M661 156l-8 6v-6"
      />
      <path d="M16 30c-3.74 0-7.255-1.456-9.899-4.101A13.956 13.956 0 013.547 9.595a1 1 0 011.779.915 11.961 11.961 0 002.189 13.975A11.917 11.917 0 0016 28c3.205 0 6.219-1.248 8.485-3.515S28 19.205 28 16c0-3.206-1.248-6.219-3.515-8.485S19.206 4 16 4a11.921 11.921 0 00-8.485 3.515.999.999 0 11-1.414-1.414A13.907 13.907 0 0116 2c3.74 0 7.256 1.457 9.899 4.101A13.903 13.903 0 0130 16c0 3.739-1.456 7.255-4.101 9.899A13.902 13.902 0 0116 30z" />
      <path d="M16 22a1 1 0 01-1-1V11a1 1 0 012 0v10a1 1 0 01-1 1z" />
      <path d="M21 17H11a1 1 0 010-2h10a1 1 0 110 2z" />
    </svg>
  )
}

export default SvgAdd
