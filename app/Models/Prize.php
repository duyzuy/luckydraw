<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;
use App\Models\PrizeGroup;
use App\Models\Winner;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Prize extends Model
{
    use HasFactory;


    protected $table = 'prizes';

    protected $fillable = ['name', 'group', 'quantity', 'image'];

    protected $keyType = 'string';

    public $incrementing = false;


    public static function booted()
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
    public function prizeGroup(): BelongsTo
    {
        return $this->belongsTo(PrizeGroup::class);
    }
    public function winner(): HasOne
    {
        return $this->hasOne(Winner::class, 'prize_id', 'id');
    }
}
