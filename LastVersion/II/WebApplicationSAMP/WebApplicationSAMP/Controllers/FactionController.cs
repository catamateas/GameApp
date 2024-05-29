using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationSAMP.Models;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class FactionController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public FactionController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetFactions()
    {
        return Ok(await _context.Factions.ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> CreateFaction([FromBody] FactionDTO factionDto)
    {
        var faction = new Faction
        {
            FactionName = factionDto.FactionName,
            RequiredLevel = factionDto.RequiredLevel
        };

        _context.Factions.Add(faction);
        await _context.SaveChangesAsync();  
        return Ok(faction);
    }

   [HttpPut("{id}")]
public async Task<IActionResult> UpdateFaction(int id, [FromBody] FactionDTO factionDto)
{
    var existingFaction = await _context.Factions.FindAsync(id);
    if (existingFaction == null)
    {
        return NotFound();
    }

    existingFaction.FactionName = factionDto.FactionName;
    existingFaction.RequiredLevel = factionDto.RequiredLevel;

    await _context.SaveChangesAsync();
    return NoContent();
}

}
