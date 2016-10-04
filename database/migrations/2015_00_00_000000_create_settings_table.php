<?php

use Arcanedev\Support\Bases\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class     CreateSettingsTable
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class CreateSettingsTable extends Migration
{
    /* ------------------------------------------------------------------------------------------------
     |  Constructor
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * CreateSettingsTable constructor.
     */
    public function __construct()
    {
        $configs          = config('arcanesoft.settings.database');
        $this->connection = array_get($configs, 'connection', null);
        $this->table      = array_get($configs, 'table', 'settings');
    }

    /* ------------------------------------------------------------------------------------------------
     |  Main Functions
     | ------------------------------------------------------------------------------------------------
     */
    /**
     * {@inheritdoc}
     */
    public function up()
    {
        $this->createSchema(function(Blueprint $table) {
            $table->increments('id');

            $table->string('domain')->nullable();
            $table->string('key');
            $table->text('value');
            $table->enum('type', ['integer', 'real', 'float', 'double', 'string', 'boolean', 'object', 'array']);

            $table->timestamps();
        });
    }
}
