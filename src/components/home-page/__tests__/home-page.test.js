// import React from 'react'
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'
// import {
//   render,
//   fireEvent,
//   screen,
//   waitForElement,
//   cleanup,
// } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect'
// import axiosMock from 'axios'
//
// import HomePageContainer from '../../../containers/home-page-container'
// import ProductListPage from '../'
// import { mockApi } from '../__mocks__'
// import { API_BASE_URL } from '../../../api/api'
// import rootReducer from '../../../reducers'
// import Product from '../../product'
//
// jest.mock('axios')
//
// describe('<HomePage>', () => {
//   afterEach(cleanup)
//
//   function renderWithRedux(
//     ui,
//     { initialState, store = createStore(rootReducer, initialState) } = {},
//   ) {
//     return {
//       ...render(<Provider store={store}>{ui}</Provider>),
//       // adding `store` to the returned utilities to allow us
//       // to reference it in our tests (just try to avoid using
//       // this to test implementation details).
//       store,
//     }
//   }
//
//   axiosMock.get.mockResolvedValue({
//     data: mockApi,
//   })
//   const { container } = renderWithRedux(<HomePageContainer />)
//
//   it('should fetch products from api on mount', () => {
//     expect(axiosMock.get).toHaveBeenCalled()
//     expect(axiosMock.get).toHaveBeenCalledWith(mockApi.resourceId)
//   })
//
//   it('should render correct products type and counts', async () => {
//     render(
//       <ProductListPage
//         products={{
//           catalogEntryView: mockApi.catalogEntryView,
//           breadCrumbTrailEntryView: mockApi.breadCrumbTrailEntryView,
//           facetView: mockApi.facetView,
//         }}
//         fetchProductsSuccess={jest.fn()}
//       />,
//     )
//     const productsTypeNode = screen.getByTestId('productType')
//     const productsType = mockApi.breadCrumbTrailEntryView.slice(-1)[0].label
//     expect(productsTypeNode).toHaveTextContent(productsType)
//     expect(
//       screen.getByText(`${mockApi.catalogEntryView.length} items`),
//     ).toBeInTheDocument()
//   })
//
//   it('should render products', async () => {
//     render(
//       <div>
//         {mockApi.catalogEntryView.map(({ thumbnail, name, price }, index) => (
//           <Product
//             key={index}
//             thumbnail={thumbnail}
//             name={name}
//             price={price}
//           />
//         ))}
//         ,
//       </div>,
//     )
//     const productNodes = await screen.findAllByTestId('product')
//
//     mockApi.catalogEntryView.forEach(async ({ thumbnail, name, price }) => {
//       const thumbnailNode = await waitForElement(() =>
//         getByTestId(productNodes, 'thumbnail'),
//       )
//       expect(thumbnailNode).toHaveAttribute(
//         'src',
//         `${API_BASE_URL}${thumbnail}`,
//       )
//       expect(productNodes).toHaveTextContent(name)
//       expect(productNodes).toHaveTextContent(
//         `$${price.find(type => type.usage === 'Display').value}`,
//       )
//     })
//   })
//   it('should render the available facetView filters', async () => {
//     render(
//       <ProductListPage
//         products={{
//           catalogEntryView: mockApi.catalogEntryView,
//           breadCrumbTrailEntryView: mockApi.breadCrumbTrailEntryView,
//           facetView: mockApi.facetView,
//         }}
//         fetchProductsSuccess={jest.fn()}
//       />,
//     )
//     const filtersNode = await screen.findByTestId('filters')
//     mockApi.facetView
//       .filter(item => item.name === 'ManufacturerName')
//       .forEach(({ name, entry }) => {
//         expect(filtersNode).toHaveTextContent(name)
//         entry.forEach(({ label, count }) => {
//           expect(filtersNode).toHaveTextContent(label)
//           expect(filtersNode).toHaveTextContent(count)
//         })
//       })
//   })
//   it('should filter the products after clicking a filter', async () => {
//     render(
//       <ProductListPage
//         products={{
//           catalogEntryView: mockApi.catalogEntryView,
//           breadCrumbTrailEntryView: mockApi.breadCrumbTrailEntryView,
//           facetView: mockApi.facetView,
//         }}
//         fetchProductsSuccess={jest.fn()}
//       />,
//     )
//     const filtersParentNode = await screen.findByTestId(
//       'clickable_filters_wrapper',
//     )
//     const filterElement = await waitForElement(
//       () => filtersParentNode.querySelectorAll('span')[0],
//     )
//
//     await fireEvent.click(filterElement)
//     expect(axiosMock.get).toHaveBeenCalled()
//     const products = await screen.findAllByTestId('product')
//     setTimeout(() => {
//       expect(products.length).toBe(2)
//     }, 1000)
//   })
// })
