import { useState, useEffect, useReducer, useRef } from 'react';

export function useWindowSize() {
    const [windowScale, setWindowScale] = useState({
        width: window.innerWidth * 0.7,
        height: window.innerHeight * 0.9
    })
    const handleResize = () => {
        setWindowScale({
            width: window.innerWidth * 0.7,
            height: window.innerHeight * 0.9
        })
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return windowScale
}

interface State<T> { data?: T, error?: Error }
type Cache<T> = { [url: string]: T }
type Action<T> =
    | { type: 'loading' }
    | { type: 'fetched'; payload: T }
    | { type: 'error'; payload: Error }

export function useFetch<T = unknown>(url?: string, options?: RequestInit): State<T> {
    const cache = useRef<Cache<T>>({})

    const cancelRequest = useRef<boolean>(false)

    const initialState: State<T> = {
        error: undefined,
        data: undefined,
    }

    const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
        switch (action.type) {
            case 'loading':
                return { ...initialState }
            case 'fetched':
                return { ...initialState, data: action.payload }
            case 'error':
                return { ...initialState, error: action.payload }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(fetchReducer, initialState)

    useEffect(() => {
        if (!url) {
            return
        }

        const fetchData = async () => {
            dispatch({ type: 'loading' })

            if (cache.current[url]) {
                dispatch({ type: 'fetched', payload: cache.current[url] })
                return
            }

            try {
                const response = await fetch(url, options)

                if (!response.ok) {
                    throw new Error(response.statusText)
                }

                const _data = (await response.json())
                const data = JSON.parse(_data) as T

                cache.current[url] = data
                if (cancelRequest.current) {
                    return
                }
                dispatch({ type: 'fetched', payload: data })
            } catch (error) {
                if (cancelRequest.current) {
                    return
                }
                dispatch({ type: 'error', payload: error as Error })
            }
        }

        void fetchData()
        return () => {
            cancelRequest.current = true
        }

    }, [url])

    return state
}