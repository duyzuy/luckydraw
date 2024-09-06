<?php

namespace App\Http\Controllers;

use App\Models\Winner;
use Inertia\Inertia;

class WinnerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $winner_list = Winner::all();
        $winner_list->load(['prize', 'member_info']);
        $winner_list->load(['prize.prizeGroup']);

        return Inertia::render('admin/Winner/WinnerContainer', [
            'winnerList' => $winner_list,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function reset()
    {
        //
        Winner::truncate();
        return to_route('winner.index');
    }
}
