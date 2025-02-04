<?php

namespace Database\Seeders;

use App\Models\Accomplishment;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Factories\AccomplishmentsFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Accomplishment::factory(20)->create();
    }
}
 