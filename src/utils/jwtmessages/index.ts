export const errorTokenMessagesReturn = {
  badRequestErrorMessage: 'Format is Authorization: Bearer [token]',
  badCookieRequestErrorMessage: 'Cookie could not be parsed in request',
  noAuthorizationInHeaderMessage:
    'No Authorization was found in request.headers',
  noAuthorizationInCookieMessage:
    'No Authorization was found in request.cookies',
  authorizationTokenExpiredMessage: 'Authorization token expired',
  authorizationTokenUntrusted: 'Untrusted authorization token',
  authorizationTokenUnsigned: 'Unsigned authorization token',

  authorizationTokenInvalid: (err: any) => {
    return `Authorization token is invalid: ${err.message}`
  },
}
