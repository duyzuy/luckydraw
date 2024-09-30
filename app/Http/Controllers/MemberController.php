<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorememberRequest;
use App\Http\Requests\UpdatememberRequest;
use App\Models\Member;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Imports\MemberImport;
use Maatwebsite\Excel\Facades\Excel;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use function App\Helpers\stripVN;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        if ($request->search) {
            $keyword = Str::lower(Str::replace(" ", "", stripVN($request->search)));

            $members = Member::query()->where('member_keyword', 'LIKE', "%{$keyword}%")->paginate(15);
        } else {
            $members = Member::query()->orderBy('created_at', 'desc')->paginate(15);
        }
        $members->load(['department', 'campaign']);
        return Inertia::render('admin/Member/MemberContainer', [
            'data'      => $members,
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
            'email' =>  'sometimes|nullable|email',
            'member_code'   =>  'required',
        ])->validate();



        $keyword = $this->generate_keyword($request->name, $request->phone, $request->member_code, $request->email);

        $member = new Member();

        $member->name = $request->name;
        $member->phone = $request->phone;
        $member->email = $request->email;
        $member->member_type = $request->member_type;
        $member->checked_in = $request->checked_in;
        $member->member_code = $request->member_code;
        $member->position = $request->position;
        $member->department = $request->department;
        $member->address = $request->address;
        $member->member_keyword = Str::lower($keyword);
        $member->save();

        /**
         * generate qrcode for checkin purpose.
         */
        $path = 'qrcode/checkin' . '/' . time() . '-' .  $member->id . '.' . 'svg';
        $codeString = "ID:{$member->id};CODE:{$request->member_code}";
        $qrcode = QrCode::size(512)->margin(3)->errorCorrection('M')->generate($codeString);
        Storage::disk('local')->put($path, $qrcode);

        $member->qrcode_url = $path;
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
        // Validate incoming request data
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls',
            'campaign_id' => 'required',
        ]);

        $file = $request->file('file');
        $campaign_id = $request->campaign_id;
        Excel::import(new MemberImport($campaign_id), $file);

        // $array = Excel::toArray(new MemberImport($campaign_id), $file);

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
            'member_code'   =>  'required',
        ])->validate();

        $keyword = $this->generate_keyword($request->name, $request->phone, $request->member_code, $request->email);

        $member->name = $request->name;
        $member->phone = $request->phone;
        $member->email = $request->email;
        $member->member_type = $request->member_type;
        $member->checked_in = $request->checked_in;
        $member->member_code = $request->member_code;
        $member->position = $request->position;
        $member->department = $request->department;
        $member->address = $request->address;
        $member->member_keyword = Str::lower($keyword);

        $member->save();

        return to_route('member.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        // $member = Member::where('id', $id)->firstOrFail();


        if (Member::where('id', $id)->exists()) {

            Member::where('id', $id)->delete();
            // return to_route('member.index');
            return redirect()->back()->with('success', 'Xoá member thành công');
        }
        return redirect()->back()->with('error', 'Member Không tồn tại.');
    }
    public function destroyAll()
    {
        //
        Member::truncate();
        return to_route('member.index')->with('success', "Làm mới danh sách thành công.");
    }

    public function generate_keyword($name, $phone, $member_code, $email)
    {
        return Str::replace(" ", "", stripVN($name)) . Str::trim($phone) . Str::trim($member_code) . Str::lower($email);
    }
    public function generate_qrcode()
    {
        $members = Member::all();


        foreach ($members as $key => $member) {

            if ($member->qrcode_url === null) {

                $path = 'qrcode/checkin' . '/' . time() . '-' .  $member->id . '.' . 'svg';
                $codeString = "ID:{$member->id};CODE:{$member->member_code}";
                $qrcode = QrCode::size(512)->margin(3)->errorCorrection('M')->generate($codeString);
                Storage::disk('local')->put($path, $qrcode);
                $member->qrcode_url = $path;
                $member->save();
            }
        }
        return redirect()->back()->with('success', 'Generate success');
    }
}
