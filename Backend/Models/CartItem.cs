public class CartItem{
    public int Id {get; set;}
    public int UserId {get; set;}
    public User User {get; set;} = null!;
    public int PetId {get;set;}
    public Pet Pet {get;set;} = null!;
    public DateTime AddedAt {get;set;} = DateTime.UtcNow;
}