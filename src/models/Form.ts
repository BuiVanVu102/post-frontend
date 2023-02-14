import * as yup from 'yup'
import { setBackgroundImage, setFieldValue, setTextContent } from '../utils'

export const handleOnChangeForm = ({ formId, defaultValue, onSubmit }: any) => {
  const form = document.getElementById(formId)
  if (!form) return

  handleForm(form, defaultValue)

  //get selector button
  const buttonElement: any = form.querySelector('[name="button"]')
  const disabledButton = () => {
    buttonElement.disable = true
    buttonElement.textContent = 'Saving....'
  }
  const unableButton = () => {
    buttonElement.disable = false
    buttonElement.textContent = 'Save'
  }
  //ngan chan js bang var flag
  let isSubmitting = false

  form.addEventListener('submit', async (event: any) => {
    event.preventDefault()
    //check submit
    if (isSubmitting) return
    const formValue: any = getFormValue(form)
    formValue.id = defaultValue.id

    disabledButton()
    isSubmitting = true
    //why do it, Because PROMISE value return truthy so must wait = solution using await
    const awaits = await validatePostForm(form, formValue)
    if (!awaits) return

    await onSubmit?.(formValue)

    unableButton()
    isSubmitting = false
  })
}

function handleForm(form: any, defaultValue: any) {
  setFieldValue(form, '[name="title"]', defaultValue?.title)
  setFieldValue(form, '[name="author"]', defaultValue?.author)
  setFieldValue(form, '[name="description"]', defaultValue?.description)

  //
  setFieldValue(form, '[name="imageUrl"]', defaultValue?.imageUrl)
  setBackgroundImage(document, '#postHeroImage', defaultValue?.imageUrl)
}

function getFormValue(form: any) {
  let valueForm: any = {}
  //solution 1: query each input and add to values object
  // ;['title', 'author', 'description', 'imageUrl'].forEach((name: any) => {
  //   const filed = form.querySelector(`[name="${name}"]`)
  //   if (filed) valueForm[name] = filed
  // })

  //solution 2: using fromData
  const data: any = new FormData(form)
  for (const [key, value] of data) {
    valueForm[key] = value
  }
  return valueForm
}
//validate form
function getPostSchema() {
  return yup.object({
    title: yup.string().required('Please enter title'),
    author: yup
      .string()
      .required('Please enter author')
      .test(
        'at-least-two-works',
        'Please enter at least two words',
        (value) => value.split(' ').filter((x: any) => !!x && x.length >= 3).length >= 2
      ),
    description: yup.string(),
  })
}

function setFieldError(form: any, name: any, error: any) {
  const element: any = form.querySelector(`[name="${name}"]`)
  if (element) {
    element.setCustomValidity(error)
    setTextContent(element.parentElement, '.invalid-feedback', error)
  }
}

async function validatePostForm(form: any, formValue: any) {
  try {
    //reset , pervious errors
    ;['title', 'author'].forEach((name: any) => setFieldError(form, name, ''))
    const schema = getPostSchema()
    await schema.validate(formValue, { abortEarly: false })
  } catch (error: any) {
    let errorLog: any = {}
    console.log(error)
    if (error.name === 'validationError' || Array.isArray(error.inner)) {
      for (const validationError of error.inner) {
        const name = validationError.path
        console.log(errorLog)
        if (errorLog[name]) continue
        setFieldError(form, name, validationError.message)
        errorLog[name] = true
      }
    }
  }

  const isValid = form.checkValidity()
  if (!isValid) form.classList.add('was-validated')
  return isValid
}

// function getTitleError(form: any) {
//   const titleElement = form.querySelector('[name="title"]')
//   if (!titleElement) return

//   if (titleElement.validity.valueMissing) {
//     return 'Please enter the title'
//   }
//   //logic more
//   if (titleElement.value.split(' ').filter((x: any) => !!x && x.length >= 3).length < 2) {
//     return 'PLease enter at least two words of 3 characters'
//   }
//   return ''
// }
