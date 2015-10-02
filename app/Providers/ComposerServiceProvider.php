<?php namespace App\Providers;

use App\Bases\ServiceProvider;
use View;

/**
 * Class     ComposerServiceProvider
 *
 * @package  App\Providers
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ComposerServiceProvider extends ServiceProvider
{
    /* ------------------------------------------------------------------------------------------------
     |  Main Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Register the service provider.
     */
    public function register()
    {
        // TODO: Implement register() method.
    }

    /**
     * Register bindings in the container.
     */
    public function boot()
    {
        // Using class based composers...
        View::composer(
            '_partials.social-networks-widget',
            'App\Http\ViewComposers\SocialNetworksComposer@widget'
        );
    }
}
