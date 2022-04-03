type T_Rating = 1 | 2 | 3 | 4 | 5

export type T_DoubanMovie = {
    name: string
    rating: number
    img?: string
    sid: string
    year: number
    intro?: string
    director?: string[]
    writer?: string[]
    actor?: string[]
    genre?: string[]
    site?: string
    country: string[]
    language?: string[]
    screen?: string[]
    duration?: number
    subname?: string[]
    imdb?: string
    my_rating: T_Rating
}

