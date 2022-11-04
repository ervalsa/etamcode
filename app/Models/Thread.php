<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function getRouteKeyName() {
        return 'slug';
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function replies() {
        return $this->hasMany(Reply::class);
    }

    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }
}
