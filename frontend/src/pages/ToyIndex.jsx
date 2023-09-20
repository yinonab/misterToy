import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function ToyIndex(){
    const { toys } = useSelector(storeState => storeState.toyModule)

    useEffect(() => {
        loadToys()
    }, [])
}