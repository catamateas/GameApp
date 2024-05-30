using Microsoft.EntityFrameworkCore;
using WebApplicationSAMP.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Faction> Factions { get; set; }
    public DbSet<Clan> Clans { get; set; }
    public DbSet<Ticket> Tickets { get; set; }
    public DbSet<UserClan> UserClans { get; set; } 

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasOne(u => u.Faction)
            .WithMany(f => f.Users)
            .HasForeignKey(u => u.FactionId);

        modelBuilder.Entity<UserClan>()
            .HasKey(uc => new { uc.UserId, uc.ClanId });

        modelBuilder.Entity<UserClan>()
            .HasOne(uc => uc.User)
            .WithMany(u => u.UserClans)
            .HasForeignKey(uc => uc.UserId);

        modelBuilder.Entity<UserClan>()
            .HasOne(uc => uc.Clan)
            .WithMany(c => c.UserClans)
            .HasForeignKey(uc => uc.ClanId);
    }
}
