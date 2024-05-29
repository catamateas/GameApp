namespace WebApplicationSAMP.Models
{
    public class Faction
    {
        public int FactionId { get; set; }
        public string FactionName { get; set; }
        public int RequiredLevel { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
