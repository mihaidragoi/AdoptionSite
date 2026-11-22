export type PetMediaAdminData = {
    id: number
    url: string
    type: string
    isCover: boolean
    sortOrder: number
}

export type PetAdminData = {
    id: number
    name: string
    type: string
    breed: string | null
    sex: string
    size: string
    birthDate: string | null
    shelterDate: string
    adoptedDate: string | null
    description: string
    isNeutered: string
    isVaccinated: string
    isAdopted: boolean
    media: PetMediaAdminData[]
}