import {useState} from "react";

export const useFetch = (callback: Function): [Function, boolean, string] => {

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const fetching: Function = async () => {
        try {
            setError('')
            setLoading(true)
            await callback()
        } catch(e) {
            setLoading(false)
            if (typeof e === 'string') {

            } else if (e instanceof Error) {
                setError(e.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return [fetching, loading, error]
}