<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id','product_title','price','quantity'
    ];

    public function order(){
        return $this->belongsTo(Order::class);
    }
}
