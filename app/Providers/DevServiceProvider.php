<?php namespace App\Providers;

use App\Bases\ServiceProvider;
use Barryvdh\Debugbar\Facade as DebugBarFacade;
use Barryvdh\Debugbar\ServiceProvider as DebugBarServiceProvider;
use Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider;

/**
 * Class     DevServiceProvider
 *
 * @package  App\Providers
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class DevServiceProvider extends ServiceProvider
{
    /* ------------------------------------------------------------------------------------------------
     |  Main Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        //
    }

    /**
     * Register the service provider.
     */
    public function register()
    {
        if ($this->isLocal()) {
            $this->registerIdeHelper();
            $this->registerDebugBar();
        }
    }

    /* ------------------------------------------------------------------------------------------------
     |  Check Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Check if environment is local
     *
     * @return bool
     */
    private function isLocal()
    {
        return $this->app->environment() !== 'production';
    }

    /* ------------------------------------------------------------------------------------------------
     |  Other Functions
     | ------------------------------------------------------------------------------------------------
     */
    private function registerIdeHelper()
    {
        if (class_exists(IdeHelperServiceProvider::class)) {
            $this->app->register(IdeHelperServiceProvider::class);
        }
    }

    private function registerDebugBar()
    {
        if (class_exists(DebugBarServiceProvider::class)) {
            $this->app->register(DebugBarServiceProvider::class);
            $this->registerFacade('DebugBar', DebugBarFacade::class);
        }
    }
}
