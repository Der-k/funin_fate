export interface SearchDocument {
    id: string

    type:
        | "business"
        | "event"
        | "article"
        | "page"
        | "guide"

    title: string

    description: string

    url: string

    keywords: string[]

    tags?: string[]

    category?: string

    location?: string
}