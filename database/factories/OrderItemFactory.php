<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Order;
use App\OrderItem;
use Faker\Generator as Faker;

$factory->define(OrderItem::class, function (Faker $faker) {
    return [
        'price'     => $faker->randomFloat(5, 100 , 500),
        'quantity'  => random_int(1, 5),
        'product_title'     => $faker->sentence(),
    ];
});
