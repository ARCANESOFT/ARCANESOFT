<?php

declare(strict_types=1);

namespace Api\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use OpenApi\Annotations\OpenApi;
use function OpenApi\scan;

/**
 * Class     ApiGenerateCommand
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class ApiGenerateCommand extends Command
{
    /* -----------------------------------------------------------------
     |  Properties
     | -----------------------------------------------------------------
     */

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'api:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate always-up-to-date documentation';

    /* -----------------------------------------------------------------
     |  Main Methods
     | -----------------------------------------------------------------
     */

    /**
     * Handle the command.
     */
    public function handle()
    {
        $openapi = $this->scan();

        $this->save($openapi);
    }

    /* -----------------------------------------------------------------
     |  Other Methods
     | -----------------------------------------------------------------
     */

    /**
     * Scan the api.
     *
     * @return \OpenApi\Annotations\OpenApi
     */
    protected function scan(): OpenApi
    {
        define('API_HOST', env('APP_URL'));

        $directories = config('api.swagger.source');
        $options     = config('api.swagger.options', []);

        return scan($directories, $options);
    }

    /**
     * Save openapi into a file.
     *
     * @param  \OpenApi\Annotations\OpenApi  $openapi
     */
    protected function save(OpenApi $openapi): void
    {
        $format = config('api.swagger.output.format');
        $path = config('api.swagger.output.path');

        if ( ! File::isDirectory($path))
            File::makeDirectory($path);

        switch ($format) {
            case 'yaml':
            case 'yml':
                File::put("{$path}/api-docs.yml", $openapi->toYaml());
                break;

            case 'json':
                File::put("{$path}/api-docs.json", $openapi->toYaml());
                break;

            default:
                throw new \InvalidArgumentException("The format [{$format}] is not supported");
        }
    }
}
