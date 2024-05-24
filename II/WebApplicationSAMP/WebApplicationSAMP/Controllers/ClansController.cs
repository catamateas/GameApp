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
    public class ClansController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ClansController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Clans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Clan>>> GetClans()
        {
            return await _context.Clans.ToListAsync();
        }

        // GET: api/Clans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Clan>> GetClan(int id)
        {
            var clan = await _context.Clans.FindAsync(id);

            if (clan == null)
            {
                return NotFound();
            }

            return clan;
        }

        // PUT: api/Clans/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClan(int id, Clan clan)
        {
            if (id != clan.ClanId)
            {
                return BadRequest();
            }

            _context.Entry(clan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClanExists(id))
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

        // POST: api/Clans
        [HttpPost]
        public async Task<ActionResult<Clan>> PostClan(Clan clan)
        {
            _context.Clans.Add(clan);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClan", new { id = clan.ClanId }, clan);
        }

        // DELETE: api/Clans/5
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

        private bool ClanExists(int id)
        {
            return _context.Clans.Any(e => e.ClanId == id);
        }
    }
}
