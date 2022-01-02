export type TArticlesState = {
  categories: string[]
  articles: IArticleInList[]
  article: IEditArticle | null
}

export interface IArticle {
  title: string
  description: string
  textHTML: string
  categories: string[]
  previewImage: string
  isDraft: boolean
  isArchive: boolean
  createdAt: Date
}

export interface IArticleInList extends IArticle {
  _id: string
  views: number
}

export interface IEditArticle extends IArticle {
  _id: string
}

export enum CategoriesEnum {
  aboutCats = 'About cats',
  aboutDogs = 'About dogs',
  aboutFish = 'About fish',
  aboutSpiders = 'About spiders',
}
