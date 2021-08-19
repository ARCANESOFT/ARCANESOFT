<?php

$items = [
    [
        'title'    => 'Dashboard',
        'url'      => route('demo::dashboard'),
        'icon'     => '',
    ],
    [
        'title'    => 'Content',
        'url'      => '#',
        'icon'     => '',
        'children' => [
            [
                'title'    => 'Typography',
                'url'      => route('demo::content.show', ['typography']),
                'icon'     => '',
            ],
            [
                'title'    => 'Images',
                'url'      => route('demo::content.show', ['images']),
                'icon'     => '',
            ],
            [
                'title'    => 'Tables',
                'url'      => route('demo::content.show', ['tables']),
                'icon'     => '',
            ],
        ],
    ],
    [
        'title'    => 'Forms',
        'url'      => '#',
        'icon'     => '',
        'children' => [
            [
                'title'    => 'Form control',
                'url'      => route('demo::forms.show', ['form-control']),
                'icon'     => '',
            ],
            [
                'title'    => 'Select',
                'url'      => route('demo::forms.show', ['select']),
                'icon'     => '',
            ],
            [
                'title'    => 'Checks',
                'url'      => route('demo::forms.show', ['checks']),
                'icon'     => '',
            ],
            [
                'title'    => 'File',
                'url'      => route('demo::forms.show', ['file']),
                'icon'     => '',
            ],
            [
                'title'    => 'Range',
                'url'      => route('demo::forms.show', ['range']),
                'icon'     => '',
            ],
            [
                'title'    => 'Input group',
                'url'      => route('demo::forms.show', ['input-group']),
                'icon'     => '',
            ],
            [
                'title'    => 'Layout',
                'url'      => route('demo::forms.show', ['layout']),
                'icon'     => '',
            ],
            [
                'title'    => 'Validation',
                'url'      => route('demo::forms.show', ['validation']),
                'icon'     => '',
            ],
        ],
    ],
    [
        'title'    => 'Components',
        'url'      => '#',
        'icon'     => '',
        'children' => [
            [
                'title'    => 'Accordions',
                'url'      => route('demo::components.show', ['accordions']),
                'icon'     => '',
            ],
            [
                'title'    => 'Alerts',
                'url'      => route('demo::components.show', ['alerts']),
                'icon'     => '',
            ],
            [
                'title'    => 'Avatars',
                'url'      => route('demo::components.show', ['avatars']),
                'icon'     => '',
            ],
            [
                'title'    => 'Badges',
                'url'      => route('demo::components.show', ['badges']),
                'icon'     => '',
            ],
            [
                'title'    => 'Pagination',
                'url'      => route('demo::components.show', ['pagination']),
                'icon'     => '',
            ],
        ],
    ],
    [
        'title'    => 'Vue Components',
        'url'      => '#',
        'icon'     => '',
        'children' => [],
    ],
];

?>


<aside id="sidebar-container" class="sidebar-container">
    <nav id="sidebar-nav-container" class="sidebar-nav-container">
        @foreach($items as $item)
            <div class="d-flex flex-column nav-menu">
                @if(isset($item['children']))
                    <div class="nav-menu-header" id="nav-menu-header-{{ $loop->iteration }}">
                        <a class="nav-menu-link no-underline d-flex align-items-center collapsed"
                           aria-expanded="false"
                           role="button" data-toggle="collapse"
                           data-target="#menu-{{ $loop->iteration }}"
                           aria-controls="menu-{{ $loop->iteration }}">
                            <i class="{{ $item['icon'] }} mr-2"></i> <span>{{ $item['title'] }}</span>
                        </a>
                    </div>
                    <div class="nav-sub-menu collapse"
                         id="menu-{{ $loop->iteration }}"
                         aria-labelledby="nav-menu-header-{{ $loop->iteration }}"
                         data-parent="#sidebar-nav-container">
                        <div class="d-flex flex-column nav-sub-menu-links">
                            @foreach($item['children'] as $childItem)
                                <a href="{{ $childItem['url'] }}" class="nav-menu-link no-underline d-flex align-items-center">
                                    <i class="{{ $item['icon'] }} mr-2"></i> <span>{{ $childItem['title'] }}</span>
                                </a>
                            @endforeach
                        </div>
                    </div>
                @else
                    <div class="nav-menu-header" id="nav-menu-header-{{ $loop->iteration }}">
                        <a href="{{ $item['url'] }}" class="nav-menu-link no-underline d-flex align-items-center">
                            <i class="{{ $item['icon'] }} mr-2"></i> <span>{{ $item['title'] }}</span>
                        </a>
                    </div>
                @endif
            </div>
        @endforeach
    </nav>
</aside>
