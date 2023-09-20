
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'car/'
const STORAGE_KEY = 'carDB'

export const carService = {
    query,
    getById,
    save,
    remove,
    getEmptyCar,
    getDefaultFilter
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
    // .then(cars => {
    //     return cars.filter(car =>
    //         regExp.test(car.vendor) &&
    //         car.price <= filterBy.maxPrice
    //     )
    // })
}

function getById(carId) {
    return httpService.get(BASE_URL + carId)
}

function remove(carId) {
    // return Promise.reject('Oh no!')
    return httpService.delete(BASE_URL + carId)
}

function save(car) {
    if (car._id) {
        return httpService.put(BASE_URL, car)
    } else {
        return httpService.post(BASE_URL, car)
    }
}

function getEmptyCar() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
        speed: utilService.getRandomIntInclusive(50, 200),
    }
}


function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


