using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationSAMP.Models;

namespace WebApplicationSAMP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FactionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FactionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Factions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Faction>>> GetFactions()
        {
            return await _context.Factions.ToListAsync();
        }

        // GET: api/Factions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Faction>> GetFaction(int id)
        {
            var faction = await _context.Factions.FindAsync(id);

            if (faction == null)
            {
                return NotFound();
            }

            return faction;
        }

        // PUT: api/Factions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFaction(int id, Faction faction)
        {
            if (id != faction.FactionId)
            {
                return BadRequest();
            }

            _context.Entry(faction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FactionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Factions
        [HttpPost]
        public async Task<ActionResult<Faction>> PostFaction(Faction faction)
        {
            _context.Factions.Add(faction);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFaction", new { id = faction.FactionId }, faction);
        }

        // DELETE: api/Factions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFaction(int id)
        {
            var faction = await _context.Factions.FindAsync(id);
            if (faction == null)
            {
                return NotFound();
            }

            _context.Factions.Remove(faction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FactionExists(int id)
        {
            return _context.Factions.Any(e => e.FactionId == id);
        }
    }
}
