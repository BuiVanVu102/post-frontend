import { PostAPI } from './api/postAPI'
import { setTextContent, truncateText } from './utils'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
;(async () => {
  initPagination()
  initURL()
  try {
    //init params
    const queryParams = new URLSearchParams(window.location.search)
    console.log('queryParams', queryParams)
    //but queryParams not exist
    //init default

    const { data, pagination } = await PostAPI.getAll(queryParams)
    handleData(data)
  } catch (error) {
    console.error(error)
  }
})()

function handleData(postList: any) {
  if (!Array.isArray(postList) || postList.length === 0) return

  const ulElement = document.getElementById('postsList')
  if (!ulElement) return
  postList.forEach((post: any) => {
    const newLiElement: HTMLElement = createNewElement(post)
    ulElement?.appendChild(newLiElement)
  })
}

function createNewElement(post: any): any {
  if (!post) return
  //find template and clone

  const postTemplate: any = document.getElementById('postItemTemplate')
  if (!postTemplate) return
  const liElement = postTemplate.content.firstElementChild.cloneNode(true)
  if (!liElement) return
  //update field li
  setTextContent(liElement, '[data-id="title"]', post.title)
  setTextContent(liElement, '[data-id="description"]', truncateText(post.description, 100))
  setTextContent(liElement, '[data-id="author"]', post.author)
  setTextContent(liElement, '[data-id="timeSpan"]', dayjs(post.updatedAt).fromNow())
  const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]')
  if (thumbnailElement) {
    thumbnailElement.src = post.imageUrl
    thumbnailElement.addEventListener('error', () => {
      thumbnailElement.src = 'https://via.placeholder.com/1360x400?text=Thumbnail'
    })
  }
  //return
  return liElement
}
//initURL
function initURL() {
  const url: any = new URL(window.location.href)
  if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1)
  if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6)
  history.pushState({}, '', url)
}

//initPagination
function initPagination() {
  //bind click event for prev/next link
  const ulPagination: any = document.getElementById('postsPagination')
  if (!ulPagination) return
  const prevLink = ulPagination.firstElementChild?.firstElementChild
  console.log(prevLink)
  if (prevLink) prevLink.addEventListener('click', handleClickPrev)
  const nextLink = ulPagination.lastElementChild?.lastElementChild
  if (nextLink) nextLink.addEventListener('click', handleClickNext)
}

function handleClickPrev() {
  console.log('vao prev')
}

function handleClickNext() {
  console.log('vao next')
}
