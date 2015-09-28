<?php namespace App\Bases;

use Arcanedev\Support\Bases\Controller as BaseController;

/**
 * Class Controller
 * @package App\Bases
 */
abstract class Controller extends BaseController
{
    /* ------------------------------------------------------------------------------------------------
     |  Properties
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * The view template - master, layout (... whatever).
     *
     * @var string
     */
    protected $template     = '_templates.default.master';
}
