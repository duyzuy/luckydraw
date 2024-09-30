<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreCampaignRequest;
use App\Http\Requests\UpdatePrizeGroupRequest;
use App\Http\Requests\StorePrizeGroupRequest;
use App\Http\Requests\UpdateCampaignRequest;
use App\Http\Requests\StoreprizeRequest;
use App\Http\Requests\UpdateprizeRequest;
use App\Http\Requests\StorememberRequest;
use App\Http\Requests\UpdatememberRequest;
use App\Models\Campaign;
use Inertia\Inertia;
use App\Models\Media;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;
use App\Enums\CampaignStatus;
use App\Models\PrizeGroup;
use App\Models\Prize;
use App\Models\Winner;
use App\Models\Member;
use Illuminate\Validation\Rules\Enum;

use App\Imports\MemberImport;
use Maatwebsite\Excel\Facades\Excel;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

use Illuminate\Support\Facades\Storage;
use function App\Helpers\stripVN;


class CampaignController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $campaign = Campaign::query()->orderBy('created_at', 'desc')->paginate(15);
        return Inertia::render('admin/Campaign/CampaignContainer', [
            'data'  => $campaign,
        ]);
    }

    public function show($id)
    {
        //
        $campaign = Campaign::where('id', $id)->firstOrFail();
        $prizeGroups = PrizeGroup::where('campaign_id', $id)->withCount('prizes')->orderBy('order', 'asc')->get();
        $prizeGroups->load(['prizes' => function ($query) {
            $query->orderBy('created_at', 'asc');
        }]);

        $members = Member::where('campaign_id', $id)->orderBy('member_code', 'asc')->get();
        $members->load(['campaign', 'department', 'company']);


        $winners = Winner::where('campaign_id', $id)->with(['member_info', 'prize', 'campaign'])->orderBy('created_at', 'asc')->get();
        $winners->load(["member_info.department", 'member_info.company', 'prize.prizeGroup']);

        return Inertia::render('admin/Campaign/Detail/CampaignDetailPage', [
            'data'  => $campaign,
            'prizeGroups'   =>  $prizeGroups,
            'members'   =>  $members,
            'winners'   =>  $winners
        ]);
    }

    public function store(StoreCampaignRequest $request)
    {
        Validator::make($request->all(), [
            'name' => 'required|max:255',
            'start_date' => 'required|date|date_format:dMY',
            'end_date' => 'required|date|date_format:dMY',
            'valid_from' => 'required|date|date_format:dMY',
            'valid_to' => 'required|date|date_format:dMY',
            'status' => [new Enum(CampaignStatus::class)],
        ])->validate();

        $campaign = new Campaign();
        $campaign->name = $request->name;
        $campaign->content = $request->content;
        $campaign->campaign_type = $request->campaign_type;
        $campaign->start_date = Carbon::createFromFormat('dMY', $request->start_date)->startOfDay();
        $campaign->end_date = Carbon::createFromFormat('dMY', $request->end_date)->endOfDay();
        $campaign->valid_from =  Carbon::createFromFormat('dMY', $request->valid_from)->startOfDay();
        $campaign->valid_to = Carbon::createFromFormat('dMY', $request->valid_to)->endOfDay();
        $campaign->status = $request->status;

        if ($request->hasFile('image')) {
            $file = $request->file('image');

            $origin_name = $file->getClientOriginalName();

            $extension = $file->getClientOriginalExtension();
            $media_name = Str::replace(".{$extension}", '', $origin_name);
            $mineType = $file->getClientMimeType();
            $image_slug = Str::slug($media_name) . '-' . time();

            $image_path = $image_slug . '.' . $extension;

            $media = new Media();
            $media->name = $media_name;
            $media->path = "campaign/" . $image_path;
            $media->slug = $image_slug;
            $media->media_type = $mineType;
            $media->extension = $extension;
            $media->save();

            $path = $file->storeAs('campaign', $image_path);

            $campaign->image = $path;
        }


        $campaign->save();

        return redirect()->back()->with('success', 'Tạo Chiến dịch thành công.');
    }

    public function update(UpdateCampaignRequest $request, $id)
    {

        Validator::make($request->all(), [
            'name' => 'required|max:255',
            'start_date' => 'required|date|date_format:dMY',
            'end_date' => 'required|date|date_format:dMY',
            'valid_from' => 'required|date|date_format:dMY',
            'valid_to' => 'required|date|date_format:dMY',
            'status' => [new Enum(CampaignStatus::class)],
        ])->validate();

        $campaign = Campaign::where('id', $id)->first();

        $campaign->name = $request->name;
        $campaign->content = $request->content;
        $campaign->campaign_type = $request->campaign_type;
        $campaign->start_date = Carbon::createFromFormat('dMY', $request->start_date)->startOfDay();
        $campaign->end_date = Carbon::createFromFormat('dMY', $request->end_date)->endOfDay();
        $campaign->valid_from =  Carbon::createFromFormat('dMY', $request->valid_from)->startOfDay();
        $campaign->valid_to = Carbon::createFromFormat('dMY', $request->valid_to)->endOfDay();
        $campaign->status = $request->status;


        if ($request->hasFile('image')) {
            $file = $request->file('image');

            $origin_name = $file->getClientOriginalName();

            $extension = $file->getClientOriginalExtension();
            $media_name = Str::replace(".{$extension}", '', $origin_name);
            $mineType = $file->getClientMimeType();
            $image_slug = Str::slug($media_name) . '-' . time();

            $image_path = $image_slug . '.' . $extension;

            $media = new Media();
            $media->name = $media_name;
            $media->path = "campaign/" . $image_path;
            $media->slug = $image_slug;
            $media->media_type = $mineType;
            $media->extension = $extension;
            $media->save();

            $path = $file->storeAs('campaign', $image_path);

            $campaign->image = $path;
        }


        $campaign->save();

        return redirect()->back()->with('success', 'Cập nhật thành công.');
    }

    public function update_status(Request $request, $id)
    {

        Validator::make($request->all(), [
            'status' => [new Enum(CampaignStatus::class)],

        ])->validate();

        $campaign = Campaign::where('id', $id)->first();
        $campaign->status = $request->status;
        $campaign->save();
        return redirect()->back()->with('success', 'Cập nhật trạng thái thành công');
    }

    public function destroy($id)
    {
        $campaign = Campaign::where('id', $id)->firstOrFail();
        $campaign->delete();

        return redirect()->back()->with('success', 'Xoá thành công.');
    }

    /**
     * Handle Prize group
     */
    public function storePrizeGroup(StorePrizeGroupRequest $request, $campaignId)
    {

        Validator::make($request->all(), [
            'name' => 'required|max:255',
            'actived'   =>  'required',
            'draw_type' => 'required',
        ])->validate();

        $prize_group = new PrizeGroup();

        $prize_group->name = $request->name;
        $prize_group->campaign_id = $campaignId;
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

        return redirect()->back()->with('success', 'Tạo thành công.');
    }

    public function updatePrizeGroup(UpdatePrizeGroupRequest $request, $campaignId, $prizeGroupId)
    {

        $prize_group = PrizeGroup::where('id', $prizeGroupId)->firstOrFail();

        Validator::make($request->all(), [
            'name' => 'required|max:255',
            'actived'   =>  'required',
            'draw_type' => 'required',
        ])->validate();


        $prize_group->name = $request->name;
        // $prize_group->campaign_id = $campaignId;
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

    public function destroyPrizeGroup($campaignId, $prizeGroupId)
    {

        $prizeGroup = PrizeGroup::where('id', $prizeGroupId)->firstOrFail();

        $prizeGroup->prizes()->delete();
        $prizeGroup->delete();

        return redirect()->back()->with('success', 'Xoá thành công.');
    }

    /**
     * Handle Prize
     */
    public function storePrize(StoreprizeRequest $request)
    {
        Validator::make($request->all(), [
            'name' => 'required|max:255',
            'quantity' => 'required|numeric|min:1|max:999',
            'prize_group_id'    =>  'required',
        ])->validate();

        $final_path = null;

        if ($request->hasFile('file')) {

            $file = $request->file('file');

            $origin_name = $file->getClientOriginalName();

            $extension = $file->getClientOriginalExtension();
            $media_name = Str::replace(".{$extension}", '', $origin_name);
            $mineType = $file->getClientMimeType();
            $image_slug = Str::slug($media_name) . '-' . time();

            $image_path = $image_slug . '.' . $extension;

            $media = new Media();
            $media->name = $media_name;
            $media->path = "prize/" . $image_path;
            $media->slug = $image_slug;
            $media->media_type = $mineType;
            $media->extension = $extension;
            $media->save();

            $final_path = $file->storeAs('prize', $image_path);
        }

        for ($i = 0; $i <  $request->quantity; $i++) {

            $prize = new Prize();
            $prize->name = $request->name;
            $prize->prize_group_id = $request->prize_group_id;

            $prize->image = $final_path;

            $prize->save();
        }

        // return to_route('prize.index');
        return redirect()->back()->with('success', 'Tạo thành công.');
    }

    public function updatePrize(UpdateprizeRequest $request, $campaignId, $prizeId)
    {
        Validator::make($request->all(), [
            'name' => 'required|max:255',
            'prize_group_id'    =>  'required',
        ])->validate();

        $prize =  Prize::where('id', $prizeId)->firstOrFail();

        if ($request->hasFile('file')) {

            $file = $request->file('file');

            $origin_name = $file->getClientOriginalName();

            $extension = $file->getClientOriginalExtension();
            $media_name = Str::replace(".{$extension}", '', $origin_name);
            $mineType = $file->getClientMimeType();
            $image_slug = Str::slug($media_name) . '-' . time();

            $image_path = $image_slug . '.' . $extension;

            $media = new Media();
            $media->name = $media_name;
            $media->path = "prize/" . $image_path;
            $media->slug = $image_slug;
            $media->media_type = $mineType;
            $media->extension = $extension;
            $media->save();

            $final_path = $file->storeAs('prize', $image_path);
            $prize->image = $final_path;
        }

        $prize->name = $request->name;
        $prize->prize_group_id = $request->prize_group_id;
        $prize->save();


        return redirect()->back()->with('success', 'Cập nhật thành công.');
    }

    public function destroyPrize($campaignId, $prizeId)
    {

        $prize = Prize::where('id', $prizeId)->firstOrFail();

        $prize->delete();

        return redirect()->back()->with('success', 'Xoá phần quà thành công.');
    }

    /**
     * Handle Member
     */
    public function storeMember(StorememberRequest $request, $campaignId)
    {

        Validator::make($request->all(), [
            'full_name' => 'required|max:255',
            'email' =>  'sometimes|nullable|email',
            'member_code'   =>  'required',
        ])->validate();

        $keyword = $this->generate_keyword($request->name, $request->phone, $request->member_code, $request->email);

        $member = new Member();
        $member->full_name = $request->full_name;
        $member->first_name = $request->first_name;
        $member->last_name = $request->last_name;
        $member->phone = $request->phone;
        $member->email = $request->email;
        $member->member_type = $request->member_type;
        $member->checked_in = $request->checked_in;
        $member->member_code = $request->member_code;
        $member->position = $request->position;
        $member->country = $request->country;
        $member->city = $request->city;
        $member->state = $request->state;
        $member->province = $request->province;

        $member->department_id = $request->department_id;
        $member->company_id = $request->company_id;
        $member->address = $request->address;
        $member->member_keyword = Str::lower($keyword);
        $member->campaign_id = $campaignId;
        $member->save();

        /**
         * generate qrcode for checkin purpose.
         */
        // $path = 'qrcode/checkin' . '/' . time() . '-' .  $member->id . '.' . 'svg';
        // $codeString = "ID:{$member->id};CODE:{$request->member_code}";
        // $qrcode = QrCode::size(512)->margin(3)->errorCorrection('M')->generate($codeString);
        // Storage::disk('local')->put($path, $qrcode);
        // $member->qrcode_url = $path;

        $member->save();
        return redirect()->back()->with('success', 'Tạo Member thành công.');
    }

    public function importMember(Request $request, $campaignId)
    {
        if (!Campaign::where('id', $campaignId)->exists()) {
            return back()->with('error', 'Campaign ID không tồn tại.');
        }

        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls',
        ]);

        $file = $request->file('file');
        $campaign_id = $campaignId;
        Excel::import(new MemberImport($campaign_id), $file);

        // $array = Excel::toArray(new MemberImport($campaign_id), $file);

        return redirect()->back()->with('success', 'Import success');
    }

    public function updateMember(UpdatememberRequest $request, $campaignId, $id)
    {
        $member = Member::find($id);

        Validator::make($request->all(), [
            'full_name' => 'required|max:255',
            'email' =>  'sometimes|nullable|email',
            'member_code'   =>  'required',
        ])->validate();

        $keyword = $this->generate_keyword($request->name, $request->phone, $request->member_code, $request->email);

        $member->full_name = $request->full_name;
        $member->first_name = $request->first_name;
        $member->last_name = $request->last_name;
        $member->phone = $request->phone;
        $member->email = $request->email;
        $member->member_type = $request->member_type;
        $member->checked_in = $request->checked_in;
        $member->member_code = $request->member_code;
        $member->position = $request->position;
        $member->country = $request->country;
        $member->city = $request->city;
        $member->state = $request->state;
        $member->province = $request->province;

        $member->department_id = $request->department_id;
        $member->company_id = $request->company_id;
        $member->address = $request->address;
        $member->member_keyword = Str::lower($keyword);

        $member->save();

        return back()->with('success', 'Cập nhật Member thành công');
    }

    public function destroyMember($id)
    {
        $member = Member::where('id', $id)->firstOrFail();
        $member->delete();

        return redirect()->back()->with('success', 'Xoá member thành công');
    }
    public function generate_keyword($name, $phone, $member_code, $email)
    {
        return Str::replace(" ", "", stripVN($name)) . Str::trim($phone) . Str::trim($member_code) . Str::lower($email);
    }
    // public function generate_qrcode()
    // {
    //     $members = Member::all();

    //     foreach ($members as $key => $member) {

    //         if ($member->qrcode_url === null) {

    //             $path = 'qrcode/checkin' . '/' . time() . '-' .  $member->id . '.' . 'svg';
    //             $codeString = "ID:{$member->id};CODE:{$member->member_code}";
    //             $qrcode = QrCode::size(512)->margin(3)->errorCorrection('M')->generate($codeString);
    //             Storage::disk('local')->put($path, $qrcode);
    //             $member->qrcode_url = $path;
    //             $member->save();
    //         }
    //     }
    //     return redirect()->back()->with('success', 'Generate success');
    // }

    /**
     * Handle winner list
     */

    public function resetWinnerList($campaignId)
    {

        $winners = Winner::where('campaign_id', $campaignId)->get();

        foreach ($winners as $winner) {
            $winner->delete();
        }
        return redirect()->back()->with('success', "Xoá winners thành công.");
    }
}
