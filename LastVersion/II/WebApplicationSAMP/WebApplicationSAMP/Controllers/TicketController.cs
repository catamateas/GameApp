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
        var user = await _context.Users.FindAsync(ticketDto.UserId);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        var ticket = new Ticket
        {
            UserId = ticketDto.UserId,
            Message = ticketDto.Message
        };

        _context.Tickets.Add(ticket);
        await _context.SaveChangesAsync();
        return Ok(ticket);
    }
}
