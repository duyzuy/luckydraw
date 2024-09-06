<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePrizeGroupRequest;
use App\Http\Requests\UpdatePrizeGroupRequest;
use App\Models\PrizeGroup;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;


class PrizeGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        //
        // $prize_group_list = PrizeGroup::query()->orderBy('order', 'asc')->get();
        $prize_group_list = PrizeGroup::withCount('prizes')->orderBy('order', 'asc')->get();

        return Inertia::render('admin/PrizeGroups/PrizeGroupsContainer', [
            'items' => $prize_group_list,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePrizeGroupRequest $request)
    {
        //

        Validator::make($request->all(), [
            'name' => 'required|max:255',
            'eng_name' => 'required|max:255',
            'actived'   =>  'required',
            'draw_type' => 'required',
        ])->validate();

        $prize_group = new PrizeGroup();

        $prize_group->name = $request->name;
        $prize_group->eng_name = $request->eng_name;
        $prize_group->actived = $request->actived;
        $prize_group->draw_type = $request->draw_type;
        $prize_group->order = $request->order;

        $prize_group->save();


        return to_route('prizeGroup.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePrizeGroupRequest $request, PrizeGroup $prizeGroup)
    {
        //

        $prize_group = PrizeGroup::find($request->id);

        Validator::make($request->all(), [
            'name' => 'required|max:255',
            'eng_name' => 'required|max:255',
            'actived'   =>  'required',
            'draw_type' => 'required',
        ])->validate();


        $prize_group->name = $request->name;
        $prize_group->eng_name = $request->eng_name;
        $prize_group->actived = $request->actived;
        $prize_group->draw_type = $request->draw_type;
        $prize_group->order = $request->order;

        $prize_group->save();
        return to_route('prizeGroup.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PrizeGroup $prizeGroup, $id)
    {
        //
        PrizeGroup::where('id', $id)->delete();

        return to_route('prizeGroup.index');
    }
}
