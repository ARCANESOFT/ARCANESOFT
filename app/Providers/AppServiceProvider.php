<?php namespace App\Providers;

use Illuminate\Support\Facades\Schema;
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
        $this->registerDevServiceProvider();
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
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
        /** @var  \Illuminate\Contracts\Config\Repository  $config */
        $config = $this->app->make('config');

        if (
            $config->get('app.debug') &&
            in_array($this->app->environment(), $config->get('dev.environments', []))
        ) {
            $this->app->register(DevServiceProvider::class);
        }
    }
}
