namespace WebApplicationSAMP.Models
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int Level { get; set; }
        public int FactionId { get; set; }
    }
}
