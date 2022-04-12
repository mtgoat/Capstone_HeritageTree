using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using HeritageTree.Models;
using HeritageTree.Repositories;


namespace HeritageTree.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnershipController : ControllerBase
    {

        private readonly IOwnershipRepository _ownershipRepository;

        public OwnershipController(IOwnershipRepository ownershipRepository)
        {
            _ownershipRepository = ownershipRepository;
        }

        // GET: api/<WardController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_ownershipRepository.GetAll());
        }

        // GET api/<WardController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var ownership = _ownershipRepository.GetById(id);
            if (ownership == null)
            {
                return NotFound();
            }
            return Ok(ownership);
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
