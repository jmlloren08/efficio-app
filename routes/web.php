<?php

use App\Http\Controllers\AccomplishmentController;
use App\Http\Controllers\LabelController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    // View
    Route::get('/auth/verified/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/auth/verified/reports', function () {
        return Inertia::render('Reports');
    })->name('reports');
    Route::get('/auth/verified/settings', function () {
        return Inertia::render('Settings');
    })->name('settings');
    // Fetch
    Route::get('/get-list-of-accomplishments', [AccomplishmentController::class, 'index']);
    Route::get('get-list-of-authors', [UserController::class, 'index']);
    Route::get('/get-list-of-offices', [OfficeController::class, 'index']);
    Route::get('get-list-of-sub-offices', [OfficeController::class, 'getSubOffices']);
    Route::get('/get-list-of-labels', [LabelController::class, 'index']);
    // Post
    Route::post('add-new-accomplishment', [AccomplishmentController::class, 'store']);
    // Profile information
    Route::get('/auth/verified/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/auth/verified/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/auth/verified/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/get-list-of-offices', [OfficeController::class, 'index']);

require __DIR__ . '/auth.php';
