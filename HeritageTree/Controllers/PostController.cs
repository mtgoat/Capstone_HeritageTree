using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using HeritageTree.Models;
using HeritageTree.Repositories;



namespace HeritageTree.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {


        private readonly IPostRepository _postRepository;

        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        // GET: api/<PostController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAll());
        }

        

        [HttpGet("GetAllNonApp")]
        public IActionResult GetAllNonApp()
        {
            return Ok(_postRepository.GetAllNotApp());
        }
        // GET api/<PostController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet("GetNonAppById/{id}")]
        public IActionResult GetNonApp(int id)
        {
            var post = _postRepository.GetByIdNotApp(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }
        //to get all approved posts by HeritageId
        [HttpGet("GetAllByHeritageId/{id}")]
        public IActionResult GetAllByHeritageId(int id)
        {
            var post = _postRepository.GetAllByHeritageId(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        //to get post by maintId
        [HttpGet("GetAllByMaintenanceId/{id}")]
        public IActionResult GetAllByMaintenanceId(int id)
        {
            var post = _postRepository.GetAllByMaintenanceId(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        // POST api/<PostController>
        [HttpPost]
        public IActionResult Post(Post post)
        {
            _postRepository.Add(post);
            return Ok(_postRepository.GetAll());
        }

        // PUT api/<PostController>/5 This is to update
        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }
            _postRepository.UpdateNotAppPost(post);
            return NoContent();
        }

        // DELETE api/<PostController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        { 
            
                _postRepository.Delete(id);
                return NoContent();
            
        }

        [HttpPost("AddMaintenanceToPost")]
        public IActionResult Post(PostMaintenance postMaintenance)
        {
            _postRepository.AddMaintenanceToPost(postMaintenance);
            return NoContent();
        }
        
       


    }
}
