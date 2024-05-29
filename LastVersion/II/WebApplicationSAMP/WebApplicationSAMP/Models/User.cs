namespace WebApplicationSAMP.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int Level { get; set; }
        public int FactionId { get; set; }
        public Faction Faction { get; set; }
        public ICollection<UserClan> UserClans { get; set; } // Adăugăm colecția pentru UserClans
    }
}
