<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use App\Models\Company;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $company = Company::query()->orderBy('created_at', 'desc')->paginate(15);
        return Inertia::render('admin/Company/CompanyPageContainer', [
            'data'  => $company,
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompanyRequest $request)
    {
        //
        Validator::make($request->all(), [
            'name' => 'required|max:255',
            'eng_name' => 'required|max:255',

        ])->validate();


        $company = new Company();
        $company->name = $request->name;
        $company->eng_name = $request->eng_name;

        $company->save();

        return redirect()->back()->with('success', 'Tạo thành công.');
    }


    public function update(UpdateCompanyRequest $request, $companyId)
    {

        Validator::make($request->all(), [
            'name' => 'required|max:255',
            'eng_name' => 'required|max:255',
        ])->validate();


        $company = Company::where('id', $companyId)->firstOrFail();

        $company->name = $request->name;
        $company->eng_name = $request->eng_name;
        $company->save();

        return redirect()->back()->with('success', 'Cập nhật thành công.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($companyId)
    {
        //
        $company = Company::where('id', $companyId)->firstOrFail();
        $company->delete();
    }
}
