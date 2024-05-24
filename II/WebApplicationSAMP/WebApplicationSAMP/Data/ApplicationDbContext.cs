using Microsoft.EntityFrameworkCore;
using WebApplicationSAMP.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Faction> Factions { get; set; }
    public DbSet<Clan> Clans { get; set; }
    public DbSet<Ticket> Tickets { get; set; }
    public DbSet<Complaint> Complaints { get; set; }
}
