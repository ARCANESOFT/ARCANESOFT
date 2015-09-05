<?php namespace App\Bases;

use Illuminate\Bus\Queueable;

/**
 * Class Job
 * @package App\Bases
 */
abstract class Job
{
    /* ------------------------------------------------------------------------------------------------
     |  Traits
     | ------------------------------------------------------------------------------------------------
     */
    use Queueable;
}
