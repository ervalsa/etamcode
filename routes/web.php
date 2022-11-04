<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\ReplyController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});

// Home
Route::get('/', HomeController::class)
    ->name('home');


// User Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'user'])->name('dashboard');

// Admin Dashboard
Route::get('/admin/dashboard', function() {
    return Inertia::render('AdminDashboard');
})->middleware(['auth', 'admin'])->name('AdminDashboard');

// Threads
Route::resource('threads', ThreadController::class);

Route::post('threads/{thread:slug}/reply', [ReplyController::class, 'store'])->name('replies.store');

Route::post('likes', LikeController::class)->name('likes.store');

require __DIR__.'/auth.php';
