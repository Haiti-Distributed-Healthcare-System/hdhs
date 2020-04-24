import { renderHook } from '@testing-library/react-hooks'
import useApi from './useApi'

test('should return loading and then a response', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useApi(''))

    expect(result.current.response).toBeNull()
    expect(result.current.error).toBeNull()
    expect(result.current.isLoading).toBeTruthy()

    await waitForNextUpdate()

    expect(result.current.response).toBeTruthy()
    expect(result.current.error).toBeNull()
    expect(result.current.isLoading).toBeFalsy()
})

test('should return an error on a non existent route', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useApi('/404'))

    expect(result.current.response).toBeNull()
    expect(result.current.error).toBeNull()

    await waitForNextUpdate()

    expect(result.current.response).toBeFalsy()
    expect(result.current.error).toBeTruthy()
})
