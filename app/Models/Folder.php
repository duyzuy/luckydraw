<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

use App\Models\Media;
use Illuminate\Support\Str;

class Folder extends Model
{
    use HasFactory;

    protected $table = 'folders';

    protected $fillable = ['folder_name', 'folder_slug', 'parent_id'];


    public static function booted()
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }

    public function medias(): HasMany
    {
        return $this->hasMany(Media::class, 'folder_id', 'id');
    }
    public function childrens(): HasMany
    {
        return $this->hasMany(Folder::class, 'parent_id', 'id');
    }
}
