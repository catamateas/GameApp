namespace WebApplicationSAMP.Models
{
    public class Clan
    {
        public int ClanId { get; set; }
        public string ClanName { get; set; }
        public string Description { get; set; }
        public ICollection<UserClan> UserClans { get; set; } // Adăugăm colecția pentru UserClans
    }
}
