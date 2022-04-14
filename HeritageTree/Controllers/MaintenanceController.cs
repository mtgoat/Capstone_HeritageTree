using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using HeritageTree.Models;
using HeritageTree.Repositories;


namespace HeritageTree.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaintenanceController : ControllerBase
    {

        private readonly IMaintenanceRepository _maintenanceRepository;

        public MaintenanceController(IMaintenanceRepository maintenanceRepository)
        {
            _maintenanceRepository = maintenanceRepository;
        }

        // GET: api/<MaintenanceController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_maintenanceRepository.GetAll());
        }

        // GET api/<MaintenanceController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var maintenance = _maintenanceRepository.GetById(id);
            if (maintenance == null)
            {
                return NotFound();
            }
            return Ok(maintenance);
        }

        // POST api/<MaintenanceController>
        [HttpPost]
        public IActionResult Post(Maintenance maintenance)
        {
            _maintenanceRepository.Add(maintenance);
            return Ok(_maintenanceRepository.GetAll());
        }

        // PUT api/<MaintenanceController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<MaintenanceController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
