import * as React from 'react'

function SvgGithub(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="22.5"
      height="22.5"
      {...props}
    >
      <path
        d="M30.4 40h-8v-4c-5.5 1.2-7-3-7-3-1-2-2-3-2-3-2-1.2 0-1 0-1 2 0 3 2 3 2 1.8 3 4.9 2.5 6 2 0-1 .4-2.5 1-3-4.4-.5-8-3-8-8s1-6 2-7c-.2-.5-1-2.3 0-5 0 0 2 0 4 3 1-1 4-1 5-1s4 0 5 1c2-3 4-3 4-3 1.1 2.7.2 4.5 0 5 1 1 2 2 2 7s-3.6 7.5-8 8c.6.5 1 2.2 1 3v7z"
        className="github_svg__github_svg__github_svg__st0"
      />
      <path
        d="M25 1C11.7 1 1 11.7 1 25s10.7 24 24 24 24-10.7 24-24S38.3 1 25 1zm0 43C14.5 44 6 35.5 6 25S14.5 6 25 6s19 8.5 19 19-8.5 19-19 19z"
        className="github_svg__github_svg__github_svg__st0"
      />
    </svg>
  )
}

export default SvgGithub
