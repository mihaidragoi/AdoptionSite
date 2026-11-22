export type PetData = {
    id: string
    name: string
    birthDate: string | null
    description: string
    imageUrl: string | null
}

export type PetMedia = {
    url: string
    type: string
    isCover: boolean
}

export type PetDetails = {
    id: string
    name: string
    type: string
    breed: string | null
    sex: string
    size: string
    birthDate: string | null
    shelterDate: string
    description: string
    isNeutered: string
    isVaccinated: string
    media: PetMedia[]
}