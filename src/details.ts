import dayjs from 'dayjs'
import { PostAPI } from './api/postAPI'
import { setTextContent } from './utils'
;(async () => {
  /**
   * @todo :
   * get post id from URL
   * fetch post detail API
   * render post details
   */
  try {
    const searchParams: any = new URLSearchParams(window.location.search)
    const postId = searchParams.get('id')
    if (!postId) {
      console.error('Post Not Found')
      return
    }
    const post: any = await PostAPI.getById(postId)
    handleRenderPostDetail(post)
  } catch (error) {
    console.error('Failed to fetch post detail', error)
  }
})()

function handleRenderPostDetail(post: any) {
  if (!post) return
  /**
   * @todo
   * render title
   * render description
   * render author
   * render updateAt
   */
  setTextContent(document, '#postDetailTile', post.title)
  setTextContent(document, '#postDetailDescription', post.description)
  setTextContent(document, '#postDetailAuthor', post.author)
  setTextContent(document, '#postDetailTimeSpan', dayjs(post.updateAt).format('- DD/MM/YYYY HH:mm'))
  // /   * render Hero image
  //  * render edit page link
  const heroImage: any = document.getElementById('postHeroImage')
  if (heroImage) {
    heroImage.style.backgroundImage = `url("${post.imageUrl}")`
  }
  heroImage?.addEventListener('error', () => {
    heroImage.src = 'https://via.placeholder.com/1360x400?text=Thumbnail'
  })

  const editPageLink: any = document.getElementById('goToEditPageLink')
  if (editPageLink) {
    editPageLink.href = `/add-edit-post.html?id=${post.id}`
    editPageLink.innerHTML = `<i class="fas fa-edit"></i> Edit Post`
  }
}
