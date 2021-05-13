<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Arcanesoft\Blog\Policies\PostsPolicy;

/**
 * Class     PostsController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class PostsController extends Controller
{
    public function index()
    {
        $this->authorize('admin::blog.posts.index');

        //
    }

    public function show()
    {
        $this->authorize(PostsPolicy::ability('index'));

        //
    }

    public function delete(Post $post)
    {
        $this->authorize(PostsPolicy::ability('delete'), [$post]);

        //
    }
}
