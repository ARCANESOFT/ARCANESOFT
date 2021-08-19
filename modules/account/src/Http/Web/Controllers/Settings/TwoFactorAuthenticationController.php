<?php declare(strict_types=1);

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
    public function status(Request $request): JsonResponse
    {
        $user = static::authenticatedUser($request);

        if ($user->isTwoFactorEnabled()) {
            return new JsonResponse([
                'enabled'       => true,
                'recoveryCodes' => $user->twoFactor->decrypted_recovery_codes,
            ]);
        }

        return new JsonResponse([
            'enabled'       => false,
            'recoveryCodes' => [],
        ]);
    }

    /**
     * @param  \Illuminate\Http\Request                                                       $request
     * @param  \Arcanesoft\Foundation\Fortify\Repositories\TwoFactorAuthenticationRepository  $repo
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function enable(Request $request, TwoFactorAuthenticationRepository $repo): JsonResponse
    {
        $user = static::authenticatedUser($request);

        $repo->enable($user);

        return new JsonResponse([
            'enabled'       => $user->isTwoFactorEnabled(),
            'recoveryCodes' => $user->twoFactor->decrypted_recovery_codes,
            'qrCode'        => $user->twoFactor->qr_code_svg->toHtml(),
        ]);
    }

    /**
     * @param  \Illuminate\Http\Request                                                       $request
     * @param  \Arcanesoft\Foundation\Fortify\Repositories\TwoFactorAuthenticationRepository  $repo
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function regenerate(Request $request, TwoFactorAuthenticationRepository $repo): JsonResponse
    {
        $user = static::authenticatedUser($request);

        $repo->generateNewRecoveryCodes($user);

        return new JsonResponse([
            'enabled'       => $user->isTwoFactorEnabled(),
            'recoveryCodes' => $user->twoFactor->decrypted_recovery_codes,
        ]);
    }

    /**
     * @param  \Illuminate\Http\Request                                                       $request
     * @param  \Arcanesoft\Foundation\Fortify\Repositories\TwoFactorAuthenticationRepository  $repo
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function disable(Request $request, TwoFactorAuthenticationRepository $repo): JsonResponse
    {
        $user = static::authenticatedUser($request);

        $repo->disable($user);

        return new JsonResponse([
            'enabled' => $user->isTwoFactorEnabled(),
        ]);
    }
}
