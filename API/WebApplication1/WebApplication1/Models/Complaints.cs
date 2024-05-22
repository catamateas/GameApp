using System;

namespace WebApplication1.Models
{
    public class Complaints
    {
        public int ComplaintId { get; set; }
        public int UserId { get; set; }
        public string CreatedAt { get; set; }
        public string Message { get; set; }


    }
}
