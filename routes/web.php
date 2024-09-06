<?php

use App\Http\Controllers\DrawController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PrizeController;
use App\Http\Controllers\PrizeGroupController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WinnerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home.index');

// Route::get('/dashboard', function () {})->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/draw/{id}', [DrawController::class, 'index'])->name('draw.index');
Route::post('/draw/{prize_group_id}', [DrawController::class, 'spin'])->name('draw.spin');
Route::patch('/draw/{prize_group_id}', [DrawController::class, 'reSpin'])->name('draw.reSpin');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/prize-group', [PrizeGroupController::class, 'index'])->name('prizeGroup.index');
    Route::post('/prize-group', [PrizeGroupController::class, 'store'])->name('prizeGroup.store');
    Route::patch('/prize-group/{id}', [PrizeGroupController::class, 'update'])->name('prizeGroup.update');
    Route::delete('/prize-group/{id}', [PrizeGroupController::class, 'destroy'])->name('prizeGroup.destroy');

    Route::get('/prize', [PrizeController::class, 'index'])->name('prize.index');
    Route::post('/prize', [PrizeController::class, 'store'])->name('prize.store');
    Route::patch('/prize/{id}', [PrizeController::class, 'update'])->name('prize.update');
    Route::delete('/prize/{id}', [PrizeController::class, 'destroy'])->name('prize.destroy');

    // Route::resource('prize', PrizeController::class);

    Route::get('/member', [MemberController::class, 'index'])->name('member.index');
    Route::post('/member', [MemberController::class, 'store'])->name('member.store');
    Route::patch('/member/{id}', [MemberController::class, 'update'])->name('member.update');
    Route::delete('/member/{id}', [MemberController::class, 'destroy'])->name('member.destroy');
    Route::post('/member-import', [MemberController::class, 'import'])->name('member.import');

    Route::get('/winner', [WinnerController::class, 'index'])->name('winner.index');
    Route::post('/winner', [WinnerController::class, 'reset'])->name('winner.reset');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
