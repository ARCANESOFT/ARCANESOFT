<?php

use Arcanedev\Support\Bases\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class     CreateUsersTable
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class CreateUsersTable extends Migration
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
    protected $table = 'users';

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
            $table->increments('id');

            $table->string('email')->unique();
            $table->string('password', 60);
            $table->rememberToken();

            $table->string('username')->unique();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('type', 20);
            $table->boolean('active')->default(false);

            $table->timestamps();
            $table->softDeletes();
        });
    }
}
