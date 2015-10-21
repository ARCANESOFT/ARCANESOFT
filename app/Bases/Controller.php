<?php namespace App\Bases;

use Arcanedev\Support\Bases\Controller as BaseController;

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
    use \Arcanedev\Breadcrumbs\Traits\BreadcrumbsTrait,
        \Arcanedev\SeoHelper\Traits\Seoable,
        \Arcanedev\Support\Traits\Templatable,
        \Illuminate\Foundation\Auth\Access\AuthorizesRequests,
        \Illuminate\Foundation\Bus\DispatchesJobs,
        \Illuminate\Foundation\Validation\ValidatesRequests;

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
        $this->registerBreadcrumbs('public');
    }

    /* ------------------------------------------------------------------------------------------------
     |  View Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Do random stuff before rendering view.
     */
    protected function beforeViewRender()
    {
        $this->loadBreadcrumbs();
    }
}
