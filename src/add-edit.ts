import { PostAPI } from './api/postAPI'
import { handleOnChangeForm, ToastifyInfo } from './models'
;(async () => {
  try {
    const queryParams = new URLSearchParams(window.location.search)
    const post = queryParams.get('id')
    const defaultValue = post
      ? await PostAPI.getById(post)
      : {
          title: '',
          description: '',
          author: '',
          imageUrl: '',
        }
    handleOnChangeForm({
      formId: 'postForm',
      defaultValue: defaultValue,
      onSubmit: (formsValue: any) => handleSubmitForm(formsValue),
    })
  } catch (error) {
    console.error(error)
  }
})()

async function handleSubmitForm(value: any) {
  try {
    const newPostData = value.id ? await PostAPI.update(value) : await PostAPI.add(value)
    newPostData && ToastifyInfo.success('Successfully!!!!')
    setTimeout(() => {
      window.location.assign(`/post-detail.html?id=${newPostData.id}`)
    }, 2000)
  } catch (error: any) {
    console.error('failed when call API', error)
    ToastifyInfo.error(`Error: ${error.message}`)
  }
}
