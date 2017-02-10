<?php namespace App;

use Illuminate\Foundation\Application as IlluminateApplication;

/**
 * Class     Application
 *
 * @package  App
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class Application extends IlluminateApplication
{
    /* ------------------------------------------------------------------------------------------------
     |  Getters & Setters
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Get the path to the public / web directory.
     *
     * @return string
     */
    public function publicPath()
    {
        return $this->basePath.DS.'public';
    }
}
