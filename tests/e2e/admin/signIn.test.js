const request = require('supertest')
const app = require('../../../app')

describe('Admin Sign In', () => {
  it('should failed to sign in', async () => {
    const res = await request(app)
      .post('/api/v1/admin/signin')
      .send({
        email: 'admin@gmail.com',
        password: 'admin124'
      })
    expect(res.statusCode).toEqual(403)
    expect(res.body).toHaveProperty('status', 'error')
  })

  it('should success to sign in', async () => {
    const res = await request(app)
      .post('/api/v1/admin/signin')
      .send({
        email: 'admin@gmail.com',
        password: 'admin123'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('status', 'success')
  })

  it('should failed to sign in, wrong password', async () => {
    const res = await request(app)
      .post('/api/v1/admin/signin')
      .send({
        email: 'admin@gmail.com',
        password: 'admin126'
      })
    expect(res.statusCode).toEqual(403)
    expect(res.body).toHaveProperty('status', 'error')
  })

  it('should failed to sign in, wrong form', async () => {
    const res = await request(app)
      .post('/api/v1/admin/signin')
      .send({
        email: 'admin',
        password: 'admin126'
      })
    expect(res.statusCode).toEqual(422)
    expect(res.body).toHaveProperty('status', 'error')
  })
})