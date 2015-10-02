<?php namespace App\Http\ViewComposers;

use Illuminate\View\View;

/**
 * Class     SocialNetworksComposer
 *
 * @package  App\Http\ViewComposers
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class SocialNetworksComposer
{
    /* ------------------------------------------------------------------------------------------------
     |  Properties
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Social networks data.
     *
     * @var array
     */
    protected $socialNetworks;

    /* ------------------------------------------------------------------------------------------------
     |  Constructor
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Create a new social networks composer.
     */
    public function __construct()
    {
        $this->socialNetworks = config('cms.social-networks', []);
    }

    /* ------------------------------------------------------------------------------------------------
     |  Compose Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Bind data to the view.
     *
     * @param  \Illuminate\View\View  $view
     */
    public function widget(View $view)
    {
        $view->with('socialNetworks', $this->socialNetworks);
    }
}
