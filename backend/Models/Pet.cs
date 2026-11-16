public enum PetType { Dog, Cat, Rabbit, Bird, Other }

public enum PetSex { Unknown, Male, Female }

public enum PetSize { Small, Medium, Large }

public enum MediaType { Image, Video }

public enum HealthStatus { Unknown, No, Yes }

public class Pet
{
    public int Id { get; set; }

    public string Name { get; set; } = "";
    public PetType Type { get; set; }
    public string? Breed { get; set; }
    public PetSex Sex { get; set; }
    public PetSize Size { get; set; }

    public DateOnly? BirthDate { get; set; }
    public DateOnly ShelterDate { get; set; }
    public DateOnly? AdoptedDate { get; set; }

    public string Description { get; set; } = "";

    public HealthStatus IsNeutered { get; set; }
    public HealthStatus IsVaccinated { get; set; }

    public List<PetMedia> Media { get; set; } = [];

    public bool IsAdopted => AdoptedDate is not null;
}

public class PetMedia
{
    public int Id { get; set; }
    public int PetId { get; set; }
    public Pet Pet { get; set; } = null!;

    public string Url { get; set; } = "";
    public MediaType Type { get; set; }
    public bool IsCover { get; set; }
    public int SortOrder { get; set; }
}
