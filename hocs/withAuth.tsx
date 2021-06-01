import withConditionalRedirect from '@hocs/withConditionalRedirect'
import { NextPage } from 'next'

export default function withAuth<CP, IP>(
  WrappedComponent: NextPage<CP, IP>,
  location = '/login'
): NextPage<CP, IP> {
  return withConditionalRedirect({
    WrappedComponent,
    location,
  })
}
