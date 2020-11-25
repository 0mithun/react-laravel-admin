<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'title'     => $faker->title,
        'description'   => $faker->paragraphs(3, true),
        'image' => $faker->imageUrl(),
        'price' => $faker->randomFloat(5, 100, 500)
    ];
});
