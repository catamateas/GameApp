using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using WebApplicationSAMP.Models;

[ApiController]
[Route("api/[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AuthenticationController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (await _context.Users.AnyAsync(u => u.UserName == request.Username))
        {
            return BadRequest("Username already exists.");
        }

        var faction = await _context.Factions.FirstOrDefaultAsync(f => f.FactionId == request.FactionId);
        if (faction == null)
        {
            return NotFound("Faction not found.");
        }

        if (request.Level < faction.RequiredLevel)
        {
            return BadRequest("User level is too low to join this faction.");
        }

        var user = new User
        {
            UserName = request.Username,
            Password = request.Password,
            Email = request.Email,
            Level = request.Level,
            FactionId = request.FactionId
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("User registered successfully.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _context.Users
            .Include(u => u.Faction) // Include faction details
            .FirstOrDefaultAsync(u => u.UserName == request.Username && u.Password == request.Password);

        if (user == null)
        {
            return Unauthorized("Invalid username or password.");
        }

        var userDto = new UserDTO
        {
            UserId = user.UserId,
            UserName = user.UserName,
            Email = user.Email,
            Level = user.Level,
            FactionId = user.FactionId
        };

        return Ok(userDto);
    }
}

public class RegisterRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    public int Level { get; set; }
    public int FactionId { get; set; }
}

public class LoginRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
}
