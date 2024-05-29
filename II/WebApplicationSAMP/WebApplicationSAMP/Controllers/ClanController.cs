using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationSAMP.Models;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ClanController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ClanController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetClans()
    {
        return Ok(await _context.Clans.ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> CreateClan([FromBody] ClanDTO clanDto)
    {
        var clan = new Clan
        {
            ClanName = clanDto.ClanName,
            Description = clanDto.Description
        };

        _context.Clans.Add(clan);
        await _context.SaveChangesAsync();
        return Ok(clan);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateClan(int id, [FromBody] ClanDTO clanDto)
    {
        var existingClan = await _context.Clans.FindAsync(id);
        if (existingClan == null)
        {
            return NotFound();
        }

        existingClan.ClanName = clanDto.ClanName;
        existingClan.Description = clanDto.Description;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteClan(int id)
    {
        var clan = await _context.Clans.FindAsync(id);
        if (clan == null)
        {
            return NotFound();
        }

        _context.Clans.Remove(clan);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
