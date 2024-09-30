<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreprizeRequest;
use App\Http\Requests\UpdateprizeRequest;
use App\Models\Media;
use App\Models\Prize;
use App\Models\PrizeGroup;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PrizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        //
        // $prize_list = Prize::with('prizeGroup')->get();
        $prize_list = Prize::query()->orderBy('created_at', 'asc')->paginate(15);
        $prize_list->load(['prizeGroup']);

        $prize_group_list = PrizeGroup::query()->orderBy('order', 'asc')->where('actived', 1)->get();

        return Inertia::render('admin/Prizes/PrizeContainer', [
            'data' => $prize_list,
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
            'prize_group_id'    =>  'required',
        ])->validate();

        $prize = new Prize();
        $prize->name = $request->name;

        $prize->prize_group_id = $request->prize_group_id;

        if ($request->hasFile('file')) {
            $file = $request->file('file');

            $name = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $mineType = $file->getClientMimeType();
            $image_slug = date('h-i-s-j-m-y') . Str::random(15);

            $image_path = $image_slug . '.' . $extension;

            $media = new Media();
            $media->name = $name;
            $media->path = "prize/" . $image_path;
            $media->slug = $image_slug;
            $media->media_type = $mineType;
            $media->extension = $extension;
            $media->save();

            $path = $file->storeAs('prize', $image_path);

            $prize->image = $path;
        }


        $prize->save();

        // return to_route('prize.index');
        return redirect()->back()->with('success', 'Tạo thành công.');
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


        // return to_route('prize.index');
        return redirect()->back()->with('success', 'Cập nhật thành công.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        Prize::where('id', $id)->delete();

        // return to_route('prize.index');
        return redirect()->back()->with('success', 'Xoá thành công.');
    }
}
