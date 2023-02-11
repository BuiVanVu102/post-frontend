import { debounce } from 'lodash-es'

//handle Search
export function initSearch({ elementId, defaultParams, onchange }: any) {
  const searchInput: any = document.getElementById(elementId)
  if (!searchInput) return
  if (defaultParams && defaultParams.get('title_like')) {
    searchInput.value = defaultParams.get('title_like')
  }
  const debounceSearch = debounce((event) => {
    onchange?.(event.target.value)
  }, 500)

  searchInput.addEventListener('input', debounceSearch)
}
