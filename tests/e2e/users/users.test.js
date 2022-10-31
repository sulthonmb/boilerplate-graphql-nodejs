const request = require('supertest')
const app = require('../../../app')

describe('Users', () => {
  let token
  let idUsers

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

  it('should success to post a user', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .set('token', token)
      .send({
        name: 'Pegawai A',
        email: 'pegawai_a@gmail.com',
        password: '12345678',
        phone_number: '+6283748209883',
        gender: 'L',
        id_user_type: '2'
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('status', 'success')
  })

  it('should failed to post a user, wrong form', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .set('token', token)
      .send({
        name: 'Pi',
        email: 'pegawai_a@gmail.com',
        password: '12345678',
        phone_number: '+6283748209883',
        gender: 'L',
        id_user_type: '2'
      })
    expect(res.statusCode).toEqual(422)
    expect(res.body).toHaveProperty('status', 'error')
  })

  it('should failed to post a user, wrong token', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .set('token', token + '1')
      .send({
        name: 'Pegawai',
        email: 'pegawai_a@gmail.com',
        password: '12345678',
        phone_number: '+6283748209883',
        gender: 'L',
        id_user_type: '2'
      })
    expect(res.statusCode).toEqual(401)
    expect(res.body).toHaveProperty('status', 'error')
  })

  it('should success to get all users', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('token', token)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('status', 'success')

    const lastData = res.body.data[res.body.data.length - 1]
    idUsers = lastData.id
  })

  it('should failed to get all users, wrong token', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('token', token + '1')
    expect(res.statusCode).toEqual(401)
    expect(res.body).toHaveProperty('status', 'error')
  })

  it('should success to get a user', async () => {
    const res = await request(app)
      .get('/api/v1/users/' + idUsers)
      .set('token', token)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('status', 'success')
  })

  it('should failed to get a user, wrong token', async () => {
    const res = await request(app)
      .get('/api/v1/users/' + idUsers)
      .set('token', token + '1')
    expect(res.statusCode).toEqual(401)
    expect(res.body).toHaveProperty('status', 'error')
  })

  it('should failed to get a user', async () => {
    const res = await request(app)
      .get('/api/v1/users/99')
      .set('token', token)
    expect(res.statusCode).toEqual(404)
    expect(res.body).toHaveProperty('status', 'error')
  })

  it('should success to update a user', async () => {
    const res = await request(app)
      .put('/api/v1/users/' + idUsers)
      .set('token', token)
      .send({
        name: 'Employee',
        email: 'pegawai_a@gmail.com',
        password: '12345678',
        phone_number: '+6283748209883',
        gender: 'L',
        id_user_type: '2'
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('status', 'success')
  })

  it('should failed to update a user, wrong token', async () => {
    const res = await request(app)
      .put('/api/v1/users/' + idUsers)
      .set('token', token + '1')
      .send({
        name: 'Employee',
        email: 'pegawai_a@gmail.com',
        password: '12345678',
        phone_number: '+6283748209883',
        gender: 'L',
        id_user_type: '2'
      })
    expect(res.statusCode).toEqual(401)
    expect(res.body).toHaveProperty('status', 'error')
  })

  it('should failed to update a user, wrong id', async () => {
    const res = await request(app)
      .put('/api/v1/users/99')
      .set('token', token)
      .send({
        name: 'Employee',
        email: 'pegawai_a@gmail.com',
        password: '12345678',
        phone_number: '+6283748209883',
        gender: 'L',
        id_user_type: '2'
      })
    expect(res.statusCode).toEqual(404)
    expect(res.body).toHaveProperty('status', 'error')
  })

  it('should success to delete a user', async () => {
    const res = await request(app)
      .delete('/api/v1/users/' + idUsers)
      .set('token', token)
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('status', 'success')
  })

  it('should failed to delete a user, wrong token', async () => {
    const res = await request(app)
      .delete('/api/v1/users/' + idUsers)
      .set('token', token + '1')
    expect(res.statusCode).toEqual(401)
    expect(res.body).toHaveProperty('status', 'error')
  })

  it('should failed to delete a user, wrong id', async () => {
    const res = await request(app)
      .delete('/api/v1/users/99')
      .set('token', token)
    expect(res.statusCode).toEqual(404)
    expect(res.body).toHaveProperty('status', 'error')
  })
})