import prisma from '@/libs/db/prisma'
import { languagesController } from '@/controllers/languages/languagesController';
import { categoryController } from '@/controllers/categories/categoriesController';
import { version } from 'react';

export class postModel {

  static async create(post) {
    const inputTimestamp = new Date();
    const formattedTimestamp = inputTimestamp.toISOString()
    const formattedImages = `{${post.images.join(",")}}`;
    const formattedRequirements = JSON.stringify(post.requirements);
    
    try {
      const newPost = await prisma.posts.create({
        data: {
          post_title: post.title,
          post_text : post.text,
          img_url: post.images,
          size: post.size,
          version: post.version,
          developer: post.developer,
          download_link : post.dlink,
          date: formattedTimestamp,
          video_id: post.videoId,
          rating: Number(post.rating),
          created_at: formattedTimestamp,
          requirements: post.requirements
        }
      })
      if (newPost) {
        for (const category of post.categories) {
          await prisma.posts_categories.create({
            data : {
              category_id : Number(category),
              post_id: newPost.post_id
        }})
        }
        for (const language of post.languages) {
          await prisma.posts_languages.create({
            data : {
              lang_id : Number(language),
              post_id: newPost.post_id
        }})
        }
      }
      return newPost
    } catch (error) {
      throw new Error('Error al crear el post: ' + error.message);
    }
  }

  static async getAll() {
    try {
        const posts = await prisma.posts.findMany({
          orderBy: {
            post_id: 'desc'
          }
        });
        const postsToSend = await Promise.all(posts.map(async (post) => {
            const [categories, languages] = await Promise.all([
                categoryController.getCategoriesFromPostId(post.post_id),
                languagesController.getLanguagesFromPostId(post.post_id)
            ]);
            return {
                ...post,
                categories,
                languages
            };
        }));
        return postsToSend;
    } catch (error) {
        throw new Error('Error al obtener los posts' + error.message);
    }
}
  static async getByCategory(category) {
    try {
      const posts = await prisma.posts.findMany({
        where: {
          categories: {
            has: {
              category
            }
          }
        }
      })
      return posts
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async getRelatedPostsFromPostId(id) {
    try {
      // Obtener categorías relacionadas al post
      const categories = await categoryController.getCategoriesFromPostId(id);
      
      // Obtener todas las publicaciones relacionadas a esas categorías (excluyendo la actual)
      const relatedPosts = await Promise.all(
        categories.map(async (category) => {
          const posts = await categoryController.getPostsFromCategoryName(category.category_name);
          return posts.filter((post) => post.post_id !== id);
        })
      );
  
      // Unir todas las publicaciones relacionadas en una sola lista
      const postsToSend = relatedPosts.flat();
      
      return postsToSend;
    } catch (error) {
      throw new Error('Error al obtener las publicaciones relacionadas: ' + error.message);
    }
  }
  
  
  static async getById(id) {
    try {
      const post = await prisma.posts.findUnique({
        where: {
          post_id : Number(id)
        }
      })
      const categories = await categoryController.getCategoriesFromPostId(post.post_id)
      const languages = await languagesController.getLanguagesFromPostId(post.post_id)
      const postWithCategoriesAndLanguages = {
        ...post,
        categories,
        languages
      };
      if(!post) throw new Error("No se ha encontrado el post")
      return postWithCategoriesAndLanguages
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getByTitle(title) {
    try {
      const postPromise = prisma.posts.findFirst({
        where: {
          post_title: title
        }
      });
  
      const post = await postPromise;
  
      if (!post) {
        throw new Error('No se encontró ningún post con el título especificado.');
      }

      const postId = post.post_id;
  
      const [categories, languages] = await Promise.all([
        categoryController.getCategoriesFromPostId(postId),
        languagesController.getLanguagesFromPostId(postId)
      ]);
  
      const postWithCategoriesAndLanguages = {
        ...post,
        categories,
        languages
      };
  
      return postWithCategoriesAndLanguages;
    } catch (error) {
      throw new Error('Error al obtener el post: ' + error.message);
    }
  }
  
  

  static async updateById(id, data) {
    try {
        const updatedPost = await prisma.posts.update({
          where: {
            post_id : Number(id)
          },
          data: {
            post_title: data.post_title,
            post_text: data.post_text,
            size: data.size,
            version: data.version,
            developer: data.developer,
            download_link: data.download_link,
            date: data.date,
            video_id: data.video_id,
            requirements: data.requirements,
            img_url: data.img_url,
          }
        })
        const updated = await categoryController.updatePostCategories(data.post_id, data.categories)
        return updatedPost
      }
        catch (error) {
        console.error(error.message)
        throw new Error('Error al actualizar el post' + error.message);
    }
  }
  
  static async deletePostById(id) {
    try {
        const deletedPost = await prisma.posts.delete({
          where: {
            post_id : Number(id)
          }
        })
        return deletedPost
    } catch (error) {
        console.error(error)
        throw new Error('Error al borrar el post' + error.message);
    }
  }
}