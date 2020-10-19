<?php

declare(strict_types=1);

namespace App;

use Illuminate\Foundation\Application as IlluminateApplication;

/**
 * Class     Application
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class Application extends IlluminateApplication
{
    /**
     * Get the path to the language files.
     *
     * @return string
     */
    public function langPath(): string
    {
        return $this->basePath('translations');
    }
}
