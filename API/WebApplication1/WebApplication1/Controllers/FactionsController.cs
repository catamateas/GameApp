using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using WebApplication1.Models;
namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FactionsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public FactionsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                          select FactionId, FactionName, MemberCount, RequiredLevel 
                          from dbo.Factions";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GameAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);

        }
        [HttpPost]
        public JsonResult Post(Users usr)
        {
            string query = @"
                          insert into dbo.Users
                           (UserName, PasswordHash, ProfilePicture, Level, HoursPlayed, PhoneNumber, WarnCount, FactionWarnCount)
                            values
                           (@UserName, @PasswordHash, @ProfilePicture, @Level, @HoursPlayed, @PhoneNumber, @WarnCount, @FactionWarnCount)                  
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GameAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserName", usr.UserName);
                    myCommand.Parameters.AddWithValue("@PasswordHash", usr.PasswordHash);
                    myCommand.Parameters.AddWithValue("@ProfilePicture", usr.ProfilePicture);
                    myCommand.Parameters.AddWithValue("@Level", usr.Level);
                    myCommand.Parameters.AddWithValue("@HoursPlayed", usr.HoursPlayed);
                    myCommand.Parameters.AddWithValue("@PhoneNumber", usr.PhoneNumber);
                    myCommand.Parameters.AddWithValue("@WarnCount", usr.WarnCount);
                    myCommand.Parameters.AddWithValue("@FactionWarnCount", usr.FactionWarnCount);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");

        }
        [HttpPut]
        public JsonResult Put(Users usr)
        {
            string query = @"
                          update dbo.Users
                          set UserName=@UserName,
                              PasswordHash=@PasswordHash,
                              ProfilePicture=@ProfilePicture,
                              Level=@Level,
                              HoursPlayed=@HoursPlayed,
                              PhoneNumber=@PhoneNumber,
                              WarnCount=@WarnCount,
                              FactionWarnCount=@FactionWarnCount
                          where UserId=@UserId
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GameAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@UserName", usr.UserName);
                    myCommand.Parameters.AddWithValue("@PasswordHash", usr.PasswordHash);
                    myCommand.Parameters.AddWithValue("@ProfilePicture", usr.ProfilePicture);
                    myCommand.Parameters.AddWithValue("@Level", usr.Level);
                    myCommand.Parameters.AddWithValue("@HoursPlayed", usr.HoursPlayed);
                    myCommand.Parameters.AddWithValue("@PhoneNumber", usr.PhoneNumber);
                    myCommand.Parameters.AddWithValue("@WarnCount", usr.WarnCount);
                    myCommand.Parameters.AddWithValue("@FactionWarnCount", usr.FactionWarnCount);
                    myCommand.Parameters.AddWithValue("@UserId", usr.UserId);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully");

        }
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            string query = @"
                          delete from dbo.Users
                          where UserId = @UserId
                           ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GameAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");

        }

    }
}

