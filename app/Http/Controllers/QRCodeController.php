<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class QRCodeController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('admin/QRCode/QRCodeContainer', []);
    }
}
