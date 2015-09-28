<?php

use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Class     UserTableSeeder
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class UserTableSeeder extends Seeder
{
    /* ------------------------------------------------------------------------------------------------
     |  Main Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Run the database seeds.
     */
    public function run()
    {
        factory(User::class, 50)->create();
    }
}
