
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toyDB'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}
_createToys()


// function query(filterBy = {}) {
//     return httpService.get(BASE_URL, filterBy)
//     // .then(toys => {
//     //     return toys.filter(toy =>
//     //         regExp.test(toy.vendor) &&
//     //         toy.price <= filterBy.maxPrice
//     //     )
//     // })
// }

function query() {
    // return axios.get(BASE_URL).then(res => res.data)
    return storageService.query(STORAGE_KEY)
}

// function getById(toyId) {
//     return httpService.get(BASE_URL + toyId)
// }

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

// function remove(toyId) {
//     // return Promise.reject('Oh no!')
//     return httpService.delete(BASE_URL + toyId)
// }

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}



// function save(toy) {
//     if (toy._id) {
//         return httpService.put(BASE_URL, toy)
//     } else {
//         return httpService.post(BASE_URL, toy)
//     }
// }

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        return storageService.post(STORAGE_KEY, toy)
    }
}


function getEmptyToy() {
    return {
        name:utilService.makeLorem(),
        price: utilService.getRandomIntInclusive(1000, 9000),
        labels:[utilService.makeLabel().split(',').join],
        createdAt:utilService.getTimeFromStamp(),
        inStock:true
    }
}


// function getDefaultFilter() {
//     return { txt: '', maxPrice: '' }
// }


function _createToys() {
    let toys = storageService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            {
                _id:utilService.makeId(),
                name:utilService.makeLorem(),
                price: utilService.getRandomIntInclusive(1000, 9000),
                labels:[utilService.makeLabel().join(',')],
                createdAt:utilService.getTimeFromStamp(),
                inStock:true

            },
            {
                _id:utilService.makeId(),
                name:utilService.makeLorem(),
                price: utilService.getRandomIntInclusive(1000, 9000),
                labels:[utilService.makeLabel().split(',').join],
                createdAt:utilService.getTimeFromStamp(),
                inStock:true

            },
            {
                _id:utilService.makeId(),
                name:utilService.makeLorem(),
                price: utilService.getRandomIntInclusive(1000, 9000),
                labels:[utilService.makeLabel().join(',')],
                createdAt:utilService.getTimeFromStamp(),
                inStock:true
            }

        ]
        storageService.saveToStorage(STORAGE_KEY, toys)
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


