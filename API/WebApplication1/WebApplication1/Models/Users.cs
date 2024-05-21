namespace WebApplication1.Models
{
    public class Users
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string ProfilePicture { get; set; }
        public int Level { get; set; }
        public int HoursPlayed { get; set; }
        public string PhoneNumber { get; set; }
        public int WarnCount { get; set; }
        public int FactionWarnCount { get; set; }

    }
}
