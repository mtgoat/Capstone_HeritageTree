using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using HeritageTree.Models;
using HeritageTree.Repositories;


namespace HeritageTree.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeritageStatusController : ControllerBase
    {

        private readonly IHeritageStatusRepository _heritageStatusRepository;

        public HeritageStatusController(IHeritageStatusRepository heritageStatusRepository)
        {
            _heritageStatusRepository = heritageStatusRepository;
        }

        // GET: api/<WardController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_heritageStatusRepository.GetAll());
        }

        // GET api/<WardController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var heritageStatus = _heritageStatusRepository.GetById(id);
            if (heritageStatus == null)
            {
                return NotFound();
            }
            return Ok(heritageStatus);
        }

        //// POST api/<WardController>
        //[HttpPost]
        //public void Post(Ownership ownership);

        //{
        //   reurn void
        //}

        //// PUT api/<WardController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<WardController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
