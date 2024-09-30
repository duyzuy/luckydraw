<?php

namespace App\Imports;

use App\Models\Member;
use Maatwebsite\Excel\Concerns\ToModel;
use function App\Helpers\stripVN;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToArray;

class MemberImport implements ToModel, WithStartRow, ToArray
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public $campaign_id;

    public function  __construct($campaign_id)
    {
        $this->campaign_id = $campaign_id;
    }


    public function model(array $row)
    {


        $keyword = Str::replace(" ", "", stripVN($row[0])) . Str::trim($row[2]) . Str::trim($row[1]) . Str::lower($row[3]);

        return new Member([
            'full_name'              => $row[0],
            'member_code'       => Str::trim($row[1]),
            'phone'             => $row[2],
            'email'             => $row[3],
            'member_type'       => $row[4],
            'position'          => $row[5],
            'checked_in'        => $row[6],
            'member_keyword'    => Str::lower($keyword),
            'campaign_id'       =>  $this->campaign_id
        ]);
    }
    public function rules(): array
    {
        return [
            'full_name' => 'required|max:255',
            'email' => 'email|required',
            'member_type'   =>  'required',
            'member_code'   =>  'required',
            'phone'     =>  'required',
            'campaign_id'     =>  'required|exists:App\Models\Campaign,id'
        ];
    }
    public function startRow(): int
    {
        return 2;
    }
    public function array(array $array)
    {
        return $array;
    }
}
