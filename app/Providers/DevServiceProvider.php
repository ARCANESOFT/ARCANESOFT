<?php namespace App\Providers;

use Illuminate\Support\ServiceProvider;

/**
 * Class     DevServiceProvider
 *
 * @package  App\Providers
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class DevServiceProvider extends ServiceProvider
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */
    /**
     * Register any application services.
     */
    public function register()
    {
        $this->registerProviders();
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        //
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */
    /**
     * Register the external service providers.
     */
    private function registerProviders()
    {
        foreach ($this->app->make('config')->get('dev.providers', []) as $provider) {
            $this->app->register($provider);
        }
    }
}
