import React from 'react'
import { render, queryByAttribute, fireEvent } from '@testing-library/react'
import { useHistory } from 'react-router-dom'
import Wrapper from './Wrapper'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}))

test("renders it's inner contents", () => {
    const dom = render(
        <Wrapper leftArrowText="back">
            <div>Hello!</div>
        </Wrapper>,
    )

    const textContents = dom.getByText('Hello!')

    expect(textContents).toBeInTheDocument()
})

test('renders navBar when given navTitle', () => {
    const dom = render(
        <Wrapper navTitle="CHI">
            <div>Hello!</div>
        </Wrapper>,
    )

    const getById = queryByAttribute.bind(null, 'id')
    const renderedNavBar = getById(dom.container, 'nav-bar')
    const navTitle = dom.getByText('CHI')

    expect(renderedNavBar).toBeTruthy()
    expect(navTitle).toBeInTheDocument()
})

test('renders no navBar when not given props', () => {
    const dom = render(
        <Wrapper>
            <div>Hello!</div>
        </Wrapper>,
    )
    const getById = queryByAttribute.bind(null, 'id')
    const renderedNavBar = getById(dom.container, 'nav-bar')
    expect(renderedNavBar).toBeFalsy()
})

test('renders leftArrowText', () => {
    const dom = render(
        <Wrapper leftArrowText="back">
            <div>Hello!</div>
        </Wrapper>,
    )

    const leftArrowText = dom.getByText('back')

    expect(leftArrowText).toBeInTheDocument()
})

test('redirects on left arrow click ', () => {
    const dom = render(
        <Wrapper leftArrowText="back" leftArrowRoute="/">
            <div>Hello!</div>
        </Wrapper>,
    )

    const leftArrowText = dom.getByText('back')
    fireEvent.click(leftArrowText)

    expect(useHistory().push).toBeCalledWith('/')
})
