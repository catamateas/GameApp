namespace WebApplicationSAMP.Models
{
    public class UserClan
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int ClanId { get; set; }
        public Clan Clan { get; set; }
    }
}
