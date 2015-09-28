<?php

use Arcanedev\Support\Bases\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class     CreatePasswordResetsTable
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class CreatePasswordResetsTable extends Migration
{
    /* ------------------------------------------------------------------------------------------------
     |  Properties
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * The table name.
     *
     * @var string|null
     */
    protected $table = 'password_resets';

    /* ------------------------------------------------------------------------------------------------
     |  Main Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * Run the migrations.
     */
    public function up()
    {
        self::createSchema(function (Blueprint $table) {
            $table->string('email')->index();
            $table->string('token')->index();
            $table->timestamp('created_at');
        });
    }
}
