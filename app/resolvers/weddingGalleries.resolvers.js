const { 
    Weddings,
    WeddingGallery
} = require('../database/models')
const { ACTIONS } = require('../constants')
const { Op } = require("sequelize")
const { imageUploaderForGallery } = require('../utils/uploaders')

module.exports = {
    Query: {
        weddingGalleries: async (_, { weddingId, limit, offset }, context) => ({
            weddingId, limit, offset
        })
    },
    WeddingGalleries: {
        data: ({weddingId, limit, offset}) => {
            try {
                return WeddingGallery.findAll({
                    attributes: ['id', 'uri'],
                    where: {
                        weddingId: {
                            [Op.eq]: weddingId
                        }
                    },
                    limit, offset
                })
            } catch (error) {
                throw new Error(error)
            }
        },
        paginationInfo: ({weddingId, limit, offset}) => {
            try {
                const count = WeddingGallery.count({
                    where: {
                        weddingId: {
                            [Op.eq]: weddingId
                        }
                    },
                })
                return { limit, offset, count }
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        uploadImageToGallery: async (_, { weddingId, image }, context) => {
            try {
                if(!context.user || !context.userActions){
                    throw new Error('Unauthenticated!')
                }

                if(!context.userActions.includes(ACTIONS.WEDDING_GALLERIES.CREATE)){
                    throw new Error('Unauthorized!')
                }

                const checkWedding = await Weddings.findOne({
                    where: {
                        id: {
                            [Op.eq]: weddingId
                        }
                    }
                })

                if(!checkWedding) {
                    throw new Error('Wedding not found!')
                }

                const { createReadStream, filename, mimetype, encoding } = await image;

                const uri = await imageUploaderForGallery.upload(createReadStream(), {
                    filename,
                    mimetype,
                });

                const createImage = await WeddingGallery.create({
                    weddingId,
                    filename,
                    mimetype,
                    encoding,
                    uri
                })

                return createImage
            } catch (error) {
                throw new Error(error)
            }
        },
        deleteImageFromGallery: async (_, { id }, context) => {
            try {
                if(!context.user || !context.userActions){
                    throw new Error('Unauthenticated!')
                }

                if(!context.userActions.includes(ACTIONS.WEDDING_GALLERIES.DELETE)){
                    throw new Error('Unauthorized!')
                }

                const checkImage = await WeddingGallery.findOne({
                    where: {
                        id: {
                            [Op.eq]: id
                        }
                    }
                })

                if(!checkImage) {
                    throw new Error('Image not found!')
                }

                const result = await imageUploaderForGallery.delete({ filename: checkImage.uri})

                await checkImage.destroy()

                return checkImage
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}