import { postModel } from "@/models/posts/postModel";
import { categoryController } from "../categories/categoriesController";

export class postController {
  static async create(req, res){
    const data = await req.json()
    try {
      const newPost = await postModel.create(data)
      return newPost
    } catch (error) {
      throw new Error(error)
    }
  }

  static async get(req){
    const url = new URL(req.url)

    if (url.searchParams.has("title") || url.searchParams.has("categories") || url.searchParams.has("id") || url.searchParams.has("related")) {
      const id = url.searchParams.get("id")
      const title = url.searchParams.get("title")
      const related = url.searchParams.get("related")
      const categories = url.searchParams.get("categories")
      if (id || title || categories || related) {
        if (id) {
          try {
            const post = await postModel.getById(id)
            return post
          } catch (error) {
            throw new Error(error)
          }
        } else if ( title) {
          try {
            const post = await postModel.getByTitle(title)
            return post
          } catch (error) {
            throw new Error(error)
          }
        }
        else if (categories) {
          const catList = categories.split(',')
          if (catList.length == 1) {
            try {
              const posts = await categoryController.getPostsFromCategoryName(catList[0])
              return posts
            } catch (error) {
              throw new Error(error)
            }
          }
          try {
            let posts = []
            for (const category of catList) {
              const posts = await categoryController.getPostsFromCategoryName(category)
              posts.push(...posts)
            }
            if (posts.length >= 1) {
              return {...posts}
            } else return 

          } catch (error) {
            console.error(error.message)
            throw new Error(error)
          
          }
        } else if (related) {
          const relatedReplaced = related.replace(/-/g, " ")
          try {
            const posts = await postModel.getRelatedPostsFromPostId(relatedReplaced)
            return posts
          } catch (error) {
            throw new Error(error)
          }
        }
    }
    }
    else {
      try {
        const posts = await postModel.getAll()
        return posts
      } catch (error) {
        console.error(error.message)
        throw new Error(error)
      }
    }
    
  }

  static async getById(id){
    try {
      const post = await postModel.getById(id)
      return post
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async getByTitle(title){
    try {
      const post = await postModel.getByTitle(title)
      return post
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async updatePost(req){
    const data = await req.json()
    if (data) {
      try {
        const updatedPost = await postModel.updateById(data.post_id, data)
        return updatedPost
      } catch (error) {
        throw new Error(error)
      }
    } else throw new Error("invalid Id or data")
  }

  static async deletePostById(id){
    if (id) {
      try {
        const deletedPost = await postModel.deletePostById(id)
        return deletedPost
      } catch (error) {
          throw new Error(error.message)
      }
    } else throw new Error("invalid Id")
  }
}
