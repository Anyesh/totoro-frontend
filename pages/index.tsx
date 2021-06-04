import withAuth from '@hocs/withAuth'
import { Session } from 'next-auth'
import React from 'react'

function index(props: { session: Session }) {
  const { session } = props

  return <></>
}

export default withAuth(index)
