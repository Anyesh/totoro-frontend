import { PostContnetData } from '@types'
import isEmpty from './is-empty'

export const validateCreatePost = (data: PostContnetData): Record<string, unknown> => {
  const errors: Record<string, string> = {}
  if (isEmpty(data?.title)) {
    errors.title = 'this field is required!'
  }
  if (isEmpty(data?.image?.type)) {
    errors.image = 'this field is required!'
  }

  return {
    errors,
    isValid: isEmpty(Object.values(errors)),
  }
}
