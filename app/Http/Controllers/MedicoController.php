<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Medico;
use DB;

class MedicoController extends Controller
{
    public function index(){
    	return view('medicos.index');
    }

    public function med_list(){
    	$medicos = DB::table('medicos')->select('id','nombres','apellidos')->get();
    	return view('medicos.med_list',compact('medicos'));
    }

    public function store(Request $request){
    	
    	$request->validate([
            'name_medico' => 'required|min:3|regex:/^([a-zA-ZñÑáéíóúÁÉÍÓÚ_-])+((\s*)+([a-zA-ZñÑáéíóúÁÉÍÓÚ_-]*)*)+$/',
            'apellido_medico' => 'required|min:3|regex:/^([a-zA-ZñÑáéíóúÁÉÍÓÚ_-])+((\s*)+([a-zA-ZñÑáéíóúÁÉÍÓÚ_-]*)*)+$/'
        ]);

        if ($request->ajax()) {
        	
        	$medico = new Medico();
        	$medico->nombres = $request->input('name_medico');
        	$medico->apellidos = $request->input('apellido_medico');
        	$medico->save();

        	if ($medico) {
        		return response()->json(['success' => 'true']);
        	}else{
        		return response()->json(['success' => 'false']);
        	}
        }
    }

    public function show($id){
    	
    	$medico = Medico::Find($id);
    	return response()->json($medico);
    }

    public function actualizar(Request $request,$id){

    	if ($request->ajax()) {
			
	    	$request->validate([
	            'medico_nombre' => 'required|min:3|regex:/^([a-zA-ZñÑáéíóúÁÉÍÓÚ_-])+((\s*)+([a-zA-ZñÑáéíóúÁÉÍÓÚ_-]*)*)+$/',
	            'medico_apellido' => 'required|min:3|regex:/^([a-zA-ZñÑáéíóúÁÉÍÓÚ_-])+((\s*)+([a-zA-ZñÑáéíóúÁÉÍÓÚ_-]*)*)+$/'
	        ]);
		    	
		    	$medico = Medico::Find($id);
		    	$medico->nombres = $request->input('medico_nombre');
		    	$medico->apellidos = $request->input('medico_apellido');
		    	$medico->save();

		    	if ($medico) {
		    		return response()->json(['success' => 'true']);
		    	}
		    	else{
		    		return response()->json(['success' => 'false']);
		    	} 		
    	}
    }

    public function destruir($id){
    		
    	$eliminar = Medico::Find($id);
    	$resultado = $eliminar->delete();

    	if ($resultado) {
    		return response()->json(['success' => 'true']);
    	}else{
    		return response()->json(['success' => 'false']);
    	}
    }

    public function insertar(){

        return view('medicos.prueba');
    }

    public function validacion(Request $request){

        $request->validate([
            'nombres' => 'required',
            'apellidos' => 'required'
        ]);
        /*
        $x = new Medico();
        $x->nombres = $request->input('nombres');
        $x->apellidos = $request->input('apellidos');
        $x->save();
        */
    }
}
