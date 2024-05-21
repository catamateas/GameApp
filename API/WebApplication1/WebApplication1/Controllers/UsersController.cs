using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                          select UserId, UserName, PasswordHash, ProfilePicture, Level,HoursPlayed,PhoneNumber,WarnCount,FactionWarnCount from dbo.Users";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserAppCon");
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
        public JsonResult Post(Users usr )
        {
            string query = @"
                          insert into dbo.Users
                          values(@Users)
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserId", usr.UserId);
                    myCommand.Parameters.AddWithValue("@UserName", usr.Username);
                    myCommand.Parameters.AddWithValue("@PasswordHash", usr.PasswordHash);
                    myCommand.Parameters.AddWithValue("@ProfilePicture", usr.ProfilePicture);
                    myCommand.Parameters.AddWithValue("@Level", usr.Level);
                    myCommand.Parameters.AddWithValue("@HoursPlayed", usr.HoursPlayed);
                    myCommand.Parameters.AddWithValue("@PhoneNumber", usr.PhomeNumber);
                    myCommand.Parameters.AddWithValue("@WarnCount", usr.WarnCount);
                    myCommand.Parameters.AddWithValue("@FactionWarnCount", usr.FactionWarnCount);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);

        }
        [HttpDelete]
        public JsonResult Delete(int id )
        {
            string query = @"
                          delete from dbo.Users
                          where UserId = @UserId
                           ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserAppCon");
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
            return new JsonResult(table);

        }

    }
}
