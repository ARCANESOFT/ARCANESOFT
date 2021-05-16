<?php declare(strict_types=1);

namespace Authentication\Http\Controllers;

use App\Http\Routes\PagesRoutes;
use Arcanedev\LaravelImpersonator\Contracts\Impersonator;
use Illuminate\Http\JsonResponse;

/**
 * Class     ImpersonateController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ImpersonateController
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Stop the impersonation.
     *
     * @param  \Arcanedev\LaravelImpersonator\Contracts\Impersonator  $impersonator
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function stop(Impersonator $impersonator): JsonResponse
    {
        abort_unless($impersonator->isImpersonating(), JsonResponse::HTTP_NOT_FOUND);

        $impersonator->stop();

        return new JsonResponse([
            'redirect' => PagesRoutes::index(),
        ]);
    }
}
