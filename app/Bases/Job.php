<?php namespace App\Bases;

use Illuminate\Bus\Queueable;

/**
 * Class     Job
 *
 * @package  App\Bases
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
abstract class Job
{
    /* ------------------------------------------------------------------------------------------------
     |  Traits
     | ------------------------------------------------------------------------------------------------
     */
    use Queueable;
}
