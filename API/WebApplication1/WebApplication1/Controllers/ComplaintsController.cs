using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComplaintsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ComplaintsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                          select  ComplaintId, UserId, CreatedAt, Message
                          from dbo.Complaints";
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
        public JsonResult Post(Complaints cpl)
        {
            cpl.CreatedAt = DateTime.Now;
            string query = @"
                          insert into dbo. Complaints(UserId, CreatedAt, Message)
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

                    myCommand.Parameters.AddWithValue("@UserId", cpl.UserId);
                    myCommand.Parameters.Add("@CreatedAt", SqlDbType.DateTime).Value = cpl.CreatedAt;
                    myCommand.Parameters.AddWithValue("@Message", cpl.Message);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");

        }
        [HttpPut]
        public JsonResult Put(Complaints cpl)
        {
            cpl.CreatedAt = DateTime.Now;
            string query = @"
                          update dbo.Complaints
                            set UserId=@UserId,
                                CreatedAt=@CreatedAt,
                                Message=@Message
                            where ComplaintId=@ComplaintId
                                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GameAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@UserId", cpl.UserId);
                    myCommand.Parameters.Add("@CreatedAt", SqlDbType.DateTime).Value = cpl.CreatedAt;
                    myCommand.Parameters.AddWithValue("@Message", cpl.Message);
                    myCommand.Parameters.AddWithValue("@ComplaintId", cpl.ComplaintId);
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
                          delete from dbo.Complaints
                          where ComplaintId = @ComplaintId
                           ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GameAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ComplaintId", id);
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
