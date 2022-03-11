export const gqlErrors = function (err) {
  // check if error is internal or not
  const hasInternal = (errors) => errors.some((e) => e.internal)
  const replaceInternal = (errors, err) =>
    hasInternal(errors) ? errors.filter((e) => !e.internal).concat(err) : errors

  return replaceInternal(
    (err?.graphQLErrors || []).map((error) => {
      // get validation key from graphql error
      if ('validation' === error.extensions?.category) {
        const validationErr = error.extensions?.validation || {}

        // get all error messages and flatten them then convert to object
        return Object.keys(validationErr)
          .map((key) => validationErr[key])
          .flat()
          .map((v) => ({
            message: v,
            internal: false,
          }))
      }

      return {
        message: error.message,
        internal: Boolean(!error?.path?.length),
      }
    }),
    {
      message: 'Something bad happened',
    }
  ).flat()
}
