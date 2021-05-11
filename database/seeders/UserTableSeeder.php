<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
           $user = User::create([
            'name' => 'HungerBite',
            'email' => 'admin@hungrybite.com',
            'password' => Hash::make('admin@hungrybite123'),
        ]);
    }
}
