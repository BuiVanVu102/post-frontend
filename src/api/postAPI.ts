import axiosClient from './axiosClient'

export class PostAPI {
  /**
   *  get All Posts
   * @param params
   * @returns
   */
  static getAll = (params: object): Promise<any> => {
    const url = '/posts'
    return axiosClient.get(url, { params })
  }
  /**
   * get Post with id
   * @param id
   * @returns
   */
  static getById = (id: number | string): Promise<any> => {
    const url = `/posts/${id}`
    return axiosClient.get(url)
  }
  /**
   * add Post
   * @param data
   * @returns
   */
  static add = (data: any): any => {
    const url = '/posts'
    return axiosClient.post(url, data)
  }
  /**
   * update post
   * @param data
   * @returns
   */
  static update = (data: any): any => {
    const url = `/posts/${data.id}`
    return axiosClient.patch(url, data)
  }
  /**
   * remove post
   * @param id
   * @returns
   */
  static remove = (id: number | string): any => {
    const url = `/posts/${id}`
    return axiosClient.delete(url)
  }
}
