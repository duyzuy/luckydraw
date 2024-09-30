<?php

use App\Http\Controllers\CampaignController;
use App\Http\Controllers\DrawController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PrizeController;
use App\Http\Controllers\PrizeGroupController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WinnerController;
use App\Http\Controllers\CheckinController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\QRCodeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Route::get('/dashboard', function () {})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', [HomeController::class, 'index'])->name('home.index');

Route::prefix('campaign')->group(function () {
    Route::get('/{campaignId}', [HomeController::class, 'campaignIndex'])->name('home.campaign');
    Route::get('/{campaignId}/draw/{prizeGroupId}', [HomeController::class, 'prizeGroupIndex'])->name('home.campaign.prizeGroup.index');
    Route::post('/{campaignId}/draw/{prizeGroupId}/per-once', [HomeController::class, 'prizeGroupSpinPerOnce'])->name('home.campaign.prizeGroup.spin.perOne');
    Route::post('/{campaignId}/draw/{prizeGroupId}/multiple-once', [HomeController::class, 'prizeGroupSpinMultipleOnce'])->name('home.campaign.prizeGroup.spin.multipleOne');
    Route::patch('/{campaignId}/draw/{prizeGroupId', [HomeController::class, 'reSpin'])->name('home.campaign.prizeGroup.reSpin');
});



// Route::get('/draw/{id}', [DrawController::class, 'index'])->name('draw.index');
// Route::post('/draw/{prize_group_id}', [DrawController::class, 'spin'])->name('draw.spin');
// Route::patch('/draw/{prize_group_id}', [DrawController::class, 'reSpin'])->name('draw.reSpin');

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {

    Route::get('/', function () {
        return redirect('/admin/dashboard');
    })->name('dashboard');


    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/campaign', [CampaignController::class, 'index'])->name('campaign.index');
    Route::post('/campaign', [CampaignController::class, 'store'])->name('campaign.store');
    Route::get('/campaign/{id}', [CampaignController::class, 'show'])->name('campaign.show');
    Route::patch('/campaign/{id}', [CampaignController::class, 'update'])->name('campaign.update');
    Route::put('/campaign/{id}/status', [CampaignController::class, 'update_status'])->name('campaign.update.status');
    Route::delete('/campaign/{id}', [CampaignController::class, 'destroy'])->name('campaign.destroy');

    /**Prize group in campaign */
    Route::post('/campaign/{id}/prize-group', [CampaignController::class, 'storePrizeGroup'])->name('campaign.store.prizeGroup');
    Route::patch('/campaign/{id}/prize-group/{prizeGroupId}', [CampaignController::class, 'updatePrizeGroup'])->name('campaign.update.prizeGroup');
    Route::delete('/campaign/{id}/prize-group/{prizeGroupId}', [CampaignController::class, 'destroyPrizeGroup'])->name('campaign.destroy.prizeGroup');


    /**Prize in campaign */
    Route::post('/campaign/{id}/prize', [CampaignController::class, 'storePrize'])->name('campaign.store.prize');
    Route::patch('/campaign/{id}/prize/{prizeId}', [CampaignController::class, 'updatePrize'])->name('campaign.update.prize');
    Route::delete('/campaign/{id}/prize/{prizeId}', [CampaignController::class, 'destroyPrize'])->name('campaign.destroy.prize');


    /**Member in campaign */
    Route::post('/campaign/{id}/member', [CampaignController::class, 'storeMember'])->name('campaign.store.member');
    Route::patch('/campaign/{id}/member/{memberId}', [CampaignController::class, 'updateMember'])->name('campaign.update.member');
    Route::delete('/campaign/{id}/member/{memberId}', [CampaignController::class, 'destroyMember'])->name('campaign.destroy.member');
    Route::post('/campaign/{id}/import-member', [CampaignController::class, 'importMember'])->name('campaign.import.member');

    /**Winner list in campaign */
    Route::post('/campaign/{id}/winner', [CampaignController::class, 'resetWinnerList'])->name('campaign.reset.winner');


    Route::get('/prize-group', [PrizeGroupController::class, 'index'])->name('prizeGroup.index');
    Route::post('/prize-group', [PrizeGroupController::class, 'store'])->name('prizeGroup.store');
    Route::patch('/prize-group/{id}', [PrizeGroupController::class, 'update'])->name('prizeGroup.update');
    Route::delete('/prize-group/{id}', [PrizeGroupController::class, 'destroy'])->name('prizeGroup.destroy');

    Route::get('/prize', [PrizeController::class, 'index'])->name('prize.index');
    Route::post('/prize', [PrizeController::class, 'store'])->name('prize.store');
    Route::patch('/prize/{id}', [PrizeController::class, 'update'])->name('prize.update');
    Route::delete('/prize/{id}', [PrizeController::class, 'destroy'])->name('prize.destroy');

    // Route::resource('prize', PrizeController::class);

    Route::get('/department', [DepartmentController::class, 'index'])->name('department.index');
    Route::post('/department', [DepartmentController::class, 'store'])->name('department.store');
    Route::patch('/department/{id}', [DepartmentController::class, 'update'])->name('department.update');
    Route::delete('/department/{id}', [DepartmentController::class, 'destroy'])->name('department.destroy');


    Route::get('/company', [CompanyController::class, 'index'])->name('company.index');
    Route::post('/company', [CompanyController::class, 'store'])->name('company.store');
    Route::patch('/company/{id}', [CompanyController::class, 'update'])->name('company.update');
    Route::delete('/company/{id}', [CompanyController::class, 'destroy'])->name('company.destroy');



    Route::get('/member', [MemberController::class, 'index'])->name('member.index');
    Route::post('/member', [MemberController::class, 'store'])->name('member.store');
    Route::patch('/member/{id}', [MemberController::class, 'update'])->name('member.update');
    Route::delete('/member/{id}', [MemberController::class, 'destroy'])->name('member.destroy');
    Route::post('/member-import', [MemberController::class, 'import'])->name('member.import');
    Route::delete('/member-delete-all', [MemberController::class, 'destroyAll'])->name('member.destroyAll');
    Route::post('/member-generation-qr', [MemberController::class, 'generate_qrcode'])->name('member.generate.qrcode');

    Route::get('/winner', [WinnerController::class, 'index'])->name('winner.index');
    Route::post('/winner', [WinnerController::class, 'reset'])->name('winner.reset');

    Route::get('/checkin', [CheckinController::class, 'index'])->name('checkin.index');
    Route::post('/checkin', [CheckinController::class, 'checkin_user'])->name('checkin.checkin_user');
    Route::get('/qrcode', [QRCodeController::class, 'index'])->name('qrcode.index');


    Route::get('/media', [MediaController::class, 'index'])->name('media.index');
    Route::post('/media', [MediaController::class, 'store'])->name('media.store');
    Route::get('/media-single-upload', [MediaController::class, 'store_single'])->name('media.store.single');
    Route::post('/folder', [FolderController::class, 'store'])->name('folder.store');
    Route::post('/folder', [FolderController::class, 'store'])->name('folder.store');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
