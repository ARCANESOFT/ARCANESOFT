<?php declare(strict_types=1);

namespace App\Console;

use Arcanedev\LaravelBackup\Console\{CleanupBackupCommand, RunBackupCommand};
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

/**
 * Class     Kernel
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     */
    protected function schedule(Schedule $schedule): void
    {
        if ($this->app->isLocal()) {
            $schedule->command('telescope:prune')->daily();
        }

//        $schedule->call(function () {
//            info('Hello there!');
//        })->everyMinute();


        if ($this->app->isProduction()) {
            $this->scheduleBackups($schedule);
        }
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Schedule the backups.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     */
    protected function scheduleBackups(Schedule $schedule): void
    {
        $schedule->command(CleanupBackupCommand::class)->daily()->at('01:00');
        $schedule->command(RunBackupCommand::class)->daily()->at('02:00');
    }
}
