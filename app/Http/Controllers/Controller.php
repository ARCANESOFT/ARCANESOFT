<?php namespace App\Http\Controllers;

use Arcanesoft\Core\Http\Controllers\Controller as BaseController;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;

class Controller extends BaseController
{
    /* -----------------------------------------------------------------
     |  Traits
     | -----------------------------------------------------------------
     */
    use DispatchesJobs, ValidatesRequests;

    /* -----------------------------------------------------------------
     |  Constructor
     | -----------------------------------------------------------------
     */
    /**
     * Controller constructor.
     */
    public function __construct()
    {
        parent::__construct();

        $this->registerBreadcrumbs('public'); // todo: Refactor this constructor to the core
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */
    /**
     * Do random stuff before rendering view.
     */
    protected function beforeViewRender()
    {
        $this->loadBreadcrumbs();
    }
}
