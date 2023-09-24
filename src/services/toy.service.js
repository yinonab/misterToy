import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
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
    getDefaultFilter,
    getToyLabels,
    getLabels,
    getDataValues
}

_createToys()

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
    // .then(toys => {
    //     return toys.filter(toy =>
    //         regExp.test(toy.vendor) &&
    //         toy.price <= filterBy.maxPrice
    //     )
    // })
}

// function query(filterBy = {}) {
//     return storageService.query(STORAGE_KEY).then(toys => {
//         let toyToDisplay = [...toys]
//         // console.log('toyToDisplay', toyToDisplay)
//         if (filterBy.txt) {
//             const regExp = new RegExp(filterBy.txt, 'i')
//             toyToDisplay = toyToDisplay.filter(toy => regExp.test(toy.name))
//             // console.log('toyToDisplay txt', toyToDisplay)
//         }
//         if (filterBy.inStock !== undefined) {
//             if (filterBy.inStock === true) {
//                 toyToDisplay = toyToDisplay.filter(toy => toy.inStock === true)
//             } else if (filterBy.inStock === false) {
//                 toyToDisplay = toyToDisplay.filter(toy => toy.inStock === false)
//             }
//         }
//         if (filterBy.labels && filterBy.labels.length > 0) {
//             toyToDisplay = toyToDisplay.filter(toy => {
//                 return toy.labels.some(label => filterBy.labels.includes(label));
//             });
//         }
//         // return axios.get(BASE_URL).then(res => res.data)
//         // return toyToDisplay
//     })
// }

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

// function getById(toyId) {
//     return storageService.get(STORAGE_KEY, toyId)
// }

function remove(toyId) {
    // return Promise.reject('Oh no!')
    return httpService.delete(BASE_URL + toyId)
}

// function remove(toyId) {
//     // return Promise.reject('Not now!')
//     return storageService.remove(STORAGE_KEY, toyId)
// }

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

// function save(toy) {
//     if (toy._id) {
//         return storageService.put(STORAGE_KEY, toy)
//     } else {
//         // when switching to backend - remove the next line
//         return storageService.post(STORAGE_KEY, toy)
//     }
// }

function getEmptyToy() {
    return {
        name: utilService.makeLorem(),
        price: utilService.getRandomIntInclusive(1000, 9000),
        labels: utilService.makeLabel(),
        createdAt: utilService.getTimeFromStamp(Date.now()),
        inStock: utilService.randomTrueFalse(),
        icon:utilService.makeImage()
    }
}

function getDefaultFilter() {
    return { txt: '', labels: [], inStock: undefined, pageIdx: 0 };
}

function _createToys() {
    let toys = storageService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            {
                _id: utilService.makeId(),
                name: utilService.makeLorem(),
                price: utilService.getRandomIntInclusive(1000, 9000),
                labels: utilService.makeLabel(),
                createdAt: utilService.getTimeFromStamp(Date.now()),
                inStock: false
            },
            {
                _id: utilService.makeId(),
                name: utilService.makeLorem(),
                price: utilService.getRandomIntInclusive(1000, 9000),
                labels: utilService.makeLabel(),
                createdAt: utilService.getTimeFromStamp(Date.now()),
                inStock: true
            },
            {
                _id: utilService.makeId(),
                name: utilService.makeLorem(),
                price: utilService.getRandomIntInclusive(1000, 9000),
                labels: utilService.makeLabel(),
                createdAt: utilService.getTimeFromStamp(Date.now()),
                inStock: false
            }
        ]
        storageService.saveToStorage(STORAGE_KEY, toys)
    }
}

function getToyLabels() {
    return labels
}

function getLabels(toys){
    let labels = {}
    toys.map(toy=>{
        toy.labels.map(label=>{
            if(!labels[label])labels[label] = 0
            labels[label] ++
        })
    })
    return labels
}
function getDataValues(labels){
    var newData=[]
    for(var i=0;i<Object.keys(labels).length;i++){
        newData.push(Object.values(labels)[i])
    }
    return newData
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))