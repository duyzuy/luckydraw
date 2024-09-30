<?php

namespace App\Http\Middleware;

use App\Models\Campaign;
use App\Models\Company;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        $campaigns = Campaign::where('status', 'publish')->orderBy('created_at', 'desc')->get();
        $departments = Department::all();
        $companies = Company::all();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => function () use ($request) {
                return [
                    'success' => $request->session()->get('success'),
                    'error' => $request->session()->get('error'),
                    'winner'   => $request->session()->get('winner'),
                    'winners' => $request->session()->get('winners'),
                    'drawType'  =>  $request->session()->get('drawType'),
                ];
            },
            'share' => [
                'campaigns'     =>      $campaigns,
                'departments'   =>      $departments,
                'companies'     =>      $companies
            ]
        ];
    }
}
