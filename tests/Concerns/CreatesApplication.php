<?php

declare(strict_types=1);

namespace Tests\Concerns;

use Illuminate\Contracts\Console\Kernel;
use Illuminate\Contracts\Foundation\Application;

trait CreatesApplication
{
    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application|mixed
     */
    public function createApplication(): Application
    {
        return tap(require __DIR__.'/../../bootstrap/app.php', function (Application $app) {
            $app->make(Kernel::class)->bootstrap();
        });
    }
}
