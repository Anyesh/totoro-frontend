import withConditionalRedirect from '@hocs/withConditionalRedirect'
import { NextPage } from 'next'

/**
 * Require the user to be unauthenticated in order to render the component.
 * If the user is authenticated, forward to the given URL.
 */
export default function withoutAuth<P>(WrappedComponent: NextPage<P>, location = '/'): NextPage<P> {
  return withConditionalRedirect({
    WrappedComponent,
    location,
  })
}
