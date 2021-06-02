import * as React from 'react'

function SvgLoadin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30" height="30" {...props}>
      <g transform="translate(2 1)">
        <circle
          cx={25.4}
          cy={15}
          r={2.6}
          fill="#222a30"
          fillRule="evenodd"
          stroke="#222a30"
          strokeWidth={0.78}
          clipRule="evenodd"
        >
          <animate
            fill="remove"
            accumulate="none"
            additive="replace"
            attributeName="fill-opacity"
            begin="0s"
            calcMode="linear"
            dur="1.3s"
            repeatCount="indefinite"
            restart="always"
            values="1;0;0;0;0;0;0;0"
          />
        </circle>
        <circle cx={22.1} cy={23.1} r={2.6} className="loadin_svg__loadin_svg__loadin_svg__st3">
          <animate
            fill="remove"
            accumulate="none"
            additive="replace"
            attributeName="fill-opacity"
            begin="0s"
            calcMode="linear"
            dur="1.3s"
            repeatCount="indefinite"
            restart="always"
            values="0;1;0;0;0;0;0;0"
          />
        </circle>
        <circle cx={14} cy={26.4} r={2.6} className="loadin_svg__loadin_svg__loadin_svg__st3">
          <animate
            fill="remove"
            accumulate="none"
            additive="replace"
            attributeName="fill-opacity"
            begin="0s"
            calcMode="linear"
            dur="1.3s"
            repeatCount="indefinite"
            restart="always"
            values="0;0;1;0;0;0;0;0"
          />
        </circle>
        <circle cx={5.9} cy={23.1} r={2.6} className="loadin_svg__loadin_svg__loadin_svg__st3">
          <animate
            fill="remove"
            accumulate="none"
            additive="replace"
            attributeName="fill-opacity"
            begin="0s"
            calcMode="linear"
            dur="1.3s"
            repeatCount="indefinite"
            restart="always"
            values="0;0;0;1;0;0;0;0"
          />
        </circle>
        <circle cx={2.6} cy={15} r={2.6} className="loadin_svg__loadin_svg__loadin_svg__st3">
          <animate
            fill="remove"
            accumulate="none"
            additive="replace"
            attributeName="fill-opacity"
            begin="0s"
            calcMode="linear"
            dur="1.3s"
            repeatCount="indefinite"
            restart="always"
            values="0;0;0;0;1;0;0;0"
          />
        </circle>
        <circle cx={5.9} cy={6.9} r={2.6} className="loadin_svg__loadin_svg__loadin_svg__st3">
          <animate
            fill="remove"
            accumulate="none"
            additive="replace"
            attributeName="fill-opacity"
            begin="0s"
            calcMode="linear"
            dur="1.3s"
            repeatCount="indefinite"
            restart="always"
            values="0;0;0;0;0;1;0;0"
          />
        </circle>
        <circle cx={14} cy={3.6} r={2.6} className="loadin_svg__loadin_svg__loadin_svg__st3">
          <animate
            fill="remove"
            accumulate="none"
            additive="replace"
            attributeName="fill-opacity"
            begin="0s"
            calcMode="linear"
            dur="1.3s"
            repeatCount="indefinite"
            restart="always"
            values="0;0;0;0;0;0;1;0"
          />
        </circle>
        <circle cx={22.1} cy={6.9} r={2.6} className="loadin_svg__loadin_svg__loadin_svg__st3">
          <animate
            fill="remove"
            accumulate="none"
            additive="replace"
            attributeName="fill-opacity"
            begin="0s"
            calcMode="linear"
            dur="1.3s"
            repeatCount="indefinite"
            restart="always"
            values="0;0;0;0;0;0;0;1"
          />
        </circle>
      </g>
    </svg>
  )
}

export default SvgLoadin
