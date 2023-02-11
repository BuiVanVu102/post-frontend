//handle Pagination
export function handlePagination({ elementId, pagination }: any) {
  const ulPagination: any = document.getElementById(elementId)
  if (!ulPagination) return

  if (!pagination || !ulPagination) return
  const { _page, _limit, _totalRows } = pagination

  //calc maxPage
  const maxTotalRows = Math.ceil(_totalRows / _limit)

  ulPagination.dataset.page = _page
  ulPagination.dataset.maxPage = maxTotalRows

  _page <= 1
    ? ulPagination.firstElementChild?.classList.add('disabled')
    : ulPagination.firstElementChild?.classList.remove('disabled')
  _page >= maxTotalRows
    ? ulPagination.lastElementChild.classList.add('disabled')
    : ulPagination.lastElementChild.classList.remove('disabled')
}

//initPagination
export function initPagination({ elementId, defaultParams, onchange }: any) {
  //bind click event for prev/next link
  const ulPagination: any = document.getElementById(elementId)
  if (!ulPagination) return

  const prevLink = ulPagination.firstElementChild?.firstElementChild

  if (prevLink)
    prevLink.addEventListener('click', (e: any) => {
      e.preventDefault()
      const page: any = ulPagination.dataset.page || 1
      if (page >= 2) onchange?.(page - 1)
    })
  const nextLink = ulPagination.lastElementChild?.lastElementChild
  if (nextLink)
    nextLink.addEventListener('click', (e: any) => {
      e.preventDefault()
      const page: any = ulPagination?.dataset.page || 1
      const maxPage: any = ulPagination?.dataset.maxPage
      if (page >= maxPage) return

      onchange(Number.parseInt(page) + 1)
    })
}
