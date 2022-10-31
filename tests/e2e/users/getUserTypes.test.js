// import redis from '../../../app/config/redis'
const redis = require('../../../app/config/redis')
const request = require('supertest')
const app = require('../../../app')

describe('User Types', () => {
  let token
  let idUserTypes

  afterAll(async () => await redis.close())

  it('should success to sign in', async () => {
    const res = await request(app)
      .post('/api/v1/admin/signin')
      .send({
        email: 'admin@gmail.com',
        password: 'admin123'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('status', 'success')
    token = res.body.data.token
  })

  it('should success to post a user type', async () => {
    const res = await request(app)
      .post('/api/v1/user-types')
      .set('token', token)
      .send({
        name: 'Pegawai'
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('status', 'success')
  })

  it('should failed to post a user type, wrong form', async () => {
    const res = await request(app)
      .post('/api/v1/user-types')
      .set('token', token)
      .send({
        name: 'Pi'
      })
    expect(res.statusCode).toEqual(422)
    expect(res.body).toHaveProperty('status', 'error')
  })

  it('should failed to post a user type, wrong token', async () => {
    const res = await request(app)
      .post('/api/v1/user-types')
      .set('token', token + '1')
      .send({
        name: 'Pegawai'
      })
    expect(res.statusCode).toEqual(401)
    expect(res.body).toHaveProperty('status', 'error')
  })

  it('should success to get all user types', async () => {
    const res = await request(app)
      .get('/api/v1/user-types')
      .set('token', token)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('status', 'success')

    const lastData = res.body.data[res.body.data.length - 1]
    idUserTypes = lastData.id
  })

  it('should failed to get all user types, wrong token', async () => {
    const res = await request(app)
      .get('/api/v1/user-types')
      .set('token', token + '1')
    expect(res.statusCode).toEqual(401)
    expect(res.body).toHaveProperty('status', 'error')
  })

  it('should success to get a user type', async () => {
    const res = await request(app)
      .get('/api/v1/user-types/' + idUserTypes)
      .set('token', token)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('status', 'success')
  })

  it('should failed to get a user type, wrong token', async () => {
    const res = await request(app)
      .get('/api/v1/user-types/' + idUserTypes)
      .set('token', token + '1')
    expect(res.statusCode).toEqual(401)
    expect(res.body).toHaveProperty('status', 'error')
  })

  it('should failed to get a user type', async () => {
    const res = await request(app)
      .get('/api/v1/user-types/99')
      .set('token', token)
    expect(res.statusCode).toEqual(404)
    expect(res.body).toHaveProperty('status', 'error')
  })

  it('should success to update a user type', async () => {
    const res = await request(app)
      .put('/api/v1/user-types/' + idUserTypes)
      .set('token', token)
      .send({
        name: 'Employee'
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('status', 'success')
  })

  it('should failed to update a user type, wrong token', async () => {
    const res = await request(app)
      .put('/api/v1/user-types/' + idUserTypes)
      .set('token', token + '1')
      .send({
        name: 'Employee'
      })
    expect(res.statusCode).toEqual(401)
    expect(res.body).toHaveProperty('status', 'error')
  })

  it('should failed to update a user type, wrong id', async () => {
    const res = await request(app)
      .put('/api/v1/user-types/99')
      .set('token', token)
      .send({
        name: 'Employee'
      })
    expect(res.statusCode).toEqual(404)
    expect(res.body).toHaveProperty('status', 'error')
  })

  it('should success to delete a user type', async () => {
    const res = await request(app)
      .delete('/api/v1/user-types/' + idUserTypes)
      .set('token', token)
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('status', 'success')
  })

  it('should failed to delete a user type, wrong token', async () => {
    const res = await request(app)
      .delete('/api/v1/user-types/' + idUserTypes)
      .set('token', token + '1')
    expect(res.statusCode).toEqual(401)
    expect(res.body).toHaveProperty('status', 'error')
  })

  it('should failed to delete a user type, wrong id', async () => {
    const res = await request(app)
      .delete('/api/v1/user-types/99')
      .set('token', token)
    expect(res.statusCode).toEqual(404)
    expect(res.body).toHaveProperty('status', 'error')
  })
})