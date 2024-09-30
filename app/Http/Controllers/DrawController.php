<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Winner;
use App\Models\PrizeGroup;
use App\Models\Member;
use App\Models\Prize;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;



class DrawController extends Controller
{
    //

    public function index($id)
    {

        $prize_group =  PrizeGroup::find($id);

        if (!$prize_group) {
            return redirect('/');
        }


        $prize_group_list = PrizeGroup::orderBy('order', 'asc')->where('actived', true)->get();
        $all_prize = Prize::query()->where('prize_group_id', $id)->get();
        $all_prize->load(['winner.member_info']);

        $winners = Winner::all();
        $winners->load(['prize.prizeGroup', 'member_info']);


        $prized_ids = [];
        foreach ($winners as $key => $winner) {
            array_push($prized_ids, $winner->prize_id);
        }

        $prized_idss = [];
        foreach ($all_prize as $key => $prizee) {
            array_push($prized_idss, $prizee->id);
        }


        $prize = Prize::query()->where('prize_group_id', $id)->whereNotIn('id', $prized_ids)->first();


        return Inertia::render('Draw/DrawContainer', [
            'prizeGroup'        =>  $prize_group,
            'prizeGroups'       =>  $prize_group_list,
            'prizes'            =>  $all_prize,
            'prize'             =>  $prize,
            'winnerList'        =>  $winners->groupBy('prize.prize_group_id')
        ]);
    }

    public function spin(Request $request,  $group_id)
    {


        Validator::make($request->all(), [
            'prizeId' => 'required',
        ])->validate();

        // dd($request);
        $prize_id = $request->prizeId;
        $all_winner = Winner::all();

        $winner_ids = [];
        $prized_ids = [$prize_id];
        foreach ($all_winner as $key => $winner) {
            array_push($winner_ids, $winner->member_id);
            array_push($prized_ids, $winner->prize_id);
        }

        $all_member = Member::query()->where('checked_in', 1)->whereNotIn('id', $winner_ids)->get();

        if ($all_member->count() === 0) {
            return to_route('draw.index', [$group_id])->with(['error' => "No member available"]);
        }
        $lucky_member = $all_member->random();


        $prize_group =  PrizeGroup::find($group_id);
        $prize_group_list = PrizeGroup::orderBy('order', 'asc')->where('actived', true)->get();


        $prize = Prize::query()->where('prize_group_id', $group_id)->whereNotIn('id', $prized_ids)->first();

        if (!$prize_group) {
            return redirect('/');
        }

        $winner = new Winner();
        $winner->member_id = $lucky_member->id;
        $winner->prize_id = $prize_id;
        $winner->note = "Lucky member";
        $winner->save();

        $winner->load(['prize.prizeGroup', 'member_info']);

        $all_new_winner = Winner::all();
        $all_new_winner->load(['prize.prizeGroup', 'member_info']);

        $all_prize = Prize::query()->where('prize_group_id', $group_id)->get();
        $all_prize->load(['winner.member_info']);

        return Inertia::render('Draw/DrawContainer', [
            'prizeGroup'        =>  $prize_group,
            'prizeGroups'       =>  $prize_group_list,
            'prizes'            =>  $all_prize,
            'prize'             =>  $prize,
            'winner'            =>  $winner,
            'winnerList'        =>  $all_new_winner->groupBy('prize.prize_group_id')
        ]);


        // return to_route('draw.index', [$group_id, 'code' => $lucky_member->member_code]);
    }



    public function reSpin(Request $request, $group_id)
    {
        Validator::make($request->all(), [
            'winnerId' => 'required',
        ])->validate();


        $all_winner = Winner::all();

        $winner_ids = [];
        $prized_ids = [];
        foreach ($all_winner as $key => $winner) {
            array_push($winner_ids, $winner->member_id);
            array_push($prized_ids, $winner->prize_id);
        }

        $all_member = Member::query()->where('checked_in', 1)->whereNotIn('id', $winner_ids)->get();


        if ($all_member->count() === 0) {
            return to_route('draw.index', [$group_id])->with(['error' => "No member available"]);
        }

        $lucky_member = $all_member->random();

        // dd($lucky_member);
        $prize_group =  PrizeGroup::find($group_id);
        $prize_group_list = PrizeGroup::orderBy('order', 'asc')->where('actived', true)->get();

        $prize = Prize::query()->where('prize_group_id', $group_id)->whereNotIn('id', $prized_ids)->first();

        if (!$prize_group) {
            return redirect('/');
        }

        $winner = Winner::where('id', $request->winnerId)->first();
        $winner->member_id = $lucky_member->id;
        $winner->note = "redraw" . $request->memberId;
        $winner->save();

        $all_new_winner = Winner::all();
        $all_new_winner->load(['prize.prizeGroup', 'member_info']);

        $all_prize = Prize::query()->where('prize_group_id', $group_id)->get();


        return Inertia::render('Draw/DrawContainer', [
            'prizeGroup'        =>  $prize_group,
            'prizeGroups'       =>  $prize_group_list,
            'prizes'            =>  $all_prize->load(['winner.member_info']),
            'prize'             =>  $prize,
            'winner'            =>  $winner->load(['prize.prizeGroup', 'member_info']),
            'winnerList'        =>  $all_new_winner->groupBy('prize.prize_group_id')
        ]);
    }
}
