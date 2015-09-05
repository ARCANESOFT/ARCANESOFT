<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model as Eloquent;

/**
 * Class DatabaseSeeder
 */
class DatabaseSeeder extends Seeder
{
    /* ------------------------------------------------------------------------------------------------
     |  Main Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Eloquent::unguard();

        // $this->call(UserTableSeeder::class);

        Eloquent::reguard();
    }
}
