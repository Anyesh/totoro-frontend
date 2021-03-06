import * as React from 'react'

function SvgMoon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="30" height="30" {...props}>
      <path d="M40.124 16.98A36.907 36.907 0 0040 20c0 19.851 16.148 36 36 36 1.014 0 2.021-.041 3.02-.124C75.501 69.725 62.928 80 48 80c-17.645 0-32-14.355-32-32 0-14.928 10.275-27.501 24.124-31.02M48 8C25.909 8 8 25.909 8 48c0 22.092 17.909 40 40 40 22.092 0 40-17.908 40-40 0-.893-.04-1.776-.098-2.654A27.888 27.888 0 0176 48c-15.464 0-28-12.536-28-28 0-4.257.955-8.29 2.654-11.903A40.917 40.917 0 0048 8z" />
    </svg>
  )
}

export default SvgMoon
