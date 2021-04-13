﻿namespace PregnancyDiary.Common
{
    public static class GlobalConstants
    {
        public static class Admin
        {
            public const string Email = "admin@pregnancy-diary.com";

            public const string HashedPassword = "AQAAAAEAACcQAAAAECrjCD23cQQ28Tyci+UMuaGrFMDUb/trG4E0RbJa4McRVfWFJ6c5UG4NpbXDB6K5rQ==";
        }

        public static class Roles
        {
            public const string Admin = "Admin";

            public const string User = "User";
        }

        public static class SeedersPath
        {
            public const string Category = @"../../Data/Recipes.Data/Seeding/Data/Categories.json";
        }
    }
}
