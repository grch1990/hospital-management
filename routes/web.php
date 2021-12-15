<?php
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\MedicoController;
use App\Http\Controllers\MedicamentoController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

//Rutas de Medicamentos
Route::get('medicamentos',[MedicamentoController::class,'index'])->name('medicamentos.index');
Route::get('medicamentos/mostrar',[MedicamentoController::class,'mostrar'])->name('medicamentos.mostrar');
Route::post('medicamentos/store',[MedicamentoController::class,'store']);
Route::get('medicamentos/{id}/edit',[MedicamentoController::class,'edit']);
Route::put('medicamentos/{id}/update',[MedicamentoController::class,'update']);
Route::delete('medicamentos/{id}/eliminar',[MedicamentoController::class,'eliminar']);

//Rutas de Medicos
Route::get('medico',[MedicoController::class,'index'])->name('medico.index');
Route::get('medico/listado',[MedicoController::class,'med_list']);
Route::post('medico/store',[MedicoController::class,'store']);
Route::get('medico/{id}/show',[MedicoController::class,'show']);
Route::put('medico/{id}/actualizar',[MedicoController::class,'actualizar']);
Route::delete('medico/{id}/destruir',[MedicoController::class,'destruir']);
//ejemplo de la ruta medico
Route::get('medico/insertar',[MedicoController::class,'insertar'])->name('medico.insertar');
Route::post('medico/validacion',[MedicoController::class,'validacion']);




//Ruta de Pacientes
Route::get('paciente',[PacienteController::class,'create'])->name('paciente.create');
Route::get('paciente/{cedula}/consulta',[PacienteController::class,'consulta']);

