<?php

declare(strict_types=1);

namespace Api;

use Arcanedev\Support\Providers\PackageServiceProvider;

/**
 * Class     ApiServiceProvider
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ApiServiceProvider extends PackageServiceProvider
{
    /* -----------------------------------------------------------------
     |  Properties
     | -----------------------------------------------------------------
     */

    protected $vendor = 'modules';

    protected $package = 'api';

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->registerConfig();

        $this->registerProviders([
            Providers\RouteServiceProvider::class
        ]);

        $this->registerCommands([
            Console\ApiGenerateCommand::class,
        ]);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
