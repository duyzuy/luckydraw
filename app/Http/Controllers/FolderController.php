<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFolderRequest;
use App\Http\Requests\UpdateFolderRequest;
use App\Models\Folder;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class FolderController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFolderRequest $request)
    {
        //

        Validator::make($request->all(), [
            'folderName' => 'required|min:8',
        ])->validate();

        $folderSlug = Str::slug($request->folderName);

        $isExist = Folder::query()->where('folder_slug', $folderSlug)->exists();

        if ($isExist) {
            return redirect()->back()->withErrors([
                'folderName' => 'Thư mục đã tồn tại',
            ]);
        }
        $folder = new Folder();

        $folder->folder_name = $request->folderName;
        $folder->folder_slug = $folderSlug;


        if ($request->folderParent) {
            $folder->parent_id = $request->folderParent->id;
        }

        $folder->save();

        return to_route('media.index');
    }
}
