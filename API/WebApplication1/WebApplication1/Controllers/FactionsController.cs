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
        public JsonResult Post(Factions fct)
        {
            string query = @"
                          insert into dbo.Factions(FactionName, MemberCount, RequiredLevel)
                            values
                           (@FactionName, @MemberCount, @RequiredLevel)                  
                           ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GameAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@FactionName", fct.FactionName);
                    myCommand.Parameters.AddWithValue("@MemberCount", fct.MemberCount);
                    myCommand.Parameters.AddWithValue("@RequiredLevel", fct.RequiredLevel);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");

        }
        [HttpPut]
        public JsonResult Put(Factions fct)
        {
            string query = @"
                          update dbo.Factions
                            set FactionName=@FactionName,
                                MemberCount=@MemberCount,
                                RequiredLevel=@RequiredLevel
                            where FactionId=@FactionId
                                ";
                         
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GameAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@FactionName", fct.FactionName);
                    myCommand.Parameters.AddWithValue("@MemberCount", fct.MemberCount);
                    myCommand.Parameters.AddWithValue("@RequiredLevel", fct.RequiredLevel);
                    myCommand.Parameters.AddWithValue("@FactionId", fct.FactionId);
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
                          delete from dbo.Factions
                          where FactionId = @FactionId
                           ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GameAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@FactionId", id);
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

