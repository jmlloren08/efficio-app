<?php

use App\Http\Controllers\AccomplishmentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LabelController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\UserController;
use App\Models\Dashboard;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::resource('/auth/verified/dashboard', DashboardController::class);
    Route::resource('/auth/verified/reports', AccomplishmentController::class);
    Route::resource('/auth/verified/settings', SettingsController::class);
    Route::resource('/auth/verified/users', UserController::class);
    Route::resource('/auth/verified/offices', OfficeController::class);
    Route::resource('/auth/verified/labels', LabelController::class);
    
    // Profile information
    Route::get('/auth/verified/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/auth/verified/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/auth/verified/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/get-list-of-offices', [OfficeController::class, 'index']);

require __DIR__ . '/auth.php';
