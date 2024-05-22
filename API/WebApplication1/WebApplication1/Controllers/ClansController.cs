﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClansController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ClansController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                          select ClanId, ClanName, MemberCount
                          from dbo.Clans";
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
        public JsonResult Post(Clans cln)
        {
            string query = @"
                          insert into dbo.Clans(ClanName, MemberCount)
                            values
                           (@ClanName, @MemberCount)                  
                           ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GameAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@ClanName", cln.ClanName);
                    myCommand.Parameters.AddWithValue("@MemberCount", cln.MemberCount);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");

        }
        [HttpPut]
        public JsonResult Put(Clans cln)
        {
            string query = @"
                          update dbo.Clans
                            set ClanName=@ClanName,
                            MemberCount=@MemberCount
                            where ClanId=@ClanId
                                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GameAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@ClanName", cln.ClanName);
                    myCommand.Parameters.AddWithValue("@MemberCount", cln.MemberCount);
                    myCommand.Parameters.AddWithValue("@ClanId", cln.ClanId);
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
                          delete from dbo.Clans
                          where ClanId = @ClanId
                           ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GameAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ClanId", id);
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
