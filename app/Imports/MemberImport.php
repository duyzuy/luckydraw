<?php

namespace App\Imports;

use App\Models\Member;
use Maatwebsite\Excel\Concerns\ToModel;
use function App\Helpers\stripVN;
use Maatwebsite\Excel\Concerns\WithStartRow;

class MemberImport implements ToModel, WithStartRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        // dd($row);
        return new Member([
            'name'              => $row[0],
            'member_code'       => trim($row[1]),
            'phone'             => $row[2],
            'email'             => $row[3],
            'member_type'       => $row[4],
            'position'          => $row[5],
            'checked_in'        => $row[6],
            'member_keyword'    =>  str_replace(" ", "", stripVN($row[0]))
        ]);
    }
    public function rules(): array
    {
        return [
            'name' => 'required|max:255',
            'email' => 'email|required',
            'member_type'   =>  'required',
            'member_code'   =>  'required',
            'phone'     =>  'required'
        ];
    }
    public function startRow(): int
    {
        return 2;
    }
}
