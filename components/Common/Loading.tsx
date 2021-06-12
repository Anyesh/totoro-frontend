import Loadin from '@assets/IconComponents/Loadin'
import PropTypes from 'prop-types'
import React from 'react'
export default function Loading({ content }: { content?: string }): React.ReactElement {
  return (
    <div className="flex flex-row content-center w-screen justify-center">
      <Loadin className="animate-spin fill-current" width="100" height="100" />
      <h1 className="flex items-center">{content}</h1>
    </div>
  )
}

Loading.propTypes = {
  content: PropTypes.string,
}

Loading.defaultProps = {
  content: 'We are getting your things ready..',
}
