const { getAllUserTypesService } = require('../../../../app/services/users/userTypesServices')

describe('User types service unit tests', () => {
  describe('Signup', () => {
    test('Should get all user types', async () => {
      const getAllUserTypes = await getAllUserTypesService()

      expect(getAllUserTypes).toBeDefined()
      expect(getAllUserTypesService()).toBeCalled()
    })
  })
})