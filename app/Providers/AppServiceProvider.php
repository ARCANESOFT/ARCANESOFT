<?php namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Support\ServiceProvider;

/**
 * Class     AppServiceProvider
 *
 * @package  App\Providers
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class AppServiceProvider extends ServiceProvider
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
        if ($this->app->environment('local', 'testing')) {
            $this->registerDevServiceProvider();
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        Carbon::setLocale($this->app->getLocale());
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */
    /**
     * Register the service provider.
     */
    private function registerDevServiceProvider()
    {
        foreach ($this->app['config']->get('app.providers-dev', []) as $provider) {
            $this->app->register($provider);
        }
    }
}
