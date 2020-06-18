export const rejectError = ({ response = null }) => {
  let message = 'Opps, something went wrong!'
  if (response && response.data && response.data.errors) {
    message = response.data.errors
  }
  return Promise.reject(message)
}
