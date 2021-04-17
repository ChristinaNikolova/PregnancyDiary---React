﻿namespace PregnancyDiary.WebApi.Controllers
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using PregnancyDiary.Common;
    using PregnancyDiary.Services.Data.Weeks;
    using PregnancyDiary.Web.Models.Common.ViewModels;
    using PregnancyDiary.Web.Models.Weeks.InputModels;

    [Route("api/[controller]/[action]")]
    public class WeeksController : ApiController
    {
        private readonly IWeeksService weeksService;

        public WeeksController(IWeeksService weeksService)
        {
            this.weeksService = weeksService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Create([FromBody] WeekInputModel input)
        {
            try
            {
                var isWeekNumberAlreadyExisting = await this.weeksService.IsWeekNumberAlreadyExistingAsync(input.Number, input.DiaryId);

                if (isWeekNumberAlreadyExisting)
                {
                    return this.BadRequest(new BadRequestViewModel
                    {
                        Message = Messages.Error.AlreadyExistsNumber,
                    });
                }

                await this.weeksService.CreateAsync(input.Number, input.MyWeight, input.MyBellySize, input.Mood, input.BabyHeight, input.BabyWeight, input.DiaryId);

                return this.Ok(new
                {
                    Message = Messages.Success.Added,
                });
            }
            catch (Exception)
            {
                return this.BadRequest(new BadRequestViewModel
                {
                    Message = Messages.Error.Unknown,
                });
            }
        }
    }
}
