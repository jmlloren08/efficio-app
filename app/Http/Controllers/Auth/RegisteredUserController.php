<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'office' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|regex:/^[\w\.-]+@arta\.gov\.ph$/|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'user_role' => 'nullable|string|in:Staff,Division Chief,Director,Undersecretary,Secretary,Administrator'
        ]);

        $user = User::create([
            'name' => $request->name,
            'title' => $request->title,
            'office_id' => $request->office,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_role' => $request->user_role ?? 'Staff'
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
