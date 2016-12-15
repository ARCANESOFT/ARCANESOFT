<?php namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class DevServiceProvider extends ServiceProvider
{
    /* ------------------------------------------------------------------------------------------------
     |  Main Functions
     | ------------------------------------------------------------------------------------------------
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

    /* ------------------------------------------------------------------------------------------------
     |  Other Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Register the external service providers.
     */
    private function registerProviders()
    {
        foreach ($this->app['config']['dev.providers'] as $provider) {
            if (class_exists($provider)) $this->app->register($provider);
        }
    }
}
