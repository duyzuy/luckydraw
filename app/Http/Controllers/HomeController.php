<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Winner;
use App\Models\PrizeGroup;
use App\Models\Prize;
use App\Models\Member;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Enums\DrawType;

class HomeController extends Controller
{
    //

    public function index()
    {
        //
        $campaigns = Campaign::query()->where('status', 'publish')->orderBy('created_at', 'desc')->get();

        return Inertia::render('Welcome', [
            'campaigns' => $campaigns,
        ]);
    }


    public function campaignIndex($id)
    {

        $campaign = Campaign::where('id', $id)->firstOrFail();

        $prizeGroups = PrizeGroup::where([['actived', 1], ['campaign_id', $id]])->withCount('prizes')->orderBy('order', 'asc')->get();
        $prizeGroups->load(['prizes' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }]);

        $members = Member::where([['campaign_id', $id], ['checked_in', true]])->orderBy('member_code', 'asc')->get();
        $members->load(['campaign', 'department', 'company']);

        // $winners = Winner::where('campaign_id', $id)->get();
        // $winners->load(['member_info', 'prize', 'campaign', "member_info.department", 'member_info.company', 'prize.prizeGroup']);
        // $winners->groupBy('prize.prize_group_id');


        $winners = Winner::where('campaign_id', $id)->get();
        $winners->load(['prize', 'member_info', 'campaign', 'prize.prizeGroup']);

        $winnersGrouped  = $winners->groupBy('prize.prize_group_id');

        return Inertia::render('Campaign/CampaignPage', [
            'campaign'      =>      $campaign,
            'prizeGroups'   =>      $prizeGroups,
            'members'       =>      $members,
            'winners'       =>      $winners,
        ]);
    }

    public function wheelIndex($campaignId)
    {


        $campaign = Campaign::where('id', $campaignId)->firstOrFail();

        $prizeGroups = PrizeGroup::where([['actived', 1], ['campaign_id', $campaignId]])->withCount('prizes')->orderBy('order', 'asc')->get();

        $prizeGroups->load(['prizes' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }]);


        $members = Member::where([['campaign_id', $campaignId], ['checked_in', true]])->orderBy('member_code', 'asc')->get();
        $members->load(['campaign', 'department', 'company']);

        // $winners = Winner::where('campaign_id', $id)->get();
        // $winners->load(['member_info', 'prize', 'campaign', "member_info.department", 'member_info.company', 'prize.prizeGroup']);
        // $winners->groupBy('prize.prize_group_id');


        $winners = Winner::where('campaign_id', $campaignId)->get();
        $winners->load(['prize', 'member_info', 'campaign', 'prize.prizeGroup']);

        return Inertia::render('Campaign/Wheel/WheelContainer', [
            'campaign'      =>      $campaign,
            'prizeGroups'   =>      $prizeGroups,
            'members'       =>      $members,
            'winners'       =>      $winners,
        ]);
    }


    /**
     * Detail prize group
     */
    public function prizeGroupIndex($campaignId, $prizeGroupId)
    {

        $campaign = Campaign::where('id', $campaignId)->firstOrFail();

        $members = Member::where([['campaign_id', $campaignId], ['checked_in', true]])->orderBy('member_code', 'asc')->get();
        $members->load(['campaign', 'department', 'company']);



        $prizeGroup = PrizeGroup::with(['prizes' => function ($query) {
            $query->orderBy('created_at', 'asc');
        }])->where([['actived', 1], ['campaign_id', $campaignId], ['id', $prizeGroupId]])->firstOrFail();

        $prizeGroup->prizes->load(['winner.member_info']);

        $prizeGroups = PrizeGroup::where([['actived', 1], ['campaign_id', $campaignId]])->orderBy('order', 'asc')->get();


        $winners_by_campaign = Winner::query()->where('campaign_id', $campaignId)->get();

        $winner_ids = [];
        $prized_ids = [];
        foreach ($winners_by_campaign as $key => $winner) {
            array_push($winner_ids, $winner->member_id);
            array_push($prized_ids, $winner->prize_id);
        }

        $prize = Prize::query()->where('prize_group_id', $prizeGroupId)->orderBy('created_at', 'asc')->whereNotIn('id', $prized_ids)->first();

        $winners = Winner::where('campaign_id', $campaignId)->orderBy('created_at', 'asc')->get();
        $winners->load(['member_info', 'prize', 'campaign']);

        $winnerListByGroup = isset($winners->groupBy('prize.prize_group_id')[$prizeGroupId]) ? $winners->groupBy('prize.prize_group_id')[$prizeGroupId] : null;


        return Inertia::render('Campaign/Draw/DrawContainer', [
            'prizeGroups'   =>  $prizeGroups,
            'campaign'      =>  $campaign,
            'prizeGroup'    =>  $prizeGroup,
            'prize'         =>  $prize,
            'winnerList'    =>  $winnerListByGroup,
            'members'       =>  $members
        ]);
    }

    public function prizeGroupSpinPerOnce(Request $request, $campaignId, $prizeGroupId)
    {

        if (!$campaignId || !$prizeGroupId) {
            return redirect()->back()->with(['error' => "Campaign và prize group không hợp lệ."]);
        }

        $campaign = Campaign::where('id', $campaignId)->firstOrFail();

        $prizeGroup = PrizeGroup::with(['prizes' => function ($query) {
            $query->orderBy('created_at', 'asc');
        }])->where([['actived', 1], ['campaign_id', $campaignId], ['id', $prizeGroupId]])->firstOrFail();

        Validator::make($request->all(), [
            'prizeId' => 'required',
            'drawType' => 'required|in:per_one',
        ])->validate();

        if (Winner::where('prize_id', $request->prizeId)->exists()) {
            return redirect()->back()->with(['error' => "Phần quà đã có người chiến thắng."]);
        }

        $winnerListByCampaign = Winner::query()->where('campaign_id', $campaignId)->get();
        $winnerMemberIds = [];
        foreach ($winnerListByCampaign as $key => $winner) {
            array_push($winnerMemberIds, $winner->member_id);
        }

        $luckyMember = Member::where([
            ['campaign_id', $campaign->id],
            ['checked_in', true]
        ])->whereNotIn('id', $winnerMemberIds)->inRandomOrder()->limit(1)->first();


        if ($luckyMember == null) {
            return redirect()->back()->with(['error' => "Danh sách member không đủ."]);
        }
        /**
         * Handle Rule 
         */

        $winner = new Winner();
        $winner->member_id = $luckyMember->id;
        $winner->campaign_id = $campaign->id;
        $winner->prize_id = $request->prizeId;
        $winner->note = "Lucky member";
        $winner->save();

        $winner->load(['prize.prizeGroup', 'member_info']);

        return redirect()->route('home.campaign.prizeGroup.index', [$campaignId, $prizeGroupId])
            ->with([
                'success'   => 'Quay thành công.',
                'winner'    =>  $winner,
                'drawType'  => 'per_one',
            ]);
    }

    public function prizeGroupSpinMultipleOnce(Request $request, $campaignId, $prizeGroupId)
    {


        if (!$campaignId || !$prizeGroupId) {
            return redirect()->back()->with(['error' => "Campaign và prize group không hợp lệ."]);
        }


        $campaign = Campaign::where('id', $campaignId)->firstOrFail();

        $prizeGroup = PrizeGroup::with(['prizes' => function ($query) {
            $query->orderBy('created_at', 'asc');
        }])->where([['actived', 1], ['campaign_id', $campaignId], ['id', $prizeGroupId]])->firstOrFail();


        Validator::make($request->all(), [
            'drawType' => 'required|in:all_one',
        ])->validate();



        $winnerListByCampaign = Winner::query()->where('campaign_id', $campaignId)->get();

        $winnerIds = [];

        foreach ($winnerListByCampaign as $key => $winner) {
            array_push($winnerIds, $winner->member_id);
        }


        $allMemberWithoutWinnerInCampaign = Member::where([
            ['campaign_id', $campaignId],
            ['checked_in', true]
        ])->whereNotIn('id', $winnerIds)->get();


        if ($allMemberWithoutWinnerInCampaign->count() === 0) {
            return redirect()->back()->with(['error' => "Danh sách member trống."]);
        }

        /**
         * 
         * Handle rules
         * 
         */
        // dd($allMemberWithoutWinnerInCampaign);

        // $collection = collect([1, 2, 3, 4]);

        // $filteredItem = $collection->filter(function ($item,  $key) {

        //     return !in_array($item, [2, 3]);
        // });

        // dd($filteredItem);

        $allPrizesOfGroup = Prize::where('prize_group_id', $prizeGroup->id)->orderBy('created_at', 'asc')->get();


        $newWinnerListIds = [];

        $winnerListCollection = collect([]);


        foreach ($allPrizesOfGroup as $prizeItem) {

            $selectionList = collect([]);

            // $memberSelectionList = $allMemberWithoutWinnerInCampaign->filter(function ($member,  $key) {
            //     return !in_array($member->id, $newWinnerListIds);
            // });

            foreach ($allMemberWithoutWinnerInCampaign as $mem) {

                if (!in_array($mem->id, $newWinnerListIds)) {
                    // array_push($selectionList, $mem);
                    $selectionList =  $selectionList->merge([$mem]);
                }
            }

            $luckyMember = $selectionList->random();

            $winner = new Winner();
            $winner->member_id = $luckyMember->id;
            $winner->campaign_id = $campaignId;
            $winner->prize_id = $prizeItem->id;
            $winner->note = "Lucky member";
            $winner->save();

            $winner->load(['prize', 'member_info', 'campaign', 'prize.prizeGroup']);
            $winnerListCollection =  $winnerListCollection->merge([$winner]);

            array_push($newWinnerListIds,  $winner->id);
        }


        dd($winnerListCollection);
        $winner->load(['prize.prizeGroup', 'member_info']);

        return redirect()->route('home.campaign.prizeGroup.index', [$campaignId, $prizeGroupId])
            ->with([
                'success' => 'Quay thành công.',
                'winners' =>  $winnerListCollection,
                'drawType'  =>  'all_one'
            ]);
    }


    public function reSpin(Request $request, $campaignId, $prizeGroupId)
    {

        dd($request);
    }
}
