using Microsoft.EntityFrameworkCore;

public class Db(DbContextOptions<Db> options) : DbContext(options)
{
    public DbSet<Pet> Pets => Set<Pet>();
    public DbSet<PetMedia> PetMedia => Set<PetMedia>();

    public DbSet<User> Users => Set<User>();

    public DbSet<Favourite> Favourites => Set<Favourite>();
    public DbSet<CartItem> CartItems => Set<CartItem>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<Pet>(e =>
        {
            e.Property(p => p.Name).HasMaxLength(100).IsRequired();
            e.Property(p => p.Breed).HasMaxLength(100);
            e.Property(p => p.Description).HasMaxLength(2000);

            e.Property(p => p.Type).HasConversion<string>().HasMaxLength(20);
            e.Property(p => p.Sex).HasConversion<string>().HasMaxLength(20);
            e.Property(p => p.Size).HasConversion<string>().HasMaxLength(20);
            e.Property(p => p.IsNeutered).HasConversion<string>().HasMaxLength(20);
            e.Property(p => p.IsVaccinated).HasConversion<string>().HasMaxLength(20);

            e.Ignore(p => p.IsAdopted);

            e.HasIndex(p => p.AdoptedDate);
            e.HasIndex(p => p.Type);

            e.HasMany(p => p.Media)
             .WithOne(m => m.Pet)
             .HasForeignKey(m => m.PetId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        b.Entity<PetMedia>(e =>
        {
            e.Property(m => m.Url).HasMaxLength(500).IsRequired();
            e.Property(m => m.Type).HasConversion<string>().HasMaxLength(20);
        });

        b.Entity<User>(e =>
        {
            e.Property(u => u.Email).HasMaxLength(254).IsRequired();
            e.Property(u => u.PhoneNumber).HasMaxLength(20).IsRequired();
            e.Property(u => u.PasswordHash).IsRequired();
            e.Property(u => u.FirstName).HasMaxLength(100);
            e.Property(u => u.LastName).HasMaxLength(100);
            e.Property(u => u.Role).HasConversion<string>().HasMaxLength(20);

            e.HasIndex(u => u.Email).IsUnique();
            e.HasIndex(u => u.PhoneNumber).IsUnique();
        });

        b.Entity<Favourite>(e =>
        {
            e.HasIndex( f => new {f.UserId, f.PetId}).IsUnique();

            e.HasOne( f=> f.User )
            .WithMany()
            .HasForeignKey( f => f.UserId)
            .OnDelete(DeleteBehavior.Cascade);

            e.HasOne( f=> f.Pet )
            .WithMany()
            .HasForeignKey( f => f.PetId)
            .OnDelete(DeleteBehavior.Cascade);
        });

        b.Entity<CartItem>(e =>
        {
            e.HasIndex( c => new {c.UserId, c.PetId}).IsUnique();

            e.HasOne( c=> c.User )
            .WithMany()
            .HasForeignKey( c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);

            e.HasOne( c=> c.Pet )
            .WithMany()
            .HasForeignKey( c => c.PetId)
            .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
