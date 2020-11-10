<?php

declare(strict_types=1);

namespace Database\Seeders;

use Arcanesoft\Foundation\Authorization\Database\Factories\AdministratorFactory;
use Arcanesoft\Foundation\Authorization\Models\Administrator;
use Carbon\Carbon;
use Database\Factories\UserFactory;
use Illuminate\Database\Seeder;

/**
 * Class     DatabaseSeeder
 *
 * @package  Database\Seeders
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // UserFactory::times(10)->create();

        $this->runDemoSeeds();
    }

    /**
     * Run demo seeds for testing.
     */
    private function runDemoSeeds()
    {
        foreach (range(1, 5) as $range) {
            $now = Carbon::now()->subDays(rand(1, 365));

            UserFactory::times(40)->sequence(
                ['activated_at' => $now, 'email_verified_at' => $now],
                ['activated_at' => $now, 'email_verified_at' => null],
                ['activated_at' => null, 'email_verified_at' => $now],
                ['activated_at' => null, 'email_verified_at' => null],
            )->create();

            AdministratorFactory::times(10)->sequence(
                ['activated_at' => $now],
                ['activated_at' => null],
            )->create();
        }
    }
}
