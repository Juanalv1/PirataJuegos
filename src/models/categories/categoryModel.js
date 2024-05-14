import prisma from "@/libs/db/prisma";
import { categoryController } from "@/controllers/categories/categoriesController";
import { languagesController } from "@/controllers/languages/languagesController";
import { data } from "autoprefixer";

export class categoryModel {
  static async createCategory(category){
    try {
      const newCategory = await prisma.categories.create({
        data: {
          category_name: category
        }
      })
      return newCategory
    } catch (error) {
      throw new Error(error.mesaage)
    }
  }

  static async getPostsFromCategoryId(id) {
    try {
        // Consulta única para obtener los posts con categorías y lenguajes
        const posts = await prisma.posts.findMany({
            where: {
                posts_categories: {
                    some: {
                        category_id: id
                    }
                }
            },
            include: {
                posts_categories: true,
                posts_languages: true
            }
        });

        // Procesamiento paralelo de categorías y lenguajes para cada post
        const postsToSend = await Promise.all(posts.map(async (post) => {
            const categories = await categoryController.getCategoriesFromPostId(post.post_id);
            const languages = await languagesController.getLanguagesFromPostId(post.post_id);
            if (categories ||languages) {
              return {
                ...post,
                categories,
                languages
            };
            }else return undefined

        }));
        return postsToSend;
    } catch (error) {
        console.error(error.message);
        throw new Error('Error al obtener los posts de la categoría');
    }
}


static async getPostsFromCategoryName(name) {
  try {
    // Obtener el ID de la categoría por su nombre
    const categoryId = await prisma.categories.findFirst({
      where: {
        category_name: name
      }
    });

    if (!categoryId) {
      throw new Error(`No se encontró ninguna categoría con el nombre "${name}".`);
    }

    // Obtener las publicaciones asociadas a la categoría por su ID
    const posts = await this.getPostsFromCategoryId(categoryId.category_id);
    
    return posts;
  } catch (error) {
    throw new Error(`Error al obtener las publicaciones de la categoría "${name}": ${error.message}`);
  }
}


  static async getCategoriesFromPostId(id) {
    
    try {
        // Consulta única para obtener las categorías del post
        const categories = await prisma.categories.findMany({
            where: {
                posts_categories: {
                    some: {
                        post_id: Number(id)
                    }
                }
            }
        });
        return categories;
    } catch (error) {
        throw new Error('Error al obtener las categorías del post: ' + error.message);
    }
}


  static async getAll () {
    try {
      const categories = await prisma.categories.findMany()
      return categories
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async getById(id) {
    try {
      const category = await prisma.categories.findFirst({
        where: {
          category_id : id
        }
      })
      return category
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async updatePostCategories(postId, categories) {
    // delete current categories_post relation
    try {
      await prisma.posts_categories.deleteMany({
        where: {
          post_id: Number(postId)
        }
      })

    // Create new category_posts relation for each category provided
      for (const category of categories) {
        await prisma.posts_categories.create({
          data: {
            post_id: Number(postId),
            category_id: Number(category.category_id)
          }
        })
      }
      return true
    } catch (error) {
      throw new Error(error.message)
    }
  }

}