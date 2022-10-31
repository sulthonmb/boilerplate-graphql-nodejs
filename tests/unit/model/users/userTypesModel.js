const {getAllUserTypes,getSingleUserTypes,createUserTypes } = require('../../../../app/models/users/userTypesModel')
const { status } = require('../../../../app/helpers/status')

describe('User types service unit tests', () => {
  describe('getAllUserTypes()', () => {
    test('Should return JSON response.status', async () => {
      const varGetAllUserTypes = await getAllUserTypes()

      expect(varGetAllUserTypes).toBeDefined()
      expect(varGetAllUserTypes).toHaveProperty('status', status.success)
    })
  })

  describe('getSingleUserTypes(id)', () => {
    test('Should return JSON response.status', async () => {
      const id = 1
      const varGetSingleUserTypes = await getSingleUserTypes(id)

      expect(varGetSingleUserTypes).toBeDefined()
    })
  })

  describe('createUserTypes(id)', () => {
    test('Should return JSON response.status', async () => {
      const id = 1
      const varCreateUserTypes = await createUserTypes(id)

      expect(varCreateUserTypes).toBeDefined()
    })
  })
})