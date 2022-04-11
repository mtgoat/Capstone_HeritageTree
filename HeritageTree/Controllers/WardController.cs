using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using HeritageTree.Models;
using HeritageTree.Repositories;


namespace HeritageTree.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WardController : ControllerBase
    {

        private readonly IWardRepository _wardRepository;

        public WardController(IWardRepository wardRepository)
        {
            _wardRepository = wardRepository;
        }

        // GET: api/<WardController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_wardRepository.GetAll());
        }

        // GET api/<WardController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var ward = _wardRepository.GetById(id);
            if (ward == null)
            {
                return NotFound();
            }
            return Ok(ward);
        }

        // POST api/<WardController>
        [HttpPost]
        public IActionResult Post(Ward ward)
        {
            _wardRepository.Add(ward);
            return Ok(_wardRepository.GetAll());
        }

        // PUT api/<WardController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<WardController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
