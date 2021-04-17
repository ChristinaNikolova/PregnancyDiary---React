﻿namespace PregnancyDiary.Web.Models.Admin.Categories.InputModels
{
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class CategoryUpdateInputModel : CreateCategoryInputModel, IMapFrom<Category>
    {
        [Required]
        public string Id { get; set; }
    }
}
