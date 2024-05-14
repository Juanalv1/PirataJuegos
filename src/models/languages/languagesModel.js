import prisma from "@/libs/db/prisma";

export class languagesModel {
  static async getAllLanguages(){
    try {
      return await prisma.languages.findMany()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async getLanguagesFromPostId(id) {
    try {
        // Consulta única para obtener los idiomas del post
        const languages = await prisma.languages.findMany({
            where: {
                posts_languages: {
                    some: {
                        post_id: id
                    }
                }
            }
        });
        return languages;
    } catch (error) {
        throw new Error('Error al obtener los idiomas del post: ' + error.message);
    }
}

}