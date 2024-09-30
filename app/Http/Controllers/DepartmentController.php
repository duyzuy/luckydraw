<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Requests\UpdateDepartmentRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use App\Models\Department;
use Illuminate\Http\Request;
use App\Models\Campaign;
use Inertia\Inertia;
use App\Models\Media;


class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $department = Department::query()->orderBy('created_at', 'desc')->paginate(15);
        return Inertia::render('admin/Department/DepartmentPageContainer', [
            'data'  => $department,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDepartmentRequest $request)
    {
        Validator::make($request->all(), [
            'name' => 'required|max:255',
            'eng_name' => 'required|max:255',

        ])->validate();


        $department = new Department();
        $department->name = $request->name;
        $department->eng_name = $request->eng_name;

        $department->save();

        return redirect()->back()->with('success', 'Tạo thành công.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartmentRequest $request, $id)
    {
        //
        Validator::make($request->all(), [
            'name' => 'required|max:255',
            'eng_name' => 'required|max:255',

        ])->validate();


        $department = Department::where('id', $id)->first();

        if (!$department) {
            return redirect()->back()->with('error', 'Bộ phận không hợp lệ');
        }

        $department->name = $request->name;
        $department->eng_name = $request->eng_name;
        $department->save();

        return redirect()->back()->with('success', 'Cập nhật thành công.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        Department::where('id', $id)->delete();

        return redirect()->back()->with('success', 'Xoá thành công.');
    }
}
