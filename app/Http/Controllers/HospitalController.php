<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Medico;
use DB;

class HospitalController extends Controller
{
    public function index(){

    	return view('hospital.index');
    }

    public function create(){

    	return view('hospital.create');
    }

    public function store(Request $request){

    	if ($request->ajax()) {
    		
    		$medicos = Medico::create($request->all());

	    		if ($medicos) {
	    			return response()->json(['success' => 'true']);
	    		}else{
	    			return response()->json(['success' => 'false']);
	    		}
    	}
    }

    public function edit($id){
            
    }

    public function show(){
    	
    	return view('hospital.show');
    }

	public function list(){

    	$listas = DB::table('medicos')->select('medicos.*')->get();
    	return view('hospital.list',compact('listas'));
    }  

}
