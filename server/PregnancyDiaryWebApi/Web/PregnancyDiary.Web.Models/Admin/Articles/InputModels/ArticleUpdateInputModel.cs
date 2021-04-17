﻿namespace PregnancyDiary.Web.Models.Admin.Articles.InputModels
{
    using System.ComponentModel.DataAnnotations;

    using PregnancyDiary.Data.Models;
    using PregnancyDiary.Services.Mapping;

    public class ArticleUpdateInputModel : CreateArticleInputModel, IMapFrom<Article>
    {
        [Required]
        public string Id { get; set; }
    }
}
