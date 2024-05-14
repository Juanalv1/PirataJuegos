import { categoryModel } from "@/models/categories/categoryModel"


export class categoryController {
  static async createCategory(req){
    if (!req.body && !req.body.category) throw new Error("no category provided")
    try {
      const createdCategory = await categoryController.createCategory(req.body.category)
      return createdCategory
    } catch (error) {
      throw new Error(error.message)
    }
  }
  static async getPostsFromCategoryid(req) {
    if (req.params && req.params.id) {
      try {
        const posts = await categoryModel.getPostsFromCategoryId(req.params.id)
        return posts
      } catch (error) {
        throw new Error(error.message)
      }
    } else throw new Error("No id provided")
  }

  static async getPostsFromCategoryName(name) {
    if (!name) {
      throw new Error("No se proporcionó un nombre de categoría.");
    }
  
    try {
      // Recuperar un máximo de 8 publicaciones de la categoría dada
      const posts = await categoryModel.getPostsFromCategoryName(name);
      return posts;
    } catch (error) {
      throw new Error(`Error al obtener publicaciones de la categoría "${name}": ${error.message}`);
    }
  }
  

  static async getCategoriesFromPostId(id) {
    if (id) {
      try {
        const categories = await categoryModel.getCategoriesFromPostId(id)
        return categories
      } catch (error) {
        throw new Error(error.message)
      }
    } else throw new Error("no Id provided")

  }

  static async get(req) {
    try {
      if (req.params && req.params.id) {
        const category = await categoryModel.getById(req.params.id)
        return category
      } else {
        const categories = await categoryModel.getAll()
        return categories
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async updatePostCategories(postId, categories) {
    try {
      const updated = await categoryModel.updatePostCategories(postId, categories)
      return updated
    } catch (error) {
      console.error(error.message)
      throw new error(error.message)
    }
  }
}