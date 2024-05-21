namespace WebApplication1.Models
{
    public class Tickets
    {
        public int TicketId { get; set; }
        public int UserId { get; set; }
        public  DateTime CreatedAt { get; set; }
        public string Message { get; set; }
    }
}
