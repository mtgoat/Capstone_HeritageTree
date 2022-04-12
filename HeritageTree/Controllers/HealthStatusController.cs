using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using HeritageTree.Models;
using HeritageTree.Repositories;


namespace HeritageTree.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthStatusController : ControllerBase
    {

        private readonly IHealthStatusRepository _healthStatusRepository;

        public HealthStatusController(IHealthStatusRepository healthStatusRepository)
        {
            _healthStatusRepository = healthStatusRepository;
        }

        // GET: api/<WardController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_healthStatusRepository.GetAll());
        }

        // GET api/<WardController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var healthStatus = _healthStatusRepository.GetById(id);
            if (healthStatus == null)
            {
                return NotFound();
            }
            return Ok(healthStatus);
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
