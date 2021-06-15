<?php

declare(strict_types=1);

namespace Api\Http\Controllers;

use Illuminate\Http\JsonResponse;
use OpenApi\Annotations as OA;

/**
 * Class     ExampleController
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ExampleController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/example",
     *     @OA\Response(response="200", description="An example resource")
     * )
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return new JsonResponse([
            'message' => 'API is working!',
        ]);
    }
}
