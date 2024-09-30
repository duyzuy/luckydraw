<?php

namespace App\Enums;

enum CampaignStatus: string
{
    case PUBLISH = 'publish';
    case UNPUBLISH = 'unpublish';
    case PENDING = 'pending';
}
