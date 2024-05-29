namespace WebApplicationSAMP.Models
{
    public class Ticket
    {
        public int TicketId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Message { get; set; }

        public User User { get; set; }
    }
}
