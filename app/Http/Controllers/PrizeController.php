<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreprizeRequest;
use App\Http\Requests\UpdateprizeRequest;
use App\Models\Prize;
use App\Models\PrizeGroup;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;


class PrizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        // $prize_list = Prize::with('prizeGroup')->get();
        $prize_list = Prize::query()->orderBy('created_at', 'asc')->get();
        $prize_list->load(['prizeGroup']);

        $prize_group_list = PrizeGroup::query()->orderBy('order', 'asc')->where('actived', 1)->get();

        return Inertia::render('admin/Prizes/PrizeContainer', [
            'prizeList' => $prize_list,
            'prizeGroupList' => $prize_group_list
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreprizeRequest $request)
    {
        //

        Validator::make($request->all(), [
            'name' => 'required|max:255',
            'image' => 'required|max:255',
            'prize_group_id'    =>  'required',
        ])->validate();

        $prize = new Prize();

        $prize->name = $request->name;
        $prize->image = $request->image;
        $prize->prize_group_id = $request->prize_group_id;

        $prize->save();


        return to_route('prize.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(prize $prize)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(prize $prize)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateprizeRequest $request, $id)
    {
        //

        Validator::make($request->all(), [
            'name' => 'required|max:255',
            'image' => 'required|max:255',
            'prize_group_id'    =>  'required',
        ])->validate();

        $prize =  Prize::find($id);

        $prize->name = $request->name;
        $prize->image = $request->image;
        $prize->prize_group_id = $request->prize_group_id;
        $prize->save();


        return to_route('prize.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        Prize::where('id', $id)->delete();

        return to_route('prize.index');
    }
}
