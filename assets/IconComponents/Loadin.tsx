import * as React from 'react'

function SvgLoadin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" height="30" {...props}>
      <path d="M424.5 216.5h-15.2c-12.4 0-22.8-10.7-22.8-23.4 0-6.4 2.7-12.2 7.5-16.5l9.8-9.6c9.7-9.6 9.7-25.3 0-34.9L381.5 110c-4.4-4.4-10.9-7-17.5-7s-13 2.6-17.5 7l-9.4 9.4c-4.5 5-10.5 7.7-17 7.7-12.8 0-23.5-10.4-23.5-22.7V89.1c0-13.5-10.9-25.1-24.5-25.1h-30.4c-13.6 0-24.4 11.5-24.4 25.1v15.2c0 12.3-10.7 22.7-23.5 22.7-6.4 0-12.3-2.7-16.6-7.4l-9.7-9.6c-4.4-4.5-10.9-7-17.5-7s-13 2.6-17.5 7L110 132c-9.6 9.6-9.6 25.3 0 34.8l9.4 9.4c5 4.5 7.8 10.5 7.8 16.9 0 12.8-10.4 23.4-22.8 23.4H89.2c-13.7 0-25.2 10.7-25.2 24.3v30.4c0 13.5 11.5 24.3 25.2 24.3h15.2c12.4 0 22.8 10.7 22.8 23.4 0 6.4-2.8 12.4-7.8 16.9l-9.4 9.3c-9.6 9.6-9.6 25.3 0 34.8l22.3 22.2c4.4 4.5 10.9 7 17.5 7s13-2.6 17.5-7l9.7-9.6c4.2-4.7 10.2-7.4 16.6-7.4 12.8 0 23.5 10.4 23.5 22.7V423c0 13.5 10.8 25.1 24.5 25.1H272c13.6 0 24.4-11.5 24.4-25.1v-15.2c0-12.3 10.7-22.7 23.5-22.7 6.4 0 12.4 2.8 17 7.7l9.4 9.4c4.5 4.4 10.9 7 17.5 7s13-2.6 17.5-7l22.3-22.2c9.6-9.6 9.6-25.3 0-34.9l-9.8-9.6c-4.8-4.3-7.5-10.2-7.5-16.5 0-12.8 10.4-23.4 22.8-23.4h15.2c13.6 0 23.3-10.7 23.3-24.3v-30.5c.2-13.6-9.5-24.3-23.1-24.3zM336.8 256c0 44.1-35.7 80-80 80s-80-35.9-80-80 35.7-80 80-80 80 35.9 80 80z" />
    </svg>
  )
}

export default SvgLoadin
