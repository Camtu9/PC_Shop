import MainCarouselService from '../services/MainCarouselService.js'

const findSlides = async (req, res) => {
    try {
        const foundSlides = await MainCarouselService.findSlides()
        return res.status(200).json(foundSlides)
    } catch (e) {
        return res.status(404).json({message: e})
    }
}

export default {findSlides};