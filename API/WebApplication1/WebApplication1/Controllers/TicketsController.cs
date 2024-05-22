using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public TicketsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                          select  TicketId, UserId, CreatedAt, Message
                          from dbo.Tickets";
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
        public JsonResult Post(Tickets tks)
        {
            tks.CreatedAt = DateTime.Now;
            string query = @"
                          insert into dbo. Tickets(UserId, CreatedAt, Message)
                            values
                           (@UserId, @CreatedAt, @Message)                  
                           ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GameAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@UserId", tks.UserId);
                    myCommand.Parameters.Add("@CreatedAt", SqlDbType.DateTime).Value = tks.CreatedAt;
                    myCommand.Parameters.AddWithValue("@Message", tks.Message);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");

        }
        [HttpPut]
        public JsonResult Put(Tickets tks)
        {
            tks.CreatedAt = DateTime.Now;
            string query = @"
                          update dbo.Tickets
                            set UserId=@UserId,
                                CreatedAt=@CreatedAt,
                                Message=@Message
                            where TicketId=@TicketId
                                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GameAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@UserId", tks.UserId);
                    myCommand.Parameters.Add("@CreatedAt", SqlDbType.DateTime).Value = tks.CreatedAt;
                    myCommand.Parameters.AddWithValue("@Message", tks.Message);
                    myCommand.Parameters.AddWithValue("@TicketId", tks.TicketId);
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
                          delete from dbo.Tickets
                          where TicketId = @TicketId
                           ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GameAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@TicketId", id);
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
