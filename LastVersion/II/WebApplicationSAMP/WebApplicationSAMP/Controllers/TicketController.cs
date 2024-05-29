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
        return Ok(await _context.Tickets.Include(t => t.User).ToListAsync());
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
