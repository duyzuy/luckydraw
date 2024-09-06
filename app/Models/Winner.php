<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;
use App\Models\Prize;

class Winner extends Model
{
    use HasFactory;
    protected $table = 'winners';

    protected $fillable = ['member_id', 'prize_id'];

    protected $keyType = 'string';

    public $incrementing = false;

    public static function booted()
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
    public function prize(): HasOne
    {
        return $this->hasOne(Prize::class, 'id', 'prize_id');
    }
    public function member_info(): HasOne
    {
        return $this->hasOne(Member::class, 'id', 'member_id');
    }
    // public function prizeGroup()
    // {
    //     return $this->prize()->prizeGroup()
    // }
    // public function prizeGroupSecond()
    // {
    //     return $this->prize()->prizeGroup();
    // }
}
