<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use App\Models\Member;



class Campaign extends Model
{
    use HasFactory;

    protected $table = 'campaigns';
    protected $keyType = 'string';
    protected $fillable = ['name', 'content', 'image', 'campaign_type', 'start_date', 'end_date', 'valid_from', 'valid_to', 'status'];


    public static function booted()
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }

    public function members(): HasMany
    {
        return $this->hasMany(Member::class, 'id', 'campaign_id');
    }
}
