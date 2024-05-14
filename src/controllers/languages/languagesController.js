import { languagesModel } from "@/models/languages/languagesModel";

export class languagesController {
  static async getLanguagesFromPostId(id) {
    if (id) {
      try {
        const languages = await languagesModel.getLanguagesFromPostId(id)
        return languages
      } catch (error) {
        throw new Error(error.message)
      }
    } else throw new Error("no Id provided")

  }

  static async getAllLanguages() {
    try {
      const languages = await languagesModel.getAllLanguages()
      return languages
    } catch (error) {
      throw new Error(error.message)
    }
  }
}