<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Models\Member;
use Illuminate\Support\Str;


class CheckinController extends Controller
{
    //

    public function index()
    {
        return Inertia::render('admin/Checkin/CheckinContainer', []);
    }
    public function checkin_user(Request $request)
    {

        Validator::make($request->all(), [
            'data' => 'required',
        ])->validate();

        $data = $request->data;

        $data_arr = explode(";", $data);

        $id_data = explode(":", $data_arr[0]);
        $code_data = explode(":", $data_arr[1]);

        if ($code_data[0] !== 'CODE' || $id_data[0] !== "ID") {
            return redirect()->back()->with('error', 'Dữ liệu không hợp lệ');
        }

        $member = Member::query()->where([
            [
                'member_code',
                $code_data[1]
            ],
            [
                'id',
                $id_data[1]
            ]
        ])->first();

        if (!$member) {
            return redirect()->back()->with('error', 'Member không tồn tại trên hệ thống.');
        }
        $message = "";
        if ($member->checked_in === 0) {
            $member->checked_in = 1;
            $member->save();
            $message = "Đã checkin thành công.";
        }

        return Inertia::render('admin/Checkin/CheckinContainer', [
            'member'    =>  $member,
            'checkinStatus'    => $message
        ]);
    }
}
