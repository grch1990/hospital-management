<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Medicamento;
use DB;

class MedicamentoController extends Controller
{
    public function index(){
        return view('medicamentos.index');
    }

    public function mostrar(){
        $medicamentos = DB::table('medicamentos')->select('id','nombre')->get();
        return view('medicamentos.filelist',compact('medicamentos'));
    }

    public function store(Request $request){

        $request->validate([
            'nombre' => 'required|min:3|regex:/^([a-zA-ZñÑáéíóúÁÉÍÓÚ_-])+((\s*)+([a-zA-ZñÑáéíóúÁÉÍÓÚ_-]*)*)+$/'
        ]);

        if ($request->ajax()) {
            $medicamento = Medicamento::create($request->all());
                if ($medicamento) {
                    return response()->json(['success' => 'true']);
                }else{
                    return response()->json(['success' => 'false']);
                }
        }
    }

    public function edit($id){

        $medicamento = Medicamento::Find($id);
        return response()->json($medicamento);
    }

    public function update(Request $request,$id){

         $request->validate([
            'nombre_medicina' => 'required|min:3|regex:/^([a-zA-ZñÑáéíóúÁÉÍÓÚ_-])+((\s*)+([a-zA-ZñÑáéíóúÁÉÍÓÚ_-]*)*)+$/'
        ]);

        if ($request->ajax()) {
            $medicamento = Medicamento::Find($id);
            $medicamento->nombre = $request->input('nombre_medicina');
            $medicamento->save();

                if ($medicamento) {
                    return response()->json(['success' => 'true']);
                }
                else{
                    return response()->json(['success' => 'false']);   
                }
        }
    }

    public function eliminar($id){

        $medicamento = Medicamento::Find($id);
        $resultado = $medicamento->delete();

        if ($resultado) {
            return response()->json(['success' => 'true']);
        }
        else{
            return response()->json(['success' => 'false']);   
        }
    }
}
