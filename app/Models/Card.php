<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Card extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'order',
        'list_id',
        'owner_id'
    ];

    // list relationship
    public function list(): BelongsTo
    {
        return $this->belongsTo(CardList::class, 'list_id');
    }

    // owner relationship
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
