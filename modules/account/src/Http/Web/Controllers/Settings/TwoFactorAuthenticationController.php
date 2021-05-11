<?php

declare(strict_types=1);

namespace Account\Http\Web\Controllers\Settings;

use Account\Http\Web\Controllers\Controller;
use Arcanesoft\Foundation\Fortify\Repositories\TwoFactorAuthenticationRepository;
use Illuminate\Http\{JsonResponse, Request};

/**
 * Class     TwoFactorAuthenticationController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class TwoFactorAuthenticationController extends Controller
{
    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the Two Factor authentication status.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function status(Request $request)
    {
        $user = $this->getAuthenticatedUser($request);

        if ( ! $user->isTwoFactorEnabled()) {
            return new JsonResponse([
                'enabled'       => false,
                'recoveryCodes' => [],
            ]);
        }

        return new JsonResponse([
            'enabled'       => true,
            'recoveryCodes' => $user->twoFactor->decrypted_recovery_codes,
        ]);
    }

    public function enable(Request $request, TwoFactorAuthenticationRepository $repo)
    {
        $user = $this->getAuthenticatedUser($request);

        $repo->enable($user);

        return new JsonResponse([
            'enabled'       => $user->isTwoFactorEnabled(),
            'recoveryCodes' => $user->twoFactor->decrypted_recovery_codes,
            'qrCode'        => $user->twoFactor->qr_code_svg->toHtml(),
        ]);
    }

    public function regenerate(Request $request, TwoFactorAuthenticationRepository $repo)
    {
        $user = $this->getAuthenticatedUser($request);

        $repo->generateNewRecoveryCodes($user);

        return new JsonResponse([
            'enabled'       => $user->isTwoFactorEnabled(),
            'recoveryCodes' => $user->twoFactor->decrypted_recovery_codes,
        ]);
    }

    public function disable(Request $request, TwoFactorAuthenticationRepository $repo)
    {
        $user = $this->getAuthenticatedUser($request);

        $repo->disable($user);

        return new JsonResponse([
            'enabled' => $user->isTwoFactorEnabled(),
        ]);
    }

    /* -----------------------------------------------------------------
     |  Properties
     | -----------------------------------------------------------------
     */

    /**
     * TODO: Refactor this method into a trait.
     *
     * Get the authenticated user from request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \App\Models\User|mixed
     */
    protected function getAuthenticatedUser(Request $request)
    {
        return $request->user();
    }
}
