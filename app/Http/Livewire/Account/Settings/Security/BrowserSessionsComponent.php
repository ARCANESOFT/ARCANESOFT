<?php

declare(strict_types=1);

namespace App\Http\Livewire\Account\Settings\Security;

use Illuminate\Support\Facades\Auth;
use Livewire\Component;

/**
 * Class     BrowserSessionsComponent
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class BrowserSessionsComponent extends Component
{
    /* -----------------------------------------------------------------
     |  Constants
     | -----------------------------------------------------------------
     */

    const VIEW = 'account::settings.security._components.browser-sessions';

    /* -----------------------------------------------------------------
     |  Properties
     | -----------------------------------------------------------------
     */

    /**
     * Indicates if logout is being confirmed.
     *
     * @var bool
     */
    public $confirmingLogout = false;

    /* -----------------------------------------------------------------
     |  Actions
     | -----------------------------------------------------------------
     */

    /**
     * Confirm that the user would like to logout from other browser sessions.
     */
    public function confirmLogout(): void
    {
        $this->dispatchBrowserEvent('browser-sessions.confirming-logout-other-devices');

        $this->confirmingLogout = true;
    }

    /**
     * Logout from other browser sessions.
     */
    public function logoutOtherBrowserSessions(): void
    {
        $this->guard()->logoutOtherDevices($this->user()->getAuthPassword());

        $this->deleteOtherSessionRecords();

        $this->confirmingLogout = false;

        $this->emit('loggedOut');
    }

    /**
     * Delete the other browser session records from storage.
     */
    protected function deleteOtherSessionRecords(): void
    {
        if ( ! $this->isValidSessionDriver()) {
            return;
        }

        $this->user()
             ->sessions()
             ->where('id', '!=', session()->getId())
             ->delete();
    }

    /**
     * Get the current sessions.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getSessionsProperty()
    {
        if ( ! $this->isValidSessionDriver()) {
            return collect();
        }

        return $this->user()->sessions;
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
     * Get the guard.
     *
     * @return \Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function guard()
    {
        return Auth::guard();
    }

    /**
     * Get the authenticated user.
     *
     * @return \App\Models\User|mixed|null
     */
    protected function user()
    {
        return $this->guard()->user();
    }

    /**
     * Determine if valid session was used.
     *
     * @return bool
     */
    protected function isValidSessionDriver(): bool
    {
        return in_array(config('session.driver'), ['database', 'arcanesoft']);
    }
}
