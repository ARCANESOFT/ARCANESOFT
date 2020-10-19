<?php

declare(strict_types=1);

namespace Arcanesoft\Demo;

use Arcanesoft\Foundation\Support\Providers\PackageServiceProvider;

/**
 * Class     DemoServiceProvider
 *
 * @package  Arcanesoft\Demo
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class DemoServiceProvider extends PackageServiceProvider
{
    /* -----------------------------------------------------------------
     |  Properties
     | -----------------------------------------------------------------
     */

    protected $package = 'demo';

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    public function register()
    {
        $this->registerConfig();

        $this->registerProviders([
            Providers\RouteServiceProvider::class,
        ]);

//        dd('Works');
    }

    public function boot()
    {
        $this->loadViews();
    }
}
