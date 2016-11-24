<?php namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
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
        $this->registerDevServiceProvider();
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
     * Register the service provider.
     */
    private function registerDevServiceProvider()
    {
        /** @var  \Illuminate\Contracts\Config\Repository  $config */
        $config = $this->app['config'];

        if (
            $config->get('app.debug') &&
            in_array($this->app->environment(), $config->get('dev.environments'))
        ) {
            $this->app->register(DevServiceProvider::class);
        }
    }
}
