<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Company extends Model
{
    use HasFactory;


    protected $keyType = 'string';

    protected $fillable = ['name', 'eng_name',];


    public static function booted()
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }

    public function members(): HasMany
    {
        return $this->hasMany(Member::class, 'id', 'compay_id');
    }
}
