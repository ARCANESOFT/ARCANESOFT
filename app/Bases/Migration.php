<?php namespace App\Bases;

use Arcanedev\Support\Bases\Migration as BaseMigration;

/**
 * Class     Migration
 *
 * @package  App\Bases
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
abstract class Migration extends BaseMigration
{
    /* ------------------------------------------------------------------------------------------------
     |  Properties
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * The name of the database connection to use.
     *
     * @var string|null
     */
    protected $connection = null;

    /**
     * The table name.
     *
     * @var string|null
     */
    protected $table = null;

    /**
     * The table prefix.
     *
     * @var string|null
     */
    protected $prefix = null;
}
