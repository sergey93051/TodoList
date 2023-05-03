<?php namespace App\Http\Controllers;

use App\Models\Todo as ModelsTodo;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    
    public function index()
    {
        return Inertia::render('Index', ['data' => ModelsTodo::get()]);
    }
    
    public function store(Request $request)
    {        
        ModelsTodo::create($request->all());

        return redirect()->back();
    }

    public function update(Request $request,$id)
    {
        if ($id) {

            ModelsTodo::find($id)->update($request->all());

            return redirect()->back();
        }
    }

    public function destroy($id)
    {
        if ($id) {
            ModelsTodo::find($id)->delete();
            return redirect()->back();
        }
    }
} 