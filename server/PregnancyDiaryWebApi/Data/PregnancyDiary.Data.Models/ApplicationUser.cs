﻿namespace PregnancyDiary.Data.Models
{
    using System;
    using System.Collections.Generic;

    using Microsoft.AspNetCore.Identity;

    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Diaries = new HashSet<Diary>();
            this.Roles = new HashSet<IdentityUserRole<string>>();
        }

        public virtual ICollection<Diary> Diaries { get; set; }

        public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }
    }
}
