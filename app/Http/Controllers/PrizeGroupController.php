<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePrizeGroupRequest;
use App\Http\Requests\UpdatePrizeGroupRequest;
use App\Models\PrizeGroup;
use App\Models\Campaign;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


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
        $prize_group_list->load(['campaign']);
        $campaign = Campaign::where('status', 'publish')->orderBy('created_at', 'desc')->get();

        return Inertia::render('admin/PrizeGroups/PrizeGroupsContainer', [
            'items' => $prize_group_list,
            'campaigns' => $campaign,
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
            'campaign_id' => 'required|max:255',
            'actived'   =>  'required',
            'draw_type' => 'required',
        ])->validate();

        $prize_group = new PrizeGroup();

        $prize_group->name = $request->name;
        $prize_group->campaign_id = $request->campaign_id;
        $prize_group->actived = $request->actived;
        $prize_group->draw_type = $request->draw_type;
        $prize_group->order = $request->order;

        if ($request->hasFile('image')) {
            $file = $request->file('image');

            $origin_name = $file->getClientOriginalName();

            $extension = $file->getClientOriginalExtension();
            $media_name = Str::replace(".{$extension}", '', $origin_name);

            $image_slug = Str::slug($media_name) . '-' . time();

            $image_path = $image_slug . '.' . $extension;

            $path = $file->storeAs('campaign', $image_path);

            $prize_group->image = $path;
        }

        $prize_group->save();

        // return to_route('campaign.show');
        return redirect()->back()->with('success', 'Tạo thành công.');
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
            'actived'   =>  'required',
            'draw_type' => 'required',
        ])->validate();


        $prize_group->name = $request->name;
        $prize_group->campaign_id = $request->campaign_id;
        $prize_group->actived = $request->actived;
        $prize_group->draw_type = $request->draw_type;
        $prize_group->order = $request->order;

        if ($request->hasFile('image')) {
            $file = $request->file('image');

            $origin_name = $file->getClientOriginalName();

            $extension = $file->getClientOriginalExtension();
            $media_name = Str::replace(".{$extension}", '', $origin_name);
            $image_slug = Str::slug($media_name) . '-' . time();
            $image_path = $image_slug . '.' . $extension;
            $path = $file->storeAs('campaign', $image_path);

            $prize_group->image = $path;
        }

        $prize_group->save();
        return redirect()->back()->with('success', 'Cập nhật thành công.');
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
