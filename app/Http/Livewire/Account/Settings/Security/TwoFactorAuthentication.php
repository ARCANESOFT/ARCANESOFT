<?php

declare(strict_types=1);

namespace App\Http\Livewire\Account\Settings\Security;

use Arcanesoft\Foundation\Auth\Repositories\Authentication\TwoFactorAuthenticationRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\HtmlString;
use Livewire\Component;

/**
 * Class     TwoFactorAuthentication
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class TwoFactorAuthentication extends Component
{
    /* -----------------------------------------------------------------
     |  Constants
     | -----------------------------------------------------------------
     */

    const VIEW = 'account.settings.security._components.two-factor-authentication';

    /* -----------------------------------------------------------------
     |  Properties
     | -----------------------------------------------------------------
     */

    /**
     * Indicates if two factor authentication QR code is being displayed.
     *
     * @var bool
     */
    public $showingQrCode = false;

    /**
     * Indicates if two factor authentication recovery codes are being displayed.
     *
     * @var bool
     */
    public $showingRecoveryCodes = false;

    /**
     * @var string[]
     */
    protected $listeners = [
        'twoFactorDisabled' => '$refresh',
    ];

    /* -----------------------------------------------------------------
     |  Actions
     | -----------------------------------------------------------------
     */

    /**
     * Enable two factor authentication for the user.
     *
     * @param  \Arcanesoft\Foundation\Auth\Repositories\Authentication\TwoFactorAuthenticationRepository  $repo
     */
    public function enableTwoFactorAuthentication(TwoFactorAuthenticationRepository $repo)
    {
        $repo->enable(
            $this->getUserProperty()
        );

        $this->showingQrCode = true;
        $this->showingRecoveryCodes = true;
    }

    /**
     * Generate new recovery codes for the user.
     *
     * @param  \Arcanesoft\Foundation\Auth\Repositories\Authentication\TwoFactorAuthenticationRepository  $repo
     */
    public function regenerateRecoveryCodes(TwoFactorAuthenticationRepository $repo)
    {
        $repo->generateNewRecoveryCodes(
            $this->getUserProperty()
        );

        $this->showingRecoveryCodes = true;
    }

    /**
     * Disable two factor authentication for the user.
     *
     * @param  \Arcanesoft\Foundation\Auth\Repositories\Authentication\TwoFactorAuthenticationRepository  $repo
     */
    public function disableTwoFactorAuthentication(TwoFactorAuthenticationRepository $repo)
    {
        $repo->disable($this->getUserProperty());

        $this->getUserProperty()->refresh();
    }

    /* -----------------------------------------------------------------
     |  Computed Properties
     | -----------------------------------------------------------------
     */

    /**
     * Get the current user of the application.
     *
     * @return \App\Models\User|mixed
     */
    public function getUserProperty()
    {
        return Auth::user();
    }

    /**
     * Get the decrypted recovery codes.
     *
     * @return array
     */
    public function getDecryptedRecoveryCodesProperty(): array
    {
        return $this->getTwoFactory()->decrypted_recovery_codes;
    }

    /**
     * Get the QrCode SVG.
     *
     * @return \Illuminate\Support\HtmlString
     */
    public function getQrCodeSvgProperty(): HtmlString
    {
        return $this->getTwoFactory()->qr_code_svg;
    }

    /**
     * Determine if the two factor authentication is enabled.
     *
     * @return bool
     */
    public function getEnabledProperty(): bool
    {
        return ! is_null($this->getTwoFactory());
    }

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Render the component.
     *
     * @return \Illuminate\View\View
     */
    public function render()
    {
        return view(static::VIEW);
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Get the two factor authentication instance.
     *
     * @return \Arcanesoft\Foundation\Auth\Models\TwoFactor|null
     */
    protected function getTwoFactory()
    {
        return $this->getUserProperty()->two_factor;
    }
}
