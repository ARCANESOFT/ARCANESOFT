<?php namespace App\Bases;

use Arcanedev\Support\Bases\Controller as BaseController;
use Arcanedev\Support\Traits\Templatable;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;

/**
 * Class     Controller
 *
 * @package  App\Bases
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
abstract class Controller extends BaseController
{
    /* ------------------------------------------------------------------------------------------------
     |  Traits
     | ------------------------------------------------------------------------------------------------
     */
    use AuthorizesRequests, DispatchesJobs, Templatable, ValidatesRequests;

    /* ------------------------------------------------------------------------------------------------
     |  Constructor
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * {@inheritdoc}
     */
    public function __construct()
    {
        parent::__construct();

        $this->setTemplate(config('cms.template'));
    }
}
