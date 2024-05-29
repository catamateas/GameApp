using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationSAMP.Models;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UserController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        return Ok(await _context.Users.Include(u => u.Faction).ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _context.Users
            .Include(u => u.Faction)
            .FirstOrDefaultAsync(u => u.UserId == id);

        if (user == null)
        {
            return NotFound();
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


    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] UserDTO userDto)
    {
        var faction = await _context.Factions.FirstOrDefaultAsync(f => f.FactionId == userDto.FactionId);
        if (faction == null)
        {
            return NotFound("Faction not found.");
        }

        if (userDto.Level < faction.RequiredLevel)
        {
            return BadRequest("User level is too low to join this faction.");
        }

        var user = new User
        {
            UserName = userDto.UserName,
            Email = userDto.Email,
            Password = userDto.Password,
            Level = userDto.Level,
            FactionId = userDto.FactionId
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok(user);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UserDTO userDto)
    {
        var existingUser = await _context.Users.FindAsync(id);
        if (existingUser == null)
        {
            return NotFound();
        }

        existingUser.UserName = userDto.UserName;
        existingUser.Email = userDto.Email;
        existingUser.Password = userDto.Password;
        existingUser.Level = userDto.Level;
        existingUser.FactionId = userDto.FactionId;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
