import dayjs from 'dayjs'
import { setTextContent, truncateText } from '../utils'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
//handle render Data
export function handleData(postList: any) {
  if (!Array.isArray(postList)) return

  const ulElement = document.getElementById('postsList')
  if (!ulElement) return

  //clear current li
  ulElement.textContent = ''
  postList.forEach((post: any) => {
    const newLiElement: HTMLElement = createNewElement(post)
    ulElement?.appendChild(newLiElement)
  })
}

export function createNewElement(post: any): any {
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

  //handle Click to details-page
  const theFirstLiElement = liElement?.firstElementChild
  theFirstLiElement &&
    theFirstLiElement.addEventListener('click', (e: any) => {
      console.log('cao target', e.target)
      //solution 2 check parent has children?
      const menu = liElement.querySelector('[data-id="menu"]')
      console.log('menu', menu)
      if (menu && menu.contains(e.target)) return

      window.location.assign(`/post-detail.html?id=${post.id}`)
    })
  //handle click to children
  const editButton = liElement.querySelector('[data-id="edit"]')
  if (editButton) {
    editButton.addEventListener('click', () => {
      // e.stopPropagation() solution 1: should limit use
      window.location.assign(`/add-edit-post.html?id=${post.id}`)
    })
  }
  //return
  return liElement
}
