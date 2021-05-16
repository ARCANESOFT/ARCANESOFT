<?php declare(strict_types=1);

namespace Authentication;

use Arcanedev\Support\Providers\PackageServiceProvider;

/**
 * Class     AuthenticationServiceProvider
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class AuthenticationServiceProvider extends PackageServiceProvider
{
    /* -----------------------------------------------------------------
     |  Properties
     | -----------------------------------------------------------------
     */

    /**
     * Vendor name.
     *
     * @var string
     */
    protected $vendor = 'modules';

    /**
     * Package name.
     *
     * @var string
     */
    protected $package = 'auth';

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->registerProviders([
            Providers\EventServiceProvider::class,
            Providers\RouteServiceProvider::class,
        ]);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->loadTranslations();
        $this->loadViews();
    }
}
