<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Winner;
use App\Models\PrizeGroup;
use App\Models\Prize;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    //

    public function index()
    {
        //
        //
        // $prize_list = Prize::with('prizeGroup')->get();
        $prize_group_list = PrizeGroup::orderBy('order', 'asc')->where('actived', 1)->get();

        return Inertia::render('Welcome', [
            'prizeGroups' => $prize_group_list,
        ]);
    }
}
