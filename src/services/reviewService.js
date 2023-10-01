import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'review/'

export const reviewService = {
   
    addReview,
    removeReview
}



async function addReview(reviewId, txt) {
    // console.log('toyId',toyId , txt)
    const savedMsg = await httpService.post(`toy/${toyId}/msg`, { txt })
    return savedMsg
}

async function removeReview(reviewId) {
    const removedId = await httpService.delete(`toy/${toyId}/msg/${msgId}`)
    return removedId
}