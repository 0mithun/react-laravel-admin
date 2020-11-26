<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable =[
        'first_name','last_name','email'
    ];


    public function orderItems(){
        return $this->hasMany(OrderItem::class);
    }

    public function getTotalAttribute(){
        return $this->orderItems->sum((function($orderItem){
            return $orderItem->price * $orderItem->quantity;
        }));
    }

    public function getNameAtttribute(){
        return ucwords($this->first_name." ".$this->last_name);
    }
}
