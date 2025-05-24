import axios from 'axios'

const API = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export const fetchPost = async (id: number) => {
  try {
    const response = await API.get(`/posts/${id}`)
    return response.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Failed to fetch post with ID ${id}:`, error.message)
    } else {
      console.error(`Failed to fetch post with ID ${id}:`, error)
    }
    throw new Error(`Unable to fetch post with ID ${id}`)
  }
}

export const updatePost = async (id: number, data: { title: string; body: string }) => {
  try {
    const response = await API.put(`/posts/${id}`, data)
    return response.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Failed to update post with ID ${id}:`, error.message)
    } else {
      console.error(`Failed to update post with ID ${id}:`, error)
    }
    throw new Error(`Unable to update post with ID ${id}`)
  }
}

export const deletePost = async (id: number) => {
  try {
    const response = await API.delete(`/posts/${id}`)
    return response.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Failed to delete post with ID ${id}:`, error.message)
    } else {
      console.error(`Failed to delete post with ID ${id}:`, error)
    }
    throw new Error(`Unable to delete post with ID ${id}`)
  }
}

export const fetchPosts = async () => {
  try {
    const response = await API.get('/posts?userId=1')
    return response.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to fetch posts:', error.message)
    } else {
      console.error('Failed to fetch posts:', error)
    }
    throw new Error('Unable to fetch posts')
  }
}

export const createPost = async (post: { title: string; body: string }) => {
  try {
    if (!post.title || !post.body) {
      throw new Error("Both title and body are required.")
    }

    const response = await API.post("/posts", {
      ...post,
      userId: 1,
    })

    return response.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to create post:", error.message)
    } else {
      console.error("Failed to create post:", error)
    }
    throw new Error("Unable to create post. Please try again later.")
  }
}
