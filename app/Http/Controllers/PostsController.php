<?php

namespace App\Http\Controllers;

use Arcanesoft\Blog\Policies\PostsPolicy;

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
