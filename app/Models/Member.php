<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

use App\Models\Company;
use App\Models\Department;
use App\Models\Campaign;

class Member extends Model
{
    use HasFactory;

    protected $table = 'members';

    protected $fillable = [
        'full_name',
        'first_name',
        'last_name',
        'phone',
        'email',
        'member_type',
        'checked_in',
        'member_code',
        'member_keyword',
        'address',
        'department_id',
        'position',
        'country',
        'city',
        'state',
        'province',
        'company',
        'campaign_id'
    ];

    protected $keyType = 'string';

    public $incrementing = false;

    public static function booted()
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
    public function campaign(): BelongsTo
    {
        return $this->belongsTo(Campaign::class);
    }
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
