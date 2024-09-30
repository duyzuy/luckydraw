<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Prize;
use App\Models\Campaign;

use Illuminate\Support\Str;

class PrizeGroup extends Model
{
    use HasFactory;

    protected $table = 'prize_groups';

    protected $fillable = ['name', 'eng_name', 'actived', 'draw_type', 'order'];

    protected $keyType = 'string';

    public $incrementing = false;

    public function prizes(): HasMany
    {
        return $this->hasMany(Prize::class);
    }
    public function campaign(): BelongsTo
    {
        return $this->belongsTo(Campaign::class);
    }

    public static function booted()
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}
