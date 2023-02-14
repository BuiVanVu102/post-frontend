import 'bootstrap/dist/css/bootstrap.css'
import { Modal } from 'bootstrap'

export const registerLightbox = ({ modalId, imgSelector, prevSelector, nextSelector }: any) => {
  const modalElement: any = document.getElementById(modalId)
  if (!modalElement) return
  if (modalElement.dataset.modelExist) return

  const imgElement: any = document.querySelector(imgSelector)
  const prevButton: any = document.querySelector(prevSelector)
  const nextButton: any = document.querySelector(nextSelector)

  if (!imgElement || !prevButton || !nextButton) return

  /**
   * @todo:
   * 1. handle click for all imgs -> even delegation
   * 2. img click  => find all imgs with the same album / gallery
   * 3. determine index of selected img
   * 4. show modal with selected img
   * 5. handle prev / next click
   */
  //lightbox vars
  let imgList: any = []
  let currentIndex: number = 0
  function showImgAtIndex(index: number) {
    imgElement.src = imgList[index].src
  }

  document.addEventListener('click', (e: any) => {
    const { target } = e
    if (target.tagName !== 'IMG' || !target.dataset.album) return
    //img with album
    imgList = document.querySelectorAll(`img[data-album="${target.dataset.album}"]`)
    currentIndex = [...imgList].findIndex((index: number) => index === target)

    //show img up to modal at index
    showImgAtIndex(currentIndex)
    //show modal
    onShowModal(modalElement)
  })
  prevButton.addEventListener('click', () => {
    //show prev img of current album
    //update again index
    currentIndex = (currentIndex - 1 + imgList.length) % imgList.length
    showImgAtIndex(currentIndex)
  })

  nextButton.addEventListener('click', () => {
    //show next img of current album
    currentIndex = (currentIndex + 1) % imgList.length
    showImgAtIndex(currentIndex)
  })

  modalElement.dataset.modelExist = true
}

function onShowModal(modalElement: any) {
  const modal = new Modal(modalElement, {
    keyboard: false,
  })
  if (modal) modal.show()
}
