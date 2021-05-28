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
      <path fill="#ffd158" d="M23 16a7 7 0 01-7 7 7 7 0 01-7-7 7 7 0 017-7 7 7 0 017 7z" />
      <path
        d="M15.992 2a.5.5 0 00-.492.507v2.987a.5.5 0 101 0V2.507A.5.5 0 0015.992 2zm0 24a.5.5 0 00-.492.507v2.987a.5.5 0 101 0v-2.987a.5.5 0 00-.508-.508zM2.508 15.5a.5.5 0 100 1h2.984a.5.5 0 100-1zm24 0a.5.5 0 100 1h2.984a.5.5 0 100-1zm-1.024-9.499a.5.5 0 00-.343.15l-1.989 1.991a.5.5 0 10.707.707l1.989-1.99A.5.5 0 0025.484 6zM6.5 6a.5.5 0 00-.348.859l1.989 1.99a.5.5 0 10.707-.707l-1.989-1.99a.5.5 0 00-.359-.153zm17 17a.5.5 0 00-.348.859l1.989 1.99a.5.5 0 10.707-.707l-1.989-1.99a.5.5 0 00-.359-.153zm-15.016.001a.5.5 0 00-.343.15l-1.989 1.991a.5.5 0 10.707.707l1.989-1.99A.5.5 0 008.484 23z"
        style={{
          lineHeight: 'normal',
          textIndent: 0,
          textAlign: 'start',
          textDecorationLine: 'none',
          textDecorationStyle: 'solid',
          textDecorationColor: '#000',
          textTransform: 'none',
          whiteSpace: 'normal',
          isolation: 'auto',
          mixBlendMode: 'normal',
          solidColor: '#000',
          solidOpacity: 1,
        }}
        fill="#ffd158"
        fillRule="evenodd"
        color="#000"
        fontFamily="sans-serif"
        fontWeight={400}
        overflow="visible"
      />
      <path
        d="M13.48 17.5a.5.5 0 00-.382.799c.127.177.272.34.431.49A3.604 3.604 0 0016 19.75c.958 0 1.833-.363 2.47-.96.16-.15.305-.314.432-.491a.5.5 0 10-.812-.586c-.09.124-.19.24-.303.346A2.605 2.605 0 0116 18.75a2.605 2.605 0 01-1.787-.691 2.382 2.382 0 01-.303-.346.5.5 0 00-.43-.213zm.27-5.25c-.44 0-.843.191-1.127.488a1.64 1.64 0 00-.334.518.5.5 0 10.928.375.649.649 0 01.13-.203.544.544 0 01.805 0 .65.65 0 01.131.203.5.5 0 10.928-.375 1.643 1.643 0 00-.334-.518 1.562 1.562 0 00-1.127-.488zm4.5 0c-.44 0-.843.191-1.127.488a1.64 1.64 0 00-.334.518.5.5 0 10.928.375.649.649 0 01.13-.203.544.544 0 01.805 0 .65.65 0 01.131.203.5.5 0 10.928-.375 1.643 1.643 0 00-.334-.518 1.562 1.562 0 00-1.127-.488z"
        style={{
          lineHeight: 'normal',
          textIndent: 0,
          textAlign: 'start',
          textDecorationLine: 'none',
          textDecorationStyle: 'solid',
          textDecorationColor: '#000',
          textTransform: 'none',
          whiteSpace: 'normal',
          isolation: 'auto',
          mixBlendMode: 'normal',
          solidColor: '#000',
          solidOpacity: 1,
        }}
        fill="#cc8634"
        color="#000"
        fontFamily="sans-serif"
        fontWeight={400}
        overflow="visible"
      />
    </svg>
  )
}

export default SvgSun
