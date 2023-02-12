import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { PostAPI } from './api/postAPI'
import { handleData, handlePagination, initPagination, initSearch } from './models'
import { getIconHome } from './utils/selector'

dayjs.extend(relativeTime)
;(async () => {
  try {
    //init params
    const queryParams: any = new URL(window.location.href)
    if (queryParams.search === '') {
      queryParams.searchParams.set('_page', 1)
      queryParams.searchParams.set('_limit', 6)
    }
    history.pushState({}, '', queryParams)
    //back Home
    handleBackHome()
    //init Params
    initPagination({
      elementId: 'postsPagination',
      defaultParams: queryParams.searchParams,
      onchange: (page: any) => handleFilterChange('_page', page),
    })
    initSearch({
      elementId: 'searchInput',
      defaultParams: queryParams.searchParams,
      onchange: (value: any) => handleFilterChange('title_like', value),
    })
    //but queryParams not exist
    //init default
    const { data, pagination } = await PostAPI.getAll(queryParams.searchParams)
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
  imgElement.addEventListener('click', async (e: any) => {
    e.preventDefault()
    const url: any = new URL(window.location.href)
    if (url.searchParams.get('title_like')) {
      url.searchParams.delete('title_like')
    }
    url.searchParams.set('_page', 1)
    url.searchParams.set('_limit', 6)
    const searchInput: any = document.getElementById('searchInput')
    if (!searchInput) return
    searchInput.value = ''
    history.pushState({}, '', url)
    const { data, pagination } = await PostAPI.getAll(url.searchParams)
    handleData(data)
    handlePagination({
      elementId: 'postsPagination',
      pagination: pagination,
    })
  })
}
