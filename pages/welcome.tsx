import withAuth from '@hocs/withAuth'
import React from 'react'

function welcome() {
  return (
    <div>
      <h1>Welcome new user</h1>
    </div>
  )
}

export default withAuth(welcome)
