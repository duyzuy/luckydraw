<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorememberRequest;
use App\Http\Requests\UpdatememberRequest;
use App\Models\Member;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Exports\MemberExport;
use App\Imports\MemberImport;
use Maatwebsite\Excel\Facades\Excel;

use Illuminate\Support\Str;

use function App\Helpers\stripVN;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        //
        // $prize_list = Prize::with('prizeGroup')->get();
        $members = Member::query()->orderBy('created_at', 'asc')->get();

        return Inertia::render('admin/Member/MemberContainer', [
            'memberList' => $members,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorememberRequest $request)
    {
        //

        Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => 'email|required',
            'member_type'   =>  'required',
            'member_code'   =>  'required',
            'phone'     =>  'required'
        ])->validate();

        $member = new Member();

        $member->name = $request->name;
        $member->phone = $request->phone;
        $member->email = $request->email;
        $member->member_type = $request->member_type;
        $member->checked_in = $request->checked_in;
        $member->member_code = $request->member_code;
        $member->position = $request->position;
        $member->member_keyword = str_replace(" ", "", stripVN($member->name));

        $member->save();


        return to_route('member.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(member $member)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function import(Request $request)
    {
        //
        // dd($request->file('file'));
        // Validate incoming request data
        $request->validate([
            'file' => 'required',
        ]);

        Excel::import(new MemberImport, $request->file('file'));

        return back()->with('success', 'Import success');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatememberRequest $request, $id)
    {
        //
        $member = Member::find($id);
        Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => 'email|required',
            'member_type'   =>  'required',
            'member_code'   =>  'required',
            'phone'     =>  'required'
        ])->validate();

        $member->name = $request->name;
        $member->phone = $request->phone;
        $member->email = $request->email;
        $member->member_type = $request->member_type;
        $member->checked_in = $request->checked_in;
        $member->member_code = $request->member_code;
        $member->member_keyword = str_replace(" ", "", stripVN($member->name));


        $member->save();

        return to_route('member.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //

        if (Member::where('id', $id)->exists()) {

            Member::where('id', $id)->delete();
            return to_route('member.index');
        }
        return redirect()->back()->with('error', 'Id is not exists');
    }
}
