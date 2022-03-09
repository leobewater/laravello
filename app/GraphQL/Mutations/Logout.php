<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;

class Logout
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        // Plain Laravel: Auth::guard()
        // Laravel Sanctum: Auth::guard(config('guard.sanctum', 'web'))
        $guard = Auth::guard(config('guard.sanctum', 'web'));

        /** @var \App\Models\User|null $user */
        $user = $guard->user();
        $guard->logout();

        return $user;
    }
}
