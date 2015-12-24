<?php namespace App\Tests;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

/**
 * Class     ExampleTest
 *
 * @package  App\Tests
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ExampleTest extends TestCase
{
    /** @test */
    public function it_can_see_the_home_page()
    {
        $this->visit('/')->see('ARCANESOFT');
    }
}
