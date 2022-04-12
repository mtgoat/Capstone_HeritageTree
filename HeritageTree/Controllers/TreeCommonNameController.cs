using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using HeritageTree.Models;
using HeritageTree.Repositories;


namespace HeritageTree.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreeCommonNameController : ControllerBase
    {

        private readonly ITreeCommonNameRepository _treeCommonNameRepository;

        public TreeCommonNameController(ITreeCommonNameRepository treeCommonNameRepository)
        {
            _treeCommonNameRepository = treeCommonNameRepository;
        }

        // GET: api/<WardController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_treeCommonNameRepository.GetAll());
        }

        // GET api/<WardController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var ward = _treeCommonNameRepository.GetById(id);
            if (ward == null)
            {
                return NotFound();
            }
            return Ok(ward);
        }

        // POST api/<WardController>
        [HttpPost]
        public IActionResult Post(TreeCommonName treeCommonName)
        {
            _treeCommonNameRepository.Add(treeCommonName);
            return Ok(_treeCommonNameRepository.GetAll());
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
