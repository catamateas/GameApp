using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationSAMP.Models;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class TicketController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TicketController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetTickets()
    {
        var tickets = await _context.Tickets
            .Include(t => t.User)
            .Select(t => new
            {
                t.TicketId,
                t.UserId,
                t.User.UserName,
                t.CreatedAt,
                t.Message
            })
            .ToListAsync();

        return Ok(tickets);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetTicketsByUserId(int userId)
    {
        var tickets = await _context.Tickets
            .Where(t => t.UserId == userId)
            .Include(t => t.User)
            .ToListAsync();

        return Ok(tickets);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTicket([FromBody] TicketDTO ticketDto)
    {
        if (ticketDto == null)
        {
            return BadRequest("Ticket data is null");
        }

        var ticket = new Ticket
        {
            Message = ticketDto.Message,
            UserId = ticketDto.UserId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Tickets.Add(ticket);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Ticket created successfully", ticket });
    }
}
