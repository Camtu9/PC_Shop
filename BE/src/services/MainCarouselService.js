import MainCarousel from '../models/MainCarouselModel.js'

const findSlides = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const foundSlides = await MainCarousel.find();
            if (foundSlides) {
                resolve({
                    status: 'OK',
                    message: 'Slides found successfully',
                    data: foundSlides
                })
            } else {
                reject({
                    status: 'ERR',
                    message: 'Slides not found'
                })
            }
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

export default {findSlides};