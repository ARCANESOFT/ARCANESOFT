<?php

declare(strict_types=1);

namespace Account\Http\Web\Resources;

use Arcanesoft\Foundation\Authorization\Models\Session;
use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * Class     BrowserSessionCollection
 *
 * @author   ARCANEDEV <arcanedev.maroc@gmail.com>
 */
class BrowserSessionCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection->map(function(Session $session)  {
                return [
                    'id'              => $session->id,
                    'agent'           => [
                        'isDesktop'  => $session->device()->isDesktop(),
                        'osName'     => $session->os_name,
                        'clientName' => $session->client_name,
                    ],
                    'ipAddress'       => $session->ip_address,
                    'isCurrentDevice' => $session->isCurrent(),
                    'lastActivityAt'  => [
                        'timestamp'     => $session->last_activity,
                        'diffForHumans' => $session->last_activity_at->diffForHumans(),
                    ],
                ];
            }),
        ];
    }
}
