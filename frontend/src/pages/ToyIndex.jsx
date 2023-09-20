import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function ToyIndex(){
    const { toys } = useSelector(storeState => storeState.toyModule)

    useEffect(() => {
        loadToys()
    }, [])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }
}