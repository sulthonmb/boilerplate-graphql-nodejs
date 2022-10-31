/* eslint-disable camelcase */
const successMessage = { status: 'success' }
const errorMessage = { status: 'error' }
const status = {
  /* http code success */
  success: 200,
  created: 201,
  nocontent: 204,
  /* http code redirection */
  temporaryRedirect: 307,
  permanentRedirect: 308,
  /* http code client error */
  bad: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notfound: 404,
  conflict: 409,
  notvalid: 422,
  /* http code server failed */
  error: 500
}

const trip_statuses = {
  active: 1.00,
  cancelled: 2.00
}
module.exports={
  successMessage,
  errorMessage,
  status,
  trip_statuses
}
