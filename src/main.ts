import { getIconHome } from './utils/selector'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { PostAPI } from './api/postAPI'
import { handleData, handlePagination, initPagination, initSearch } from './models'
import { initURL } from './utils'

dayjs.extend(relativeTime)
;(async () => {
  try {
    //init params
    const queryParams: any = new URLSearchParams(window.location.href)
    //back Home
    handleBackHome()
    //init Params
    initPagination({
      elementId: 'postsPagination',
      defaultParams: queryParams,
      onchange: (page: any) => handleFilterChange('_page', page),
    })
    initSearch({
      elementId: 'searchInput',
      defaultParams: queryParams,
      onchange: (value: any) => handleFilterChange('title_like', value),
    })
    //but queryParams not exist
    //init default

    const { data, pagination } = await PostAPI.getAll(queryParams)
    console.log('data', data)
    handleData(data)
    handlePagination({
      elementId: 'postsPagination',
      pagination: pagination,
    })
  } catch (error) {
    console.error(error)
  }
})()

//handle Filter change
export async function handleFilterChange(filterName: string, filterValue: number | string) {
  try {
    const url: any = new URL(window.location.href)
    if (filterName === 'title_like') url.searchParams.set('_page', 1)
    url.searchParams.set(filterName, filterValue)

    history.pushState({}, '', url)

    //fetch APIs
    const { data, pagination } = await PostAPI.getAll(url.searchParams)
    handleData(data)
    handlePagination(pagination)
  } catch (error) {
    console.error('Failed to fetch post list', error)
  }
}

//handle back home
function handleBackHome() {
  const imgElement = getIconHome()
  if (!imgElement) return
  imgElement.addEventListener('click', (e: any) => {
    e.preventDefault()
    handleFilterChange('_page', 1)
  })
}
